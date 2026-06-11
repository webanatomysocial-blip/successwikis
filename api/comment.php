<?php
// api/comment.php
require_once __DIR__ . '/db.php';

// 1. Get request method and input
$method = $_SERVER['REQUEST_METHOD'];
$post_id = null;
$user_name = 'Anonymous';
$content = '';

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $post_id = isset($data['post_id']) ? $data['post_id'] : null;
    $user_name = isset($data['user_name']) ? trim($data['user_name']) : 'Anonymous';
    $content = isset($data['content']) ? trim($data['content']) : '';
} else {
    $post_id = isset($_GET['post_id']) ? $_GET['post_id'] : null;
}

// 2. Validate post_id
if (!$post_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing post_id']);
    exit;
}

// 3. Handle comment posting
if ($method === 'POST') {
    if (empty($content)) {
        echo json_encode(['error' => 'Comment cannot be empty']);
        exit;
    }

    // --- AGGRESSIVE SECURITY FILTERING ---
    
    // A. Profanity Filter (Case-insensitive & Spaced)
    $bad_words = [
        'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'retard', 'nigger', 'cunt', 'faggot', 
        'bastard', 'motherfucker', 'cock', 'tits', 'boobs', 'penis', 'vagina', 'sex', 'porn', 'xxx', 'douche', 'anus',
        'blowjob', 'bollocks', 'bugger', 'clit', 'cum', 'damn', 'fag', 'handjob', 'horny', 'jizz', 'kike', 'spic', 
        'twat', 'wanker', 'dyke', 'koon', 'muff', 'prick', 'piss', 'queer', 'scrotum', 'tosser'
    ];

    foreach ($bad_words as $word) {
        // 1. Check exact word with boundaries
        if (preg_match("/\b" . preg_quote($word, '/') . "\b/i", $content)) {
            echo json_encode(['error' => 'Your comment contains inappropriate language.']);
            exit;
        }

        // 2. Check spaced/obfuscated version (e.g., "f u c k", "s.h.i.t")
        // Build pattern: \b f \W* u \W* c \W* k \b
        $chars = str_split($word);
        $pattern = '/\b';
        foreach ($chars as $i => $char) {
            $pattern .= preg_quote($char, '/');
            if ($i < count($chars) - 1) {
                $pattern .= '\W*'; // Allow non-word chars (spaces, dots, etc.) in between
            }
        }
        $pattern .= '\b/i';

        if (preg_match($pattern, $content)) {
            echo json_encode(['error' => 'Your comment contains inappropriate language.']);
            exit;
        }
    }

    // B. Code & Script Filter (Aggressive)
    $patterns = [
        '/<script/i',         // <script> tags
        '/<\?php/i',          // PHP tags
        '/<[a-z][\s\S]*>/i',  // Any HTML tags
        '/function\s*\(/i',   // JS functions
        '/=>/i',              // Arrow functions
        '/\b(var|let|const)\b\s+\w+\s*=/i', // JS variable declarations
        '/console\./i',       // Console logs
        '/alert\(/i',         // Alerts
        '/\{[\s\S]*\}/',      // JSON or CSS blocks
        '/;$/m',              // Lines ending in semicolons (often code)
        '/SELECT.*FROM/i',    // SQL injection
        '/DROP\s+TABLE/i',    // SQL injection
        '/javascript:/i'      // JS protocol
    ];

    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $content)) {
            echo json_encode(['error' => 'Security check: Code or HTML is not allowed in comments.']);
            exit;
        }
    }

    // 4. Sanitize and store
    $user_name = htmlspecialchars($user_name, ENT_QUOTES, 'UTF-8');
    $content = htmlspecialchars($content, ENT_QUOTES, 'UTF-8');

    $stmt = $pdo->prepare("INSERT INTO comments (post_id, user_name, content) VALUES (?, ?, ?)");
    $stmt->execute([$post_id, $user_name, $content]);
}

// 5. Always return last 5 comments
$stmt = $pdo->prepare("SELECT user_name, content, timestamp FROM comments WHERE post_id = ? ORDER BY timestamp DESC LIMIT 5");
$stmt->execute([$post_id]);
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($comments);
?>
