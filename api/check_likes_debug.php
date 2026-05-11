<?php
require_once __DIR__ . '/db.php';

header("Content-Type: application/json");

try {
    $stmt = $pdo->query("SELECT post_id, COUNT(*) as c FROM likes GROUP BY post_id");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        'status' => 'success',
        'data' => $results
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
