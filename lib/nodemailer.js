import nodemailer from 'nodemailer';

const email = "abhaydestroyerbackup@gmail.com";
const password = "cwgzmmzkqtctmrzf";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;