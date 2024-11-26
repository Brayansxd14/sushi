// config/nodemail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Crear el transporter con Ethereal
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        // Configuración del email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text
        };

        // Enviar el email
        const info = await transporter.sendMail(mailOptions);
        console.log('Mensaje enviado: %s', info.messageId);
        
        // URL de vista previa de Ethereal
        console.log('URL de vista previa: %s', nodemailer.getTestMessageUrl(info));
        
        return true;
    } catch (error) {
        console.error('Error al enviar email:', error);
        throw error;
    }
};

// Verificar la configuración
transporter.verify(function(error, success) {
    if (error) {
        console.log('Error en la configuración del servidor de correo:', error);
    } else {
        console.log('Servidor listo para enviar emails');
    }
});

export default sendEmail;
