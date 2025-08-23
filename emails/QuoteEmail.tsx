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

interface QuoteEmailProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  urgency: string;
  budget?: string;
  message: string;
}

export default function QuoteEmail({
  name,
  email,
  phone,
  service,
  propertyType,
  urgency,
  budget,
  message,
}: QuoteEmailProps) {
  const urgencyColor = urgency === 'Emergency' ? '#dc2626' : 
                       urgency === 'This week' ? '#f59e0b' : '#10b981';
  
  return (
    <Html>
      <Head />
      <Preview>New quote request from {name} - {service}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Quote Request</Heading>
          
          <Section style={urgencyBanner}>
            <Text style={{...urgencyText, color: urgencyColor}}>
              {urgency === 'Emergency' ? '🚨 ' : ''}{urgency.toUpperCase()}
            </Text>
          </Section>
          
          <Section style={section}>
            <Text style={sectionTitle}>Contact Information</Text>
            
            <div style={infoRow}>
              <Text style={label}>Name:</Text>
              <Text style={value}>{name}</Text>
            </div>
            
            <div style={infoRow}>
              <Text style={label}>Email:</Text>
              <Text style={value}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>
            </div>
            
            <div style={infoRow}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>
                <Link href={`tel:${phone}`} style={link}>
                  {phone}
                </Link>
              </Text>
            </div>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={section}>
            <Text style={sectionTitle}>Project Details</Text>
            
            <div style={infoRow}>
              <Text style={label}>Service Requested:</Text>
              <Text style={value}>{service}</Text>
            </div>
            
            <div style={infoRow}>
              <Text style={label}>Property Type:</Text>
              <Text style={value}>{propertyType}</Text>
            </div>
            
            {budget && (
              <div style={infoRow}>
                <Text style={label}>Budget:</Text>
                <Text style={value}>{budget}</Text>
              </div>
            )}
          </Section>
          
          <Hr style={hr} />
          
          <Section style={section}>
            <Text style={sectionTitle}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={actionSection}>
            <Text style={actionText}>
              Respond to this quote request within 24 hours to maintain customer satisfaction.
            </Text>
          </Section>
          
          <Text style={footer}>
            This quote request was submitted via the Burgan Home Services website.
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
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const h1 = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0 20px',
};

const urgencyBanner = {
  backgroundColor: '#fef2f2',
  padding: '12px 20px',
  margin: '0 20px 20px',
  borderRadius: '6px',
  textAlign: 'center' as const,
};

const urgencyText = {
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const section = {
  margin: '20px 0',
  padding: '0 20px',
};

const sectionTitle = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const infoRow = {
  marginBottom: '12px',
};

const label = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px',
  display: 'inline-block',
  width: '140px',
};

const value = {
  color: '#1e293b',
  fontSize: '16px',
  margin: '0',
  display: 'inline-block',
};

const messageText = {
  color: '#1e293b',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '6px',
};

const link = {
  color: '#4f46e5',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '24px 20px',
};

const actionSection = {
  backgroundColor: '#f0f9ff',
  padding: '16px 20px',
  margin: '20px',
  borderRadius: '6px',
  borderLeft: '4px solid #3b82f6',
};

const actionText = {
  color: '#1e40af',
  fontSize: '14px',
  margin: '0',
  fontWeight: '500',
};

const footer = {
  color: '#94a3b8',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '20px',
};