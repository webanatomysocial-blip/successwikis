<?php
// api/tts.php

// Simple .env parser function (same as in db.php)
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

// CORS headers
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

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$text = $input['text'] ?? '';

if (empty($text)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Text is required']);
    exit;
}

$apiKey = $_ENV['ELEVENLABS_API_KEY'] ?? '';
if (empty($apiKey)) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'API key is missing']);
    exit;
}

// "Callum" (a natural sounding voice, can be changed)
$voiceId = "N2lVS1w4EtoT3dr4eOWO"; 

$url = "https://api.elevenlabs.io/v1/text-to-speech/{$voiceId}/with-timestamps";

$data = [
    "text" => $text,
    "model_id" => "eleven_multilingual_v2",
    "voice_settings" => [
        "stability" => 0.5,
        "similarity_boost" => 0.75
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: application/json",
    "xi-api-key: " . $apiKey,
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$err = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($err) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'cURL Error: ' . $err]);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response; // Return ElevenLabs error to client for debugging
    exit;
}

// Return the ElevenLabs response (contains audio_base64 and alignment)
echo $response;
?>
