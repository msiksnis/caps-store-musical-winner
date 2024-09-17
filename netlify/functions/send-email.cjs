// const { Resend } = require("resend");

// // Initialize Resend with your API key
// const resend = new Resend(process.env.RESEND_API_KEY);

// exports.handler = async (event) => {
//   try {
//     const body = JSON.parse(event.body);
//     const { fullName, subject, email, message } = body;

//     // Construct the plain HTML for the email
//     const htmlContent = `
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             .container { padding: 20px; }
//             .heading { font-size: 24px; font-weight: bold; }
//             .paragraph { font-size: 18px; margin-top: 20px; }
//             .message { background-color: #f2f3f3; padding: 15px; border-radius: 4px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1 class="heading">Subject: ${subject}</h1>
//             <div class="message">
//               <p class="paragraph">${message}</p>
//             </div>
//             <p class="paragraph">Sent by: ${fullName}</p>
//             <p class="paragraph">Email: ${email}</p>
//           </div>
//         </body>
//       </html>
//     `;

//     // Send email using Resend API
//     const data = await resend.emails.send({
//       from: `${fullName} <email@mail.devmarty.com>`,
//       to: ["msiksnis@gmail.com"], // Recipients email
//       subject: "A message through Cap's Store",
//       html: htmlContent, // Send plain HTML
//     });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ data }),
//     };
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// };

import { Resend } from "resend";

const resend = new Resend("re_GPun6Gbh_Q9aRKeCHRA9mqKdKmQoWfmMA");

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fullName, subject, email, message } = body;

    // Construct the plain HTML for the email
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; }
            .heading { font-size: 24px; font-weight: bold; }
            .paragraph { font-size: 18px; margin-top: 20px; }
            .message { background-color: #f2f3f3; padding: 15px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="heading">Subject: ${subject}</h1>
            <div class="message">
              <p class="paragraph">${message}</p>
            </div>
            <p class="paragraph">Sent by: ${fullName}</p>
            <p class="paragraph">Email: ${email}</p>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend API
    const data = await resend.emails.send({
      from: `${fullName} <email@mail.devmarty.com>`,
      to: ["msiksnis@gmail.com"], // Recipient's email
      subject: "A message through Cap's Store",
      html: htmlContent, // Send plain HTML
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
