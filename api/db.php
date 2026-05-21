<?php
// api/db.php
// Setup headers for CORS if needed during local dev (if React and PHP are on different ports)
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// Simple .env parser function
function loadEnv($path) {
    if(!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach($lines as $line) {
        if(strpos(trim($line), '#') === 0) continue;
        if(strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $_ENV[trim($name)] = trim($value, ' "\'');
        }
    }
}
loadEnv(__DIR__ . '/.env');

$db_connection = $_ENV['DB_CONNECTION'] ?? 'sqlite';

try {
    if ($db_connection === 'mysql') {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $dbname = $_ENV['DB_NAME'] ?? '';
        $user = $_ENV['DB_USER'] ?? '';
        $pass = $_ENV['DB_PASS'] ?? '';
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
        $auto_inc = "AUTO_INCREMENT";
    } else {
        $db_file = __DIR__ . '/database.sqlite';
        $pdo = new PDO("sqlite:" . $db_file);
        $pdo->exec("PRAGMA journal_mode = WAL");
        $pdo->exec("PRAGMA synchronous = NORMAL");
        $auto_inc = "AUTOINCREMENT";
    }

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create tables and indexes if they don't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY $auto_inc,
        post_id VARCHAR(255) NOT NULL,
        ip_address VARCHAR(255) NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(post_id, ip_address)
    )");
    $pdo->exec("CREATE INDEX " . ($db_connection === 'mysql' ? "idx_likes_post" : "IF NOT EXISTS idx_likes_post") . " ON likes(post_id)");
    $pdo->exec("CREATE INDEX " . ($db_connection === 'mysql' ? "idx_likes_ip" : "IF NOT EXISTS idx_likes_ip") . " ON likes(ip_address)");

    $pdo->exec("CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY $auto_inc,
        post_id VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    $pdo->exec("CREATE INDEX " . ($db_connection === 'mysql' ? "idx_comments_post" : "IF NOT EXISTS idx_comments_post") . " ON comments(post_id)");

    // --- ADMIN & POSTS TABLES ---
    
    // Users table for Admin Login
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY $auto_inc,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        is_active INTEGER DEFAULT 1,
        avatar VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // User permissions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS user_permissions (
        user_id INTEGER PRIMARY KEY,
        can_manage_blogs INTEGER DEFAULT 1,
        can_manage_ads INTEGER DEFAULT 1,
        can_manage_comments INTEGER DEFAULT 1,
        can_manage_announcements INTEGER DEFAULT 1,
        can_review_blogs INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");

    // Login attempts for rate limiting
    $pdo->exec("CREATE TABLE IF NOT EXISTS login_attempts (
        ip VARCHAR(255) PRIMARY KEY,
        attempts INTEGER DEFAULT 1,
        last_attempt INTEGER NOT NULL
    )");

    // Posts table (for blogs, pods, success lens, events)
    $pdo->exec("CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY $auto_inc,
        post_type VARCHAR(100) NOT NULL, 
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        meta_description TEXT,
        excerpt TEXT,
        content TEXT,
        image_url VARCHAR(255),
        category VARCHAR(100),
        published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_published INTEGER DEFAULT 1,
        outer_heading VARCHAR(255),
        inner_heading VARCHAR(255),
        deleted_at DATETIME DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    // Note: post_type can be 'blog', 'pod', 'success_lens', 'event'
    $pdo->exec("CREATE INDEX " . ($db_connection === 'mysql' ? "idx_posts_type" : "IF NOT EXISTS idx_posts_type") . " ON posts(post_type)");
    $pdo->exec("CREATE INDEX " . ($db_connection === 'mysql' ? "idx_posts_slug" : "IF NOT EXISTS idx_posts_slug") . " ON posts(slug)");



} catch (PDOException $e) {
    // Suppress index already exists error for mysql compatibility without dropping tables
    if ($db_connection !== 'mysql' || (strpos($e->getMessage(), 'Duplicate key name') === false && strpos($e->getMessage(), 'already exists') === false)) {
        die("Database connection failed: " . $e->getMessage());
    }
}

// Add youtube_link migration safely outside the main blocks
try {
    $pdo->exec("ALTER TABLE posts ADD COLUMN youtube_link VARCHAR(500)");
} catch (PDOException $e) {
    // Ignore column already exists error
}

try {
    $pdo->exec("ALTER TABLE posts ADD COLUMN initial_likes INTEGER DEFAULT 0");
} catch (PDOException $e) {}

try {
    $pdo->exec("ALTER TABLE posts ADD COLUMN outer_heading VARCHAR(255)");
} catch (PDOException $e) {}

try {
    $pdo->exec("ALTER TABLE posts ADD COLUMN inner_heading VARCHAR(255)");
} catch (PDOException $e) {}

try {
    $pdo->exec("ALTER TABLE posts ADD COLUMN deleted_at DATETIME DEFAULT NULL");
} catch (PDOException $e) {}
?>
