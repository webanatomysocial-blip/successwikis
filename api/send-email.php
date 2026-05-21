<?php
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
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'webanatomysocial@gmail.com';
    $mail->Password = 'ensk hqxk wqks rkua';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('webanatomysocial@gmail.com', 'Sase Contact Form');
    $mail->addAddress('parceldropnetworks@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "New Lead: Sase - " . $name;

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

    $mail->Body = $htmlBody;

    $mail->send();
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "PHPMailer Error: " . $mail->ErrorInfo]);
}
?>
