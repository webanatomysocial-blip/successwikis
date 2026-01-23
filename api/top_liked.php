<?php
// api/top_liked.php
require_once __DIR__ . '/db.php';

$category = isset($_GET['category']) ? $_GET['category'] : null;

// Subquery to get counts per post_id
// We might need to join with a list of all posts to get titles/slugs if we were using a full DB, 
// but since metadata is in React, the React app will handle mapping the post_id to the actual post data.
// Here we just return the counts for post_ids.

$sql = "SELECT post_id, COUNT(*) as like_count FROM likes ";
if ($category) {
    // Note: Since we don't have categories in the SQLite DB (they live in React metadata),
    // we assume the caller filters the results or we'd need a way to pass category info.
    // For now, let's just return all and let React filter the Top 3 based on its own metadata.
}
$sql .= "GROUP BY post_id ORDER BY like_count DESC";

$stmt = $pdo->query($sql);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($results);
?>
