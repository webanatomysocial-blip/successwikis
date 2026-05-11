<?php
// api/setup_admin.php
// WARNING: This file should be removed in production after the first run.
require_once 'db.php';

header("Content-Type: application/json");

// Define admin credentials
$admin_username = 'mosol9';
$admin_password = 'f4%c0Jxz)z{o>bY9pj_1'; // The user can change this later
$hashed_password = password_hash($admin_password, PASSWORD_DEFAULT);

try {
    // Check if the user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$admin_username]);
    $existing = $stmt->fetch();

    if ($existing) {
        // UPDATE existing admin
        $stmt = $pdo->prepare("UPDATE users SET password = ?, is_active = 1, role = 'admin' WHERE id = ?");
        $stmt->execute([$hashed_password, $existing['id']]);
        $message = "Admin user updated successfully.";
    } else {
        // INSERT new admin user
        $stmt = $pdo->prepare("INSERT INTO users (username, password, role, is_active) VALUES (?, ?, 'admin', 1)");
        $stmt->execute([$admin_username, $hashed_password]);
        $message = "Admin user created successfully.";
    }
    
    $user_id = $pdo->lastInsertId();

    // Insert permissions
    $stmt = $pdo->prepare("INSERT INTO user_permissions (user_id, can_manage_blogs, can_manage_ads, can_manage_comments, can_manage_announcements, can_review_blogs) VALUES (?, 1, 1, 1, 1, 1)");
    $stmt->execute([$user_id]);

    echo json_encode(['status' => 'success', 'message' => 'Admin user created successfully.', 'username' => $admin_username, 'password' => $admin_password]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to create admin user: ' . $e->getMessage()]);
}
?>
