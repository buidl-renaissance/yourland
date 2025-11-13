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

const LastUpdated = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2rem;
  font-style: italic;
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

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - YourLand</title>
        <meta
          name="description"
          content="YourLand Privacy Policy. Learn how we protect your privacy and data ownership."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <Header>
          <Title>Privacy Policy</Title>
          <Subtitle>
            Your privacy isn&apos;t optional—it&apos;s the foundation of YourLand. Here&apos;s how we protect it.
          </Subtitle>
        </Header>

        <ContentSection>
          <LastUpdated>Last Updated: January 2025</LastUpdated>

          <Section>
            <SectionTitle>Our Privacy-First Promise</SectionTitle>
            <SectionBody>
              YourLand is built on a simple principle: your data belongs to you. We don&apos;t collect, store, or monetize your personal information. Unlike traditional social networks that surveil and extract value from users, YourLand is designed from the ground up to protect your privacy and digital sovereignty.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Data Ownership</SectionTitle>
            <SectionBody>
              All your data—your social graph, messages, content, game progress, and digital assets—is stored locally on your device in an encrypted SQLite database. We don&apos;t have access to it. You do. Your data never leaves your device unless you explicitly choose to share it with others via local networking.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Local-First Architecture</SectionTitle>
            <SectionBody>
              YourLand operates on a local-first, offline-first architecture. This means your data lives on your device first and foremost. Connections with other users happen via local area networks (LAN), Bluetooth, or peer-to-peer protocols—not through our servers. We don&apos;t act as intermediaries in your communications.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Encryption</SectionTitle>
            <SectionBody>
              Your data is encrypted at rest using industry-standard encryption. Your communications are protected with end-to-end encryption. Even if someone gains physical access to your device, your encrypted data remains secure and unreadable without your keys.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>What We Don&apos;t Collect</SectionTitle>
            <SectionBody>
              We don&apos;t collect personal information. We don&apos;t track your behavior. We don&apos;t use analytics or advertising trackers. We don&apos;t build profiles about you. We don&apos;t sell your data to third parties—because we don&apos;t have it to sell.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Voluntary Information</SectionTitle>
            <SectionBody>
              If you choose to contact us for support or join our community channels, you may voluntarily provide information like your email address. This information is used solely to respond to your inquiries and is not used for marketing or shared with third parties.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Third-Party Services</SectionTitle>
            <SectionBody>
              YourLand is designed to minimize reliance on third-party services. When we do link to external resources (like documentation or community channels), please review their privacy policies separately. We don&apos;t embed third-party tracking or analytics on our platform.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Your Rights</SectionTitle>
            <SectionBody>
              Since your data lives on your device, you have complete control. You can export your data, delete it, or move it to another device at any time. There&apos;re no accounts to close, no data deletion requests to file—it&apos;s all yours to manage.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Changes to This Policy</SectionTitle>
            <SectionBody>
              If we make changes to this privacy policy, we&apos;ll update the &quot;Last Updated&quot; date at the top of this page. Since our core architecture means we don&apos;t collect your data, changes to this policy are unlikely to affect how your data is handled—but we&apos;ll always keep you informed.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Contact Us</SectionTitle>
            <SectionBody>
              If you have questions about this privacy policy or how YourLand protects your privacy, please contact us at <a href="mailto:john@thebarefoot.dev" style={{ color: '#00ff87', textDecoration: 'underline' }}>john@thebarefoot.dev</a>.
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Open Source Transparency</SectionTitle>
            <SectionBody>
              YourLand is built on open-source principles. Our code is available for review, audit, and improvement by the community. This transparency ensures that our privacy promises aren&apos;t just words—they&apos;re verifiable in the code itself.
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

