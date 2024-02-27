<?php

// Raccolgo i dati dal form, li validizzo e mi assicuro arrivino come voglio
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$surname = isset($_POST['surname']) ? htmlspecialchars(trim($_POST['surname'])) : '';
$email = isset($_POST['email']) ? filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) : '';
$agency = isset($_POST['agency']) ? htmlspecialchars(trim($_POST['agency'])) : '';
$tel = isset($_POST['tel']) ? htmlspecialchars(trim($_POST['tel'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
$privacyPolicy = isset($_POST['privacyPolicy']) ? $_POST['privacyPolicy'] : '';

$mail = new PHPMailer\PHPMailer\PHPMailer();

// SMTP Configuration
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'gabri99.del@gmail.com';
$mail->Password = 'giannidg';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// to use e-mail : info@gevobadge.it


$mail->setFrom('gabri99.del@gmail.com', 'EBAfos Info');
$mail->addAddress($email, $name . $surname);

$mail->Subject = "Richiesta di contatto dalla Landing Page GevoBadge dall'agenzia" . "" . $agency;
$mail->Body = $message;

if ($mail->send()) {
    echo 'Mail inviata, ti ricontatteremo il prima possibile!';
} else {
    echo 'La mail non può essere inviata a causa di un errore: ' . $mail->ErrorInfo;
}

?>