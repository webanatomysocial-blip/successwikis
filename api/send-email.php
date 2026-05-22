<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// FormData from frontend is sent as multipart/form-data, so it's in $_POST
$input = $_POST;

if (empty($input)) {
    // Fallback just in case it was sent as JSON
    $json = json_decode(file_get_contents('php://input'), true);
    if ($json) {
        $input = $json;
    }
}

if (empty($input)) {
    echo json_encode(["success" => false, "message" => "No data provided."]);
    exit();
}

$name = $input['name'] ?? 'No Name';
$email = $input['email'] ?? 'No Email';
$phone = $input['phone'] ?? 'No Phone';
$industry = $input['industry'] ?? 'Not Specified';
$units = $input['units'] ?? 'Not Specified';
$timeline = $input['timeline'] ?? 'Not Specified';
$location = $input['location'] ?? 'Not Specified';
$message = $input['message'] ?? 'No Message';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USER'] ?? 'webanatomysocial@gmail.com';
    $mail->Password = $_ENV['SMTP_PASS'] ?? 'bjvd jlqd roif gdtq';
    $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $_ENV['SMTP_PORT'] ?? 465;
    $mail->CharSet = 'UTF-8';

    $toEmail = $input['recipient'] ?? 'parceldropnetworks@gmail.com';
    $mail->setFrom($_ENV['SMTP_FROM'] ?? 'webanatomysocial@gmail.com', $_ENV['SMTP_FROM_NAME'] ?? 'Sase Contact Form');
    $mail->addAddress($toEmail);
    $mail->addReplyTo($email, $name); 

    $mail->isHTML(true);
    $mail->Subject = $input['subject'] ?? ("New Lead: Sase - " . $name);

    if (isset($input['body'])) {
        $htmlBody = $input['body'];
    } else {
        $htmlBody = "
        <h2>New Lead Captured via Contact Form</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Industry:</strong> {$industry}</p>
        <p><strong>Estimated Units Needed:</strong> {$units}</p>
        <p><strong>Project Timeline:</strong> {$timeline}</p>
        <p><strong>Installation Location:</strong> {$location}</p>
        <p><strong>Specific Use Case Details:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
    }

    $mail->Body = $htmlBody;

    $mail->send();
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);

} catch (\Exception $e) {
    error_log("PHPMailer SMTP Error: " . $mail->ErrorInfo . ". Attempting PHP mail() fallback.");
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $from = $_ENV['SMTP_FROM'] ?? 'webanatomysocial@gmail.com';
    $headers .= "From: {$from}\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    
    $subject = $input['subject'] ?? ("New Lead: Sase - " . $name);
    
    if (mail($toEmail, $subject, $htmlBody, $headers)) {
        echo json_encode(["success" => true, "message" => "Email sent successfully via fallback."]);
    } else {
        echo json_encode(["success" => false, "message" => "PHPMailer Error: " . $e->getMessage()]);
    }
}
?>
