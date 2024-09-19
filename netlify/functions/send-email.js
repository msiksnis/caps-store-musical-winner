import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fullName, subject, email, message } = body;

    const htmlContent = `
      <html>
        <body
            style="background-color: #f6f9fc;
            font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
            &quot;Helvetica Neue&quot;, Ubuntu, sans-serif;">
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  max-width: 37.5em;
                  background-color: #ffffff;
                  margin: 0 auto;
                  padding: 20px 0 48px;
                  margin-bottom: 64px;
                ">
                <tbody>
                  <tr style="width: 100%">
                    <td>
                      <table
                        align="center"
                        width="100%"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="padding: 0 48px"
                      >
                        <tbody>
                          <tr>
                            <td>
                                <p
                                style="
                                  font-size: 18px;
                                  line-height: 24px;
                                  margin: 16px 0;
                                  color: #3f4553;
                                  text-align: left;
                                "
                              >
                              From: ${fullName}
                              </p>
                              <p
                                style="
                                  font-size: 24px;
                                  line-height: 24px;
                                  margin: 16px 0;
                                  color: #3f4553;
                                  text-align: left;
                                "
                              >
                                Subject: ${subject || "No Subject Provided"}
                              </p>
                              <hr
                                style="
                                  width: 100%;
                                  border: none;
                                  border-top: 1px solid #eaeaea;
                                  border-color: #e6ebf1;
                                  margin: 20px 0;
                                "
                              />
                              <p
                                style="
                                  font-size: 22px;
                                  line-height: 24px;
                                  margin: 16px 0;
                                  color: #42454d
                                  text-align: left;
                                "
                              >
                                ${message}
                              </p
                              <hr
                                style="
                                  width: 100%;
                                  border: none;
                                  border-top: 1px solid #eaeaea;
                                  border-color: #e6ebf1;
                                  margin: 20px 0;
                                "
                              />
                              </p>      
                              <span>Email: 
                                <a
                                  href=mailto:${email}
                                  style="color: #556cd6; text-decoration: none"
                                  target="_blank"
                                >${email}</a>
                              </span>
                              <hr
                                style="
                                  width: 100%;
                                  border: none;
                                  border-top: 1px solid #eaeaea;
                                  border-color: #e6ebf1;
                                  margin: 20px 0;
                                "
                              />
                              <p
                                style="
                                  font-size: 12px;
                                  line-height: 16px;
                                  margin: 16px 0;
                                  color: #8898aa;
                                "
                              >
                                This email was sent from Mr Cap&apos;s Store website.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
          </html>
        `;

    // Sends email using Resend API
    const data = await resend.emails.send({
      from: `${fullName} <email@mail.devmarty.com>`,
      to: ["msiksnis@gmail.com"], // Recipient's email
      subject: "A message through Mr Cap's Store",
      html: htmlContent,
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
