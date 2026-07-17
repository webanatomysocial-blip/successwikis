<?php
require_once 'db.php';
header("Content-Type: application/json");

try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS html_banner (
        id INTEGER PRIMARY KEY,
        html_content TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT html_content FROM html_banner WHERE id = 1");
    $row = $stmt->fetch();
    echo json_encode(['status' => 'success', 'html' => $row ? $row['html_content'] : '']);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $html = $input['html'] ?? '';

    $check = $pdo->query("SELECT id FROM html_banner WHERE id = 1")->fetch();
    if ($check) {
        $stmt = $pdo->prepare("UPDATE html_banner SET html_content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1");
    } else {
        $stmt = $pdo->prepare("INSERT INTO html_banner (id, html_content) VALUES (1, ?)");
    }
    $stmt->execute([$html]);
    echo json_encode(['status' => 'success', 'message' => 'Saved successfully']);
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
?>
