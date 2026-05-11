<?php
// api/boost_pod_likes.php
require_once __DIR__ . '/db.php';

header("Content-Type: application/json");

// Define static pod slugs
$static_slugs = [
    "raghav-foundation", "zenith-energy", "aec-sastra", "desi-dips",
    "singara-mohan-kaalamega-karigindhi", "when-trial-and-error-turns-into-direction",
    "shyam-sankeerth-gupta-applywizz", "krithika-roy-realivant", "gopala-krishna-hirenest-workforce",
    "yagnakumar-mallavarapu-yagnexor", "sampath-kumar-charandas-nandaka-asset-advisory",
    "manoj-garlapati", "tarini-sai", "soldier-rewired", "man-who-builds-schools",
    "green-recykloplast", "nexgen-software", "westfield-international",
    "leenus-infra", "sindhu-reddy", "raghu-boddu"
];

// Mapping logic to handle both slugs and titles
$id_to_primary = [];
$primary_to_info = [];

// Fetch from DB to link slugs and titles
try {
    $stmt = $pdo->query("SELECT slug, title FROM posts");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $slug = $row['slug'];
        $title = $row['title'];
        $id_to_primary[$slug] = $slug;
        if ($title) {
            $id_to_primary[$title] = $slug;
        }
        $primary_to_info[$slug] = ['slug' => $slug, 'title' => $title];
    }
} catch (PDOException $e) {}

// Add static slugs if missing
foreach ($static_slugs as $s) {
    if (!isset($id_to_primary[$s])) {
        $id_to_primary[$s] = $s;
        $primary_to_info[$s] = ['slug' => $s, 'title' => null];
    }
}

// Ensure every post_id in the likes table is accounted for
try {
    $stmt = $pdo->query("SELECT DISTINCT post_id FROM likes");
    while ($id = $stmt->fetchColumn()) {
        if (!isset($id_to_primary[$id])) {
            $id_to_primary[$id] = $id;
            $primary_to_info[$id] = ['slug' => $id, 'title' => null];
        }
    }
} catch (PDOException $e) {}

$results = [];  

// Helper to generate a fake IP
function generateFakeIP() {
    return rand(10, 250) . '.' . rand(10, 250) . '.' . rand(10, 250) . '.' . rand(10, 250);
}

try {
    $pdo->beginTransaction();

    foreach ($primary_to_info as $primary_slug => $info) {
        $slug = $info['slug'];
        $title = $info['title'];

        // Determine target likes based on user request
        if ($slug === 'raghu-boddu' || (stripos($title ?? '', 'Raghu') !== false && stripos($title ?? '', 'ToggleNow') !== false)) {
            $targetCount = 25;
        } elseif ($slug === 'manoj-garlapati' || stripos($title ?? '', 'Manoj Garlapati') !== false) {
            $targetCount = 37;
        } elseif ($slug === 'man-who-builds-schools' || stripos($title ?? '', 'Ravi Madabhushi') !== false) {
            $targetCount = 23;
        } else {
            $targetCount = rand(10, 20);
        }

        // Identify all possible IDs linked to this post
        $linked_ids = array_unique([$slug, $title]);
        $linked_ids = array_filter($linked_ids); // Remove nulls
        
        // Count combined likes across all linked IDs
        $placeholders = implode(',', array_fill(0, count($linked_ids), '?'));
        $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM likes WHERE post_id IN ($placeholders)");
        $stmt->execute(array_values($linked_ids));
        $currentCount = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        $added = 0;
        $removed = 0;

        if ($currentCount < $targetCount) {
            $needed = $targetCount - $currentCount;
            for ($i = 0; $i < $needed; $i++) {
                $success = false;
                $attempts = 0;
                while (!$success && $attempts < 10) {
                    try {
                        $ip = generateFakeIP();
                        $insertStmt = $pdo->prepare("INSERT INTO likes (post_id, ip_address) VALUES (?, ?)");
                        $insertStmt->execute([$slug, $ip]);
                        $success = true;
                        $added++;
                    } catch (PDOException $e) {}
                    $attempts++;
                }
            }
        } elseif ($currentCount > $targetCount) {
            $toRemove = $currentCount - $targetCount;
            
            // Delete from all linked IDs (starting with title then slug), newest first
            foreach ($linked_ids as $id_val) {
                if ($toRemove <= 0) break;
                
                $delStmt = $pdo->prepare("DELETE FROM likes WHERE post_id = ? ORDER BY id DESC LIMIT ?");
                $delStmt->bindValue(1, $id_val, PDO::PARAM_STR);
                $delStmt->bindValue(2, (int)$toRemove, PDO::PARAM_INT);
                $delStmt->execute();
                
                $rowCount = $delStmt->rowCount();
                $removed += $rowCount;
                $toRemove -= $rowCount;
            }
        }
        
        $results[] = [
            'slug' => $slug,
            'title' => $title,
            'previous_likes' => $currentCount,
            'added_likes' => $added,
            'removed_likes' => $removed,
            'new_total' => $currentCount + $added - $removed
        ];
    }

    $pdo->commit();
    echo json_encode([
        'status' => 'success',
        'message' => 'Successfully adjusted all likes across slugs and titles.',
        'results' => $results
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
