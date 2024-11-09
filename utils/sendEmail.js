// import nodemailer from "nodemailer";

// export const sendWelcomeEmail = async (email) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // Use appropriate email service
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Welcome to Survey Vista!",
//     text: "Hope you will find your destination.",
//   };

//   await transporter.sendMail(mailOptions);
// };
