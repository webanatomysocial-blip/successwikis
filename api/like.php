<?php
// api/like.php
require_once __DIR__ . '/db.php';

$ip = $_SERVER['REMOTE_ADDR'];
$post_id = isset($_REQUEST['post_id']) ? $_REQUEST['post_id'] : null;
$legacy_id = isset($_REQUEST['legacy_id']) ? $_REQUEST['legacy_id'] : null;

if (!$post_id) {
    echo json_encode(['error' => 'Missing post_id']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Toggle like
    if ($legacy_id) {
        $stmt = $pdo->prepare("SELECT id FROM likes WHERE (post_id = ? OR post_id = ?) AND ip_address = ?");
        $stmt->execute([$post_id, $legacy_id, $ip]);
    } else {
        $stmt = $pdo->prepare("SELECT id FROM likes WHERE post_id = ? AND ip_address = ?");
        $stmt->execute([$post_id, $ip]);
    }
    $liked = $stmt->fetch();

    if ($liked) {
        // Unlike - delete all occurrences safely
        if ($legacy_id) {
            $stmt = $pdo->prepare("DELETE FROM likes WHERE (post_id = ? OR post_id = ?) AND ip_address = ?");
            $stmt->execute([$post_id, $legacy_id, $ip]);
        } else {
            $stmt = $pdo->prepare("DELETE FROM likes WHERE post_id = ? AND ip_address = ?");
            $stmt->execute([$post_id, $ip]);
        }
        $action = 'unliked';
    } else {
        // Like
        $stmt = $pdo->prepare("INSERT INTO likes (post_id, ip_address) VALUES (?, ?)");
        $stmt->execute([$post_id, $ip]);
        $action = 'liked';
    }
}

// Get total likes
if ($legacy_id) {
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM likes WHERE post_id = ? OR post_id = ?");
    $stmt->execute([$post_id, $legacy_id]);
} else {
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM likes WHERE post_id = ?");
    $stmt->execute([$post_id]);
}
$total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Check if current user liked either ID
if ($legacy_id) {
    $stmt = $pdo->prepare("SELECT id FROM likes WHERE (post_id = ? OR post_id = ?) AND ip_address = ?");
    $stmt->execute([$post_id, $legacy_id, $ip]);
} else {
    $stmt = $pdo->prepare("SELECT id FROM likes WHERE post_id = ? AND ip_address = ?");
    $stmt->execute([$post_id, $ip]);
}
$user_liked = $stmt->fetch() ? true : false;

header('Content-Type: application/json');
echo json_encode([
    'post_id' => $post_id,
    'total_likes' => (int)$total,
    'user_liked' => $user_liked
]);
?>
