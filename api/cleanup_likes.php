<?php
// api/cleanup_likes.php
require_once __DIR__ . '/db.php';

try {
    // Get all likes
    $stmt = $pdo->query("SELECT id, ip_address FROM likes");
    $likes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $deletedCount = 0;

    foreach ($likes as $like) {
        $ip = $like['ip_address'];
        
        // If the IP address is NOT a valid IPv4 or IPv6 address (meaning it was a fake/boosted randomly generated hash)
        if (!filter_var($ip, FILTER_VALIDATE_IP)) {
            $delStmt = $pdo->prepare("DELETE FROM likes WHERE id = ?");
            $delStmt->execute([$like['id']]);
            $deletedCount++;
        }
    }

    echo "<h2 style='color: green;'>Successfully cleaned up {$deletedCount} boosted/fake likes!</h2>";
    echo "<p>Organic likes with real IP addresses have been kept safe.</p>";
    echo "<p>Please delete this file from your Hostinger api/ folder now for security.</p>";

} catch (Exception $e) {
    echo "Error cleaning up likes: " . $e->getMessage();
}
?>
