import { Resend } from "resend";
import ContactMeTemplate from "../../src/components/contact/email/email-template";
import dotenv from "dotenv";

dotenv.config(); // This loads environment variables from your .env file

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fullName } = body;

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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
