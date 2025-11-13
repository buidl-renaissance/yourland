import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #050509 0%, #111124 100%);
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  padding: 6rem 2rem 4rem;
`;

const Header = styled.header`
  max-width: 900px;
  margin: 0 auto 4rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 auto;
  max-width: 900px;
`;

const ContentSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #00ff87;
`;

const SectionBody = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1.5rem;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  margin-top: 3rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff87;
  }
`;

const FAQList = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FAQItem = styled.div`
  background: rgba(0, 255, 135, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 255, 135, 0.2);
`;

const FAQQuestion = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #ffffff;
`;

const FAQAnswer = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
`;

export default function Support() {
  return (
    <>
      <Head>
        <title>Support - YourLand</title>
        <meta
          name="description"
          content="Get help with YourLand. Find answers to common questions, contact support, and join our community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <Header>
          <Title>Support</Title>
          <Subtitle>
            Need help? We&apos;re here for you. Find answers, get in touch, or join our community of builders.
          </Subtitle>
        </Header>

        <ContentSection>
          <Section>
            <SectionTitle>Common Questions</SectionTitle>
            <FAQList>
              <FAQItem>
                <FAQQuestion>How do I get started with YourLand?</FAQQuestion>
                <FAQAnswer>
                  Check out our <Link href="/claim" passHref legacyBehavior><a style={{ color: '#00ff87', textDecoration: 'underline' }}>Claim YourLand</a></Link> page for step-by-step instructions on setting up your local-first node and securing your identity.
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQQuestion>What makes YourLand different from other social networks?</FAQQuestion>
                <FAQAnswer>
                  YourLand is built on local-first architecture. Your data lives on your device in an encrypted SQLite database, not on our servers. You truly own your data, connections, and digital experiences.
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQQuestion>Do I need an internet connection to use YourLand?</FAQQuestion>
                <FAQAnswer>
                  YourLand works offline-first. Once set up, you can access your social graph, games, and content without an internet connection. Local networking features like Bluetooth allow you to connect with nearby users.
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQQuestion>Is my data secure?</FAQQuestion>
                <FAQAnswer>
                  Yes. Your data is encrypted at rest in your local SQLite database. End-to-end encryption ensures your communications are private. Even if someone gets physical access to your device, your encrypted data remains secure.
                </FAQAnswer>
              </FAQItem>

              <FAQItem>
                <FAQQuestion>Can I customize my YourLand experience?</FAQQuestion>
                <FAQAnswer>
                  Absolutely! YourLand brings back the creative freedom of early web platforms. You have complete control over your space, data models, and interface—just like the MySpace days, but with modern privacy and ownership.
                </FAQAnswer>
              </FAQItem>
            </FAQList>
          </Section>

          <Section>
            <SectionTitle>Get Help</SectionTitle>
            <SectionBody>
              This is an early prototype of YourLand. As the project develops, we&apos;ll add documentation, community channels, and support resources. For now, check out the FAQ section above for answers to common questions.
            </SectionBody>
            <SectionBody>
              For inquiries, please contact us at <a href="mailto:john@thebarefoot.dev" style={{ color: '#00ff87', textDecoration: 'underline' }}>john@thebarefoot.dev</a>.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Report an Issue</SectionTitle>
            <SectionBody>
              Found a bug or have a feature request? Your feedback helps us build a better YourLand. Please reach out to <a href="mailto:john@thebarefoot.dev" style={{ color: '#00ff87', textDecoration: 'underline' }}>john@thebarefoot.dev</a> with your feedback.
            </SectionBody>
          </Section>
        </ContentSection>

        <Link href="/" passHref legacyBehavior>
          <BackLink>← Back to Home</BackLink>
        </Link>
      </PageContainer>
    </>
  );
}

