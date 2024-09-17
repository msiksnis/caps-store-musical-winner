// /src/components/contact/email/email-template.tsx

import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactMeTemplateProps {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export const ContactMeTemplate = ({
  fullName,
  subject,
  email,
  message,
}: ContactMeTemplateProps) => {
  const previewText = `${fullName}': ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section style={{ paddingBottom: "20px" }}>
              <Row>
                <Text style={heading}>Subject: {subject}</Text>
                <Text style={review}>{message}</Text>
                <Text style={paragraph}>{email}</Text>
              </Row>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
};

const paragraph = {
  fontSize: "18px",
  textDecoration: "none",
  marginTop: "40px",
};

const review = {
  padding: "24px",
  backgroundColor: "#f2f3f3",
  fontSize: "24px",
  borderRadius: "4px",
};
