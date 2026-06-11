<?php
// api/otp.php
require_once 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Dynamically ensure the otps table exists
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS otps (
        email VARCHAR(255) PRIMARY KEY,
        otp VARCHAR(6) NOT NULL,
        created_at INTEGER NOT NULL
    )");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database setup error: ' . $e->getMessage()]);
    exit();
}

$action = $_POST['action'] ?? '';
$email = trim($_POST['email'] ?? '');

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email address is required.']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address format.']);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($action === 'send') {
    // Generate a secure 6-digit OTP
    $otp = sprintf("%06d", mt_rand(0, 999999));
    $timestamp = time();

    // Store in DB (UPSERT or replace)
    try {
        $stmt = $pdo->prepare("REPLACE INTO otps (email, otp, created_at) VALUES (?, ?, ?)");
        $stmt->execute([$email, $otp, $timestamp]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to save OTP: ' . $e->getMessage()]);
        exit();
    }

    // Send email using PHPMailer
    if (!class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
        require_once __DIR__ . '/PHPMailer/Exception.php';
        require_once __DIR__ . '/PHPMailer/PHPMailer.php';
        require_once __DIR__ . '/PHPMailer/SMTP.php';
    }

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

        $mail->setFrom($_ENV['SMTP_FROM'] ?? 'webanatomysocial@gmail.com', $_ENV['SMTP_FROM_NAME'] ?? 'SuccessWikis Verification');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = "Verify your Business Email - OTP: " . $otp;

        $htmlBody = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px;'>
            <h2 style='color: #0033bf; text-align: center;'>Email Verification</h2>
            <p>Hello,</p>
            <p>Thank you for initiating your application for <strong>Driven by Purpose</strong> on SuccessWikis. To verify your business email address, please use the following One-Time Password (OTP):</p>
            <div style='text-align: center; margin: 30px 0;'>
                <span style='font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #000000; background-color: #f5f5f5; padding: 10px 25px; border-radius: 6px; border: 1px solid #dcdcdc; display: inline-block;'>{$otp}</span>
            </div>
            <p style='color: #666; font-size: 13px; text-align: center;'>This OTP is valid for 15 minutes. Please do not share this code with anyone.</p>
            <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'/>
            <p style='font-size: 12px; color: #999; text-align: center;'>If you did not request this code, please ignore this email.</p>
        </div>
        ";

        $mail->Body = $htmlBody;
        $mail->send();

        echo json_encode(['status' => 'success', 'message' => 'OTP sent successfully to ' . $email]);
    } catch (\Exception $e) {
        error_log("PHPMailer OTP Error: " . $mail->ErrorInfo . ". Falling back to PHP mail().");

        $subject = "Verify your Business Email - OTP: " . $otp;
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $from = $_ENV['SMTP_FROM'] ?? 'webanatomysocial@gmail.com';
        $headers .= "From: {$from}\r\n";

        if (mail($email, $subject, $htmlBody, $headers)) {
            echo json_encode(['status' => 'success', 'message' => 'OTP sent successfully (fallback)']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to send email. SMTP Error: ' . $e->getMessage()]);
        }
    }
} elseif ($action === 'verify') {
    $userOtp = trim($_POST['otp'] ?? '');

    if (empty($userOtp)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'OTP is required.']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM otps WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'No OTP request found for this email.']);
            exit();
        }

        // Validate expiration (15 minutes = 900 seconds)
        if (time() - $row['created_at'] > 900) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'OTP has expired. Please request a new one.']);
            exit();
        }

        if ($row['otp'] === $userOtp) {
            // Success: delete the OTP record so it cannot be reused
            $del_stmt = $pdo->prepare("DELETE FROM otps WHERE email = ?");
            $del_stmt->execute([$email]);

            echo json_encode(['status' => 'success', 'message' => 'Email verified successfully!']);
        } else {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid OTP. Please check the code and try again.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database query error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
}
?>
