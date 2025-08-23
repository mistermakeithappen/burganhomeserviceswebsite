import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>
          
          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
          </Section>
          
          {phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>
                <Link href={`tel:${phone}`} style={link}>
                  {phone}
                </Link>
              </Text>
            </Section>
          )}
          
          <Hr style={hr} />
          
          <Section>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            This email was sent from the Burgan Home Services contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f4f4f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginTop: '20px',
  borderRadius: '8px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1e293b',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const section = {
  margin: '20px 0',
  padding: '0 20px',
};

const label = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px',
};

const value = {
  color: '#1e293b',
  fontSize: '16px',
  margin: '0',
};

const messageText = {
  color: '#1e293b',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const link = {
  color: '#4f46e5',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
};

const footer = {
  color: '#94a3b8',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '20px',
};