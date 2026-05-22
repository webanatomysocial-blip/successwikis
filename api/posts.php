<?php
// api/posts.php
require_once 'db.php';

// Temporarily disable auth_check.php to allow getting posts publicly.
// If you have `auth_check.php` included globally in a complex way, ensure it only checks on POST/PUT/DELETE.

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// We need a helper to check if admin is logged in
function check_admin_auth() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }
}

function boost_likes($pdo, $post_id, $target) {
    if (!$post_id) return;
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM likes WHERE post_id = ?");
    $stmt->execute([$post_id]);
    $current = (int)$stmt->fetchColumn();
    
    if ($current < $target) {
        $needed = $target - $current;
        for ($i = 0; $i < $needed; $i++) {
            $ip = rand(10, 250) . '.' . rand(10, 250) . '.' . rand(10, 250) . '.' . rand(10, 250);
            try {
                $stmt = $pdo->prepare("INSERT INTO likes (post_id, ip_address) VALUES (?, ?)");
                $stmt->execute([$post_id, $ip]);
            } catch (PDOException $e) {}
        }
    }
}

// Auto-cleanup will be handled inside admin fetch to prevent overhead and ensure cross-db compatibility

switch ($method) {
    case 'GET':
        // Get posts
        // Example: /api/posts.php?type=blog
        $type = $_GET['type'] ?? null;
        $slug = $_GET['slug'] ?? null;
        $post_id = $_GET['post_id'] ?? null;
        $include_drafts = isset($_GET['include_drafts']) && $_GET['include_drafts'] === 'true';
        $include_trash = isset($_GET['include_trash']) && $_GET['include_trash'] === 'true';
        
        // Helper to check admin status without exiting
        $is_admin = false;
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
            $is_admin = true;
        }

        try {
            if ($slug) {
                // Get single post by slug (Allow viewing drafts for preview links)
                $stmt = $pdo->prepare("SELECT p.*, (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.slug OR l.post_id = p.title) as likes_count FROM posts p WHERE p.slug = ? AND p.deleted_at IS NULL");
                $stmt->execute([$slug]);
                $post = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($post) {
                    echo json_encode(['status' => 'success', 'data' => $post]);
                } else {
                    http_response_code(404);
                    echo json_encode(['status' => 'error', 'message' => 'Post not found']);
                }
            } elseif ($post_id) {
                // Get single post by numeric ID — used by admin editor (drafts always returned)
                $stmt = $pdo->prepare("SELECT p.*, (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.slug OR l.post_id = p.title) as likes_count FROM posts p WHERE p.id = ?");
                $stmt->execute([(int)$post_id]);
                $post = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($post) {
                    echo json_encode(['status' => 'success', 'data' => $post]);
                } else {
                    http_response_code(404);
                    echo json_encode(['status' => 'error', 'message' => 'Post not found']);
                }
            } else {
                // Auto-cleanup: Delete posts older than 30 days in trash (Admin only)
                if ($is_admin) {
                    try {
                        $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
                        if ($driver === 'mysql') {
                            $pdo->exec("DELETE FROM posts WHERE deleted_at IS NOT NULL AND deleted_at < DATE_SUB(NOW(), INTERVAL 30 DAY)");
                        } else {
                            $pdo->exec("DELETE FROM posts WHERE deleted_at IS NOT NULL AND deleted_at < datetime('now', '-30 days')");
                        }
                    } catch (PDOException $e) {}
                }

                $query = "SELECT p.*, (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.slug OR l.post_id = p.title) as likes_count FROM posts p WHERE 1=1";
                
                if ($include_trash && $is_admin) {
                    $query .= " AND deleted_at IS NOT NULL";
                } else {
                    $query .= " AND deleted_at IS NULL";
                }

                $params = [];

                if ($type) {
                    $query .= " AND post_type = ?";
                    $params[] = $type;
                }

                // If not admin or not specifically requesting drafts, only show published
                if (!$is_admin || !$include_drafts) {
                    $query .= " AND is_published = 1";
                }

                $query .= " ORDER BY published_date DESC";
                
                $stmt = $pdo->prepare($query);
                $stmt->execute($params);
                $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['status' => 'success', 'data' => $posts]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        check_admin_auth();
        $input = json_decode(file_get_contents('php://input'), true);
        
        $post_type = $input['post_type'] ?? '';
        $title = $input['title'] ?? '';
        $slug = $input['slug'] ?? '';
        $meta_description = $input['meta_description'] ?? '';
        $excerpt = $input['excerpt'] ?? '';
        $content = $input['content'] ?? '';
        $youtube_link = $input['youtube_link'] ?? '';
        $image_url = $input['image_url'] ?? '';
        $category = $input['category'] ?? '';
        $published_date = $input['published_date'] ?? date('Y-m-d H:i:s');
        $is_published = $input['is_published'] ?? 1;
        $initial_likes = (int)($input['initial_likes'] ?? 0);
        $outer_heading = $input['outer_heading'] ?? '';
        $inner_heading = $input['inner_heading'] ?? '';

        if (empty($title) || empty($post_type)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Title and type are required']);
            exit;
        }

        // Generate slug if empty or format it
        if (empty($slug)) {
            $slug = strtolower($title);
        } else {
            $slug = strtolower($slug);
        }
        $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
        $slug = preg_replace('/-+/', '-', $slug);
        $slug = trim($slug, '-');

        // Ensure the slug is unique
        $base_slug = $slug;
        $counter = 1;
        while (true) {
            $check_stmt = $pdo->prepare("SELECT COUNT(*) FROM posts WHERE slug = ?");
            $check_stmt->execute([$slug]);
            if ($check_stmt->fetchColumn() == 0) {
                break;
            }
            $slug = $base_slug . '-' . $counter;
            $counter++;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO posts (post_type, title, slug, meta_description, excerpt, content, youtube_link, image_url, category, published_date, is_published, initial_likes, outer_heading, inner_heading) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$post_type, $title, $slug, $meta_description, $excerpt, $content, $youtube_link, $image_url, $category, $published_date, $is_published, $initial_likes, $outer_heading, $inner_heading]);
            
            $post_id = $pdo->lastInsertId();

            if ($initial_likes > 0) {
                // Seed likes using the slug since frontend uses slug for likes
                boost_likes($pdo, $slug, $initial_likes);
            }

            echo json_encode(['status' => 'success', 'message' => 'Post created successfully', 'id' => $post_id]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        check_admin_auth();
        $input = json_decode(file_get_contents('php://input'), true);
        
        $id = $input['id'] ?? '';
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Post ID is required']);
            exit;
        }

        $post_type = $input['post_type'] ?? '';
        $title = $input['title'] ?? '';
        $slug = $input['slug'] ?? '';
        $meta_description = $input['meta_description'] ?? '';
        $excerpt = $input['excerpt'] ?? '';
        $content = $input['content'] ?? '';
        $youtube_link = $input['youtube_link'] ?? '';
        $image_url = $input['image_url'] ?? '';
        $category = $input['category'] ?? '';
        $published_date = $input['published_date'] ?? null;
        $is_published = $input['is_published'] ?? 1;
        $initial_likes = isset($input['initial_likes']) ? (int)$input['initial_likes'] : null;
        $outer_heading = $input['outer_heading'] ?? null;
        $inner_heading = $input['inner_heading'] ?? null;
        $restore = isset($input['restore']) && $input['restore'] === true;

        try {
            if ($restore) {
                $stmt = $pdo->prepare("UPDATE posts SET deleted_at = NULL WHERE id = ?");
                $stmt->execute([$id]);
            } else {
                // Generate slug if empty or format it
                if (empty($slug)) {
                    $slug = strtolower($title);
                } else {
                    $slug = strtolower($slug);
                }
                $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
                $slug = preg_replace('/-+/', '-', $slug);
                $slug = trim($slug, '-');

                // Ensure the slug is unique (excluding this current post)
                $base_slug = $slug;
                $counter = 1;
                while (true) {
                    $check_stmt = $pdo->prepare("SELECT COUNT(*) FROM posts WHERE slug = ? AND id != ?");
                    $check_stmt->execute([$slug, $id]);
                    if ($check_stmt->fetchColumn() == 0) {
                        break;
                    }
                    $slug = $base_slug . '-' . $counter;
                    $counter++;
                }

                $stmt = $pdo->prepare("UPDATE posts SET post_type=?, title=?, slug=?, meta_description=?, excerpt=?, content=?, youtube_link=?, image_url=?, category=?, published_date=COALESCE(?, published_date), is_published=?, initial_likes=COALESCE(?, initial_likes), outer_heading=COALESCE(?, outer_heading), inner_heading=COALESCE(?, inner_heading), updated_at=CURRENT_TIMESTAMP WHERE id=?");
                $stmt->execute([$post_type, $title, $slug, $meta_description, $excerpt, $content, $youtube_link, $image_url, $category, $published_date, $is_published, $initial_likes, $outer_heading, $inner_heading, $id]);
            }
            
            if ($initial_likes !== null && $initial_likes > 0) {
                boost_likes($pdo, $slug, $initial_likes);
            }

            echo json_encode(['status' => 'success', 'message' => 'Post updated successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        check_admin_auth();
        $id = $_GET['id'] ?? '';
        $permanent = isset($_GET['permanent']) && $_GET['permanent'] === 'true';
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Post ID is required']);
            exit;
        }

        try {
            if ($permanent) {
                // Delete associated featured submission first
                $stmtSub = $pdo->prepare("DELETE FROM featured_submissions WHERE post_id = ?");
                $stmtSub->execute([$id]);

                // Delete the post itself
                $stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['status' => 'success', 'message' => 'Post and associated submission permanently deleted']);
            } else {
                $stmt = $pdo->prepare("UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['status' => 'success', 'message' => 'Post moved to trash']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}
?>
