const { Resend } = require("resend");
const ContactMeTemplate = require("./email-template").default;

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fullName } = body;

    // Send email using Resend API
    const data = await resend.emails.send({
      from: `${fullName} <email@mail.devmarty.com>`,
      to: ["msiksnis@gmail.com"],
      subject: "A message through Cap's Store",
      react: ContactMeTemplate(body),
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
