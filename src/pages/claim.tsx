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
  max-width: 700px;
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

const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 2.5rem;
`;

const StepItem = styled.li`
  display: grid;
  gap: 1rem;
  background: rgba(0, 255, 135, 0.08);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(0, 255, 135, 0.2);
  box-shadow: 0 20px 40px rgba(0, 255, 135, 0.1);
`;

const StepNumber = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #00ff87;
  text-transform: uppercase;
`;

const StepTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
`;

const StepBody = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
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

export default function Claim() {
  return (
    <>
      <Head>
        <title>Claim YourLand - Get Started</title>
        <meta
          name="description"
          content="Follow the steps to claim YourLand, set up your local-first node, and start inviting builders into your network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <Header>
          <Title>Claim YourLand</Title>
          <Subtitle>
            This guide walks you through spinning up your first local-first node, securing your keys,
            and connecting with nearby builders. Move through each step, then remix the stack to fit your world.
          </Subtitle>
        </Header>

        <ContentSection>
          <StepList>
            <StepItem>
              <StepNumber>Step 01</StepNumber>
              <StepTitle>Set Up the Builder Node</StepTitle>
              <StepBody>
                Clone the repo, install dependencies with <code>yarn</code>, and run the local node. The offline-first
                architecture means you can prototype anywhere—coffee shop Wi-Fi optional.
              </StepBody>
            </StepItem>

            <StepItem>
              <StepNumber>Step 02</StepNumber>
              <StepTitle>Secure Your Identity</StepTitle>
              <StepBody>
                Generate your keypair and store it in the encrypted SQLite vault. Your keys never leave your device, setting
                the stage for verifiable, owner-controlled interactions.
              </StepBody>
            </StepItem>

            <StepItem>
              <StepNumber>Step 03</StepNumber>
              <StepTitle>Link Up Locally</StepTitle>
              <StepBody>
                Sync with nearby builders via Bluetooth or LAN. Share schemas, data, and prototypes directly—no central server,
                no surveillance dragnet.
              </StepBody>
            </StepItem>

            <StepItem>
              <StepNumber>Step 04</StepNumber>
              <StepTitle>Customize Your Territory</StepTitle>
              <StepBody>
                Remix the interface, craft your data models, and publish modules. YourLand is a canvas for local-first experiences—show us what your neighborhood needs.
              </StepBody>
            </StepItem>
          </StepList>

        </ContentSection>

        <Link href="/" passHref legacyBehavior>
          <BackLink>← Back to Home</BackLink>
        </Link>
      </PageContainer>
    </>
  );
}

