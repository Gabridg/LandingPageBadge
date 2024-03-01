<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'vendor/phpmailer/PHPMailer/src/PHPMailer.php';
require 'vendor/phpmailer/PHPMailer/src/SMTP.php';
require 'vendor/phpmailer/PHPMailer/src/Exception.php';

require 'vendor/autoload.php';

// Raccolgo i dati dal form, li validizzo e mi assicuro arrivino come voglio
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$surname = isset($_POST['surname']) ? htmlspecialchars(trim($_POST['surname'])) : '';
$email = isset($_POST['email']) ? filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) : '';
$agency = isset($_POST['agency']) ? htmlspecialchars(trim($_POST['agency'])) : '';
$tel = isset($_POST['tel']) ? htmlspecialchars(trim($_POST['tel'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
$privacyPolicy = isset($_POST['privacyPolicy']) ? $_POST['privacyPolicy'] : '';

$mail = new PHPMailer();


// SMTP Configuration
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'gabri99.del@gmail.com';
$mail->Password = 'cewn wxje lvti nbeq';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

// to use e-mail : info@gevobadge.it


$mail->setFrom('gabri99.del@gmail.com', 'EBAfos Info');
$mail->addAddress('gabri99.del@gmail.com', $name . " " . $surname);

$mail->Subject = "Richiesta di contatto dalla Landing Page GevoBadge dall'agenzia" . " " . $agency;
$mail->Body =  $message . "\n\n" . 
"Indirizzo e-mail di chi ha inviato la mail: " . $email . "\n" . 
"Numero di telefono di chi ha inviato la mail (se presente): " . (isset($tel) ? $tel : "");

if ($mail->send()) {
    // Se l'invio ha avuto successo, reindirizza all'index.html con un messaggio di conferma
    header('Location: index.html?success=true');
    exit;
} else {
    // Se l'invio ha fallito, reindirizza all'index.html con un messaggio di errore
    header('Location: index.html?success=false');
    exit;
}

?>