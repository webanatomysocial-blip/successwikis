<?php
// api/featured.php
require_once 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper to check if admin is logged in
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

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function send_reminder_email($type, $name, $company_name, $email, $phone) {
    if (!class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
        require_once __DIR__ . '/PHPMailer/Exception.php';
        require_once __DIR__ . '/PHPMailer/PHPMailer.php';
        require_once __DIR__ . '/PHPMailer/SMTP.php';
    }

    try {
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER'] ?? 'webanatomysocial@gmail.com';
        $mail->Password = $_ENV['SMTP_PASS'] ?? 'bjvd jlqd roif gdtq';
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['SMTP_PORT'] ?? 465;
        $mail->CharSet = 'UTF-8';

        $mail->setFrom($_ENV['SMTP_FROM'] ?? 'webanatomysocial@gmail.com', $_ENV['SMTP_FROM_NAME'] ?? 'SuccessWikis Featured');
        $mail->addAddress('webanatomysocial@gmail.com');
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = "Remainder: New Featured Submission - " . htmlspecialchars($company_name ?: $name);

        $typeLabel = str_replace('_', ' ', ucwords($type, '_'));

        $htmlBody = "
        <h2>New Featured Form Submission</h2>
        <p>A new form has been submitted for <strong>{$typeLabel}</strong>.</p>
        <hr/>
        <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Company:</strong> " . htmlspecialchars($company_name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
        <hr/>
        <p>Please log in to the SuccessWikis Admin Dashboard to review the complete details and approve/edit this feature.</p>
        ";

        $mail->Body = $htmlBody;
        $mail->send();
        return true;
    } catch (\Exception $e) {
        error_log("PHPMailer SMTP Error: " . $mail->ErrorInfo . ". Attempting PHP mail() fallback.");
        
        $to = 'webanatomysocial@gmail.com';
        $subject = "Remainder: New Featured Submission - " . ($company_name ?: $name);
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $from = $_ENV['SMTP_FROM'] ?? 'webanatomysocial@gmail.com';
        $headers .= "From: {$from}\r\n";
        $headers .= "Reply-To: {$email}\r\n";
        
        $sent = mail($to, $subject, $htmlBody, $headers);
        return $sent;
    }
}

// Function to handle single or multiple file uploads
function handle_file_upload($fileKey) {
    if (!isset($_FILES[$fileKey])) {
        return null;
    }

    $isLocal = (getenv('DB_CONNECTION') === 'sqlite' || !isset($_ENV['DB_CONNECTION']) || $_ENV['DB_CONNECTION'] === 'sqlite');
    $uploadDir = $isLocal ? __DIR__ . '/../public/uploads/featured/' : __DIR__ . '/../uploads/featured/';
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    
    // Check if it's multiple files or single file
    if (is_array($_FILES[$fileKey]['name'])) {
        $paths = [];
        $fileCount = count($_FILES[$fileKey]['name']);
        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES[$fileKey]['error'][$i] !== UPLOAD_ERR_OK) {
                continue;
            }
            
            $tmpName = $_FILES[$fileKey]['tmp_name'][$i];
            $fileType = mime_content_type($tmpName);
            
            if (!in_array($fileType, $allowedTypes)) {
                continue;
            }
            
            $mimeToExt = [
                'image/jpeg' => 'jpg',
                'image/jpg'  => 'jpg',
                'image/png'  => 'png',
                'image/webp' => 'webp',
                'application/pdf' => 'pdf'
            ];
            $ext = $mimeToExt[$fileType] ?? 'jpg';
            $filename = $fileKey . '_' . bin2hex(random_bytes(8)) . '_' . $i . '.' . $ext;
            
            if (move_uploaded_file($tmpName, $uploadDir . $filename)) {
                $paths[] = '/uploads/featured/' . $filename;
            }
        }
        return $paths;
    } else {
        // Single file
        if ($_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
            return null;
        }
        
        $tmpName = $_FILES[$fileKey]['tmp_name'];
        $fileType = mime_content_type($tmpName);
        
        if (!in_array($fileType, $allowedTypes)) {
            return null;
        }
        
        $mimeToExt = [
            'image/jpeg' => 'jpg',
            'image/jpg'  => 'jpg',
            'image/png'  => 'png',
            'image/webp' => 'webp',
            'application/pdf' => 'pdf'
        ];
        $ext = $mimeToExt[$fileType] ?? 'jpg';
        $filename = $fileKey . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
        
        if (move_uploaded_file($tmpName, $uploadDir . $filename)) {
            return '/uploads/featured/' . $filename;
        }
    }
    return null;
}

switch ($method) {
    case 'GET':
        check_admin_auth();
        
        $id = $_GET['id'] ?? null;
        try {
            if ($id) {
                $stmt = $pdo->prepare("
                    SELECT fs.*, p.deleted_at AS post_deleted_at 
                    FROM featured_submissions fs 
                    LEFT JOIN posts p ON fs.post_id = p.id 
                    WHERE fs.id = ?
                ");
                $stmt->execute([(int)$id]);
                $submission = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($submission) {
                    $submission['form_data'] = json_decode($submission['form_data'], true);
                    echo json_encode(['status' => 'success', 'data' => $submission]);
                } else {
                    http_response_code(404);
                    echo json_encode(['status' => 'error', 'message' => 'Submission not found']);
                }
            } else {
                $stmt = $pdo->query("
                    SELECT fs.*, p.deleted_at AS post_deleted_at 
                    FROM featured_submissions fs 
                    LEFT JOIN posts p ON fs.post_id = p.id 
                    ORDER BY fs.created_at DESC
                ");
                $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                foreach ($submissions as &$sub) {
                    $sub['form_data'] = json_decode($sub['form_data'], true);
                }
                
                echo json_encode(['status' => 'success', 'data' => $submissions]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        // Public Submission Endpoint
        $type = $_POST['type'] ?? '';
        $full_name = $_POST['full_name'] ?? '';
        $role = $_POST['role'] ?? '';
        $email = $_POST['email'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $company_name = $_POST['company_name'] ?? '';
        $company_website = $_POST['company_website'] ?? '';
        $company_linkedin = $_POST['company_linkedin'] ?? '';
        $company_email = $_POST['company_email'] ?? '';

        if (empty($type) || empty($full_name) || empty($email)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Type, Full Name, and Email are required fields.']);
            exit;
        }

        // Process dynamic inputs
        $form_data = [];
        foreach ($_POST as $key => $val) {
            // Skip top-level columns
            if (in_array($key, ['type', 'full_name', 'role', 'email', 'phone', 'company_name', 'company_website', 'company_linkedin', 'company_email'])) {
                continue;
            }
            $form_data[$key] = $val;
        }

        // Process file uploads
        if (!empty($_FILES)) {
            foreach ($_FILES as $key => $fileInfo) {
                $uploaded = handle_file_upload($key);
                if ($uploaded !== null) {
                    $form_data[$key] = $uploaded;
                }
            }
        }

        $form_data_json = json_encode($form_data);

        try {
            $stmt = $pdo->prepare("INSERT INTO featured_submissions (type, full_name, role, email, phone, company_name, company_website, company_linkedin, company_email, form_data, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
            $stmt->execute([$type, $full_name, $role, $email, $phone, $company_name, $company_website, $company_linkedin, $company_email, $form_data_json]);
            
            $sub_id = $pdo->lastInsertId();

            // Send notification email
            send_reminder_email($type, $full_name, $company_name, $email, $phone);

            echo json_encode(['status' => 'success', 'message' => 'Submission received successfully', 'id' => $sub_id]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        check_admin_auth();
        $input = json_decode(file_get_contents('php://input'), true);
        
        $id = $input['id'] ?? '';
        $action = $input['action'] ?? ''; // 'edit' or 'approve' or 'reject'
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Submission ID is required']);
            exit;
        }

        try {
            // Get current submission
            $stmt = $pdo->prepare("SELECT * FROM featured_submissions WHERE id = ?");
            $stmt->execute([(int)$id]);
            $submission = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$submission) {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Submission not found']);
                exit;
            }

            if ($action === 'approve' || $action === 'reject') {
                $allowed_types = ['driven_by_purpose', 'stage_behind_story', 'stage_behind_the_story', 'founders_unfiltered'];
                if (!in_array($submission['type'], $allowed_types)) {
                    http_response_code(400);
                    echo json_encode(['status' => 'error', 'message' => 'Invalid submission type for approval.']);
                    exit;
                }
            }

            if ($action === 'approve') {
                // If it is 'driven_by_purpose', we create a post in 'posts' table!
                $post_id = null;
                $post_type = $submission['type'];
                $form_data = json_decode($submission['form_data'], true) ?: [];

                $title = $form_data['feature_title'] ?? $form_data['outer_heading'] ?? $form_data['inner_heading'] ?? (ucwords(str_replace('_', ' ', $submission['type'])) . ': ' . ($submission['company_name'] ?: $submission['full_name']));
                $slug = isset($form_data['slug']) && trim($form_data['slug']) !== '' ? trim($form_data['slug']) : '';
                if (empty($slug)) {
                    $slug = strtolower($title);
                } else {
                    $slug = strtolower($slug);
                }
                $slug = preg_replace('/[^a-z0-9-]+/', '-', $slug);
                $slug = preg_replace('/-+/', '-', $slug);
                $slug = trim($slug, '-');

                $meta_description = isset($form_data['meta_description']) ? trim($form_data['meta_description']) : '';
                $excerpt = $form_data['company_tagline'] ?? '';
                $content = $form_data['company_description'] ?? '';
                
                $image_url = isset($form_data['thumbnail']) && trim($form_data['thumbnail']) !== '' ? trim($form_data['thumbnail']) : '';
                if (empty($image_url)) {
                    if (!empty($form_data['company_logo'])) {
                        $image_url = is_array($form_data['company_logo']) ? $form_data['company_logo'][0] : $form_data['company_logo'];
                    } elseif (!empty($form_data['founder_images'])) {
                        $image_url = is_array($form_data['founder_images']) ? $form_data['founder_images'][0] : $form_data['founder_images'];
                    }
                }
                $category = ucwords(str_replace('_', ' ', $submission['type']));

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

                $published_date = date('Y-m-d H:i:s');
                $is_published = 0; // DRAFT
                $outer_heading = !empty($form_data['outer_heading']) ? $form_data['outer_heading'] : $title;
                $inner_heading = !empty($form_data['inner_heading']) ? $form_data['inner_heading'] : $title;

                // Insert into posts table
                $post_stmt = $pdo->prepare("INSERT INTO posts (post_type, title, slug, meta_description, excerpt, content, image_url, category, published_date, is_published, outer_heading, inner_heading) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $post_stmt->execute([
                    $post_type,
                    $title,
                    $slug,
                    $meta_description,
                    $excerpt,
                    $content,
                    $image_url,
                    $category,
                    $published_date,
                    $is_published,
                    $outer_heading,
                    $inner_heading
                ]);
                $post_id = $pdo->lastInsertId();

                // Update submission status to approved and store the post_id
                $up_stmt = $pdo->prepare("UPDATE featured_submissions SET status = 'approved', post_id = ? WHERE id = ?");
                $up_stmt->execute([$post_id, (int)$id]);

                echo json_encode([
                    'status' => 'success', 
                    'message' => 'Submission approved successfully',
                    'post_id' => $post_id
                ]);
            } elseif ($action === 'reject') {
                $up_stmt = $pdo->prepare("UPDATE featured_submissions SET status = 'rejected' WHERE id = ?");
                $up_stmt->execute([(int)$id]);
                echo json_encode(['status' => 'success', 'message' => 'Submission marked as rejected']);
            } elseif ($action === 'edit') {
                // Edit form details
                $full_name = $input['full_name'] ?? $submission['full_name'];
                $role = $input['role'] ?? $submission['role'];
                $email = $input['email'] ?? $submission['email'];
                $phone = $input['phone'] ?? $submission['phone'];
                $company_name = $input['company_name'] ?? $submission['company_name'];
                $company_website = $input['company_website'] ?? $submission['company_website'];
                $company_linkedin = $input['company_linkedin'] ?? $submission['company_linkedin'];
                $company_email = $input['company_email'] ?? $submission['company_email'];
                
                // Decode current form_data, merge with new inputs
                $curr_form_data = json_decode($submission['form_data'], true) ?: [];
                $new_form_data = $input['form_data'] ?? [];
                
                $merged_form_data = array_merge($curr_form_data, $new_form_data);
                $merged_form_data_json = json_encode($merged_form_data);

                $up_stmt = $pdo->prepare("UPDATE featured_submissions SET full_name = ?, role = ?, email = ?, phone = ?, company_name = ?, company_website = ?, company_linkedin = ?, company_email = ?, form_data = ? WHERE id = ?");
                $up_stmt->execute([
                    $full_name,
                    $role,
                    $email,
                    $phone,
                    $company_name,
                    $company_website,
                    $company_linkedin,
                    $company_email,
                    $merged_form_data_json,
                    (int)$id
                ]);

                echo json_encode(['status' => 'success', 'message' => 'Submission updated successfully']);
            } else {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        check_admin_auth();
        $id = $_GET['id'] ?? '';
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Submission ID is required']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM featured_submissions WHERE id = ?");
            $stmt->execute([(int)$id]);
            echo json_encode(['status' => 'success', 'message' => 'Submission deleted successfully']);
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
