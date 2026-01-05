import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Configurar el transporte (Usaremos Gmail como ejemplo)
  // NOTA: Para Gmail necesitas una "Contraseña de Aplicación", no tu pass normal.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Tu correo
      pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación
    }
  });

  // 2. Definir el mensaje
  const mailOptions = {
    from: `Nexora Tech Support <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  // 3. Enviar
  await transporter.sendMail(mailOptions);
};

export default sendEmail;