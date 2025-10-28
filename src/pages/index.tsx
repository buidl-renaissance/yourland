import Head from "next/head";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: #00ff87;
  }
`;

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 255, 135, 0.15) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 4s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1000px;
`;

const Tagline = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #00ff87;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #00ff87 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Acronym = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 3rem;
  font-style: italic;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: #0a0a0a;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 255, 135, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 255, 135, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #ffffff;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ff87;
    color: #00ff87;
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #00ff87 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    border-color: #00ff87;
    box-shadow: 0 20px 40px rgba(0, 255, 135, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #00ff87;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 1.05rem;
`;

const GameShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GameCard = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 135, 0.1) 0%, rgba(96, 239, 255, 0.1) 100%);
  border: 2px solid rgba(0, 255, 135, 0.3);
  border-radius: 25px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    border-color: #00ff87;
    box-shadow: 0 25px 50px rgba(0, 255, 135, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00ff87 0%, #60efff 100%);
  }
`;

const GameTitle = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const GameBadge = styled.span`
  display: inline-block;
  background: rgba(0, 255, 135, 0.2);
  color: #00ff87;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const GameDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.1rem;
`;

const HighlightSection = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 135, 0.05) 0%, rgba(96, 239, 255, 0.05) 100%);
  border-radius: 30px;
  padding: 4rem;
  margin: 4rem 0;
  border: 1px solid rgba(0, 255, 135, 0.2);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;

const HighlightItem = styled.div`
  text-align: center;
`;

const HighlightNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const HighlightLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 600;
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.5);
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>YourLand - Your Local Area Network Decentralized</title>
        <meta name="description" content="Reclaim your digital territory. YourLand is a privacy-first, user-controlled social network and gaming platform built on local area network technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Nav>
          <Logo>yourland</Logo>
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#gaming">Gaming</NavLink>
            <NavLink href="#technology">Technology</NavLink>
          </NavLinks>
        </Nav>

        <Hero>
          <HeroContent>
            <Tagline>Reclaim Your Digital Territory</Tagline>
            <Title>Your Land.<br />Your Rules.</Title>
            <Acronym>Your Local Area Network Decentralized</Acronym>
            <Subtitle>
              A privacy-first social network and gaming platform where you truly own your data, 
              connections, and digital experiences. No surveillance. No extraction. Just pure ownership.
            </Subtitle>
            <CTAGroup>
              <PrimaryButton>Join the Waitlist</PrimaryButton>
              <SecondaryButton>Watch Demo</SecondaryButton>
            </CTAGroup>
          </HeroContent>
        </Hero>

        <Section id="features">
          <SectionTitle>Built for Ownership</SectionTitle>
          <SectionSubtitle>
            YourLand returns control to where it belongs—with you.
          </SectionSubtitle>
          
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>🏰</FeatureIcon>
              <FeatureTitle>Your Digital Territory</FeatureTitle>
              <FeatureDescription>
                Your land, your boundaries. Create a space that truly belongs to you, 
                with encrypted local storage and complete control over who enters.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔐</FeatureIcon>
              <FeatureTitle>Privacy by Design</FeatureTitle>
              <FeatureDescription>
                End-to-end encryption, offline-first architecture, and SQLite encryption 
                ensure your data stays yours. No corporate surveillance. Ever.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📡</FeatureIcon>
              <FeatureTitle>Local Area Network</FeatureTitle>
              <FeatureDescription>
                Connect with nearby friends via Bluetooth and local networks. 
                Build hyper-local communities without relying on centralized servers.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔑</FeatureIcon>
              <FeatureTitle>Key Management</FeatureTitle>
              <FeatureDescription>
                Your wallet, your keys. YourLand serves as a foundational key curation 
                mechanism for managing your digital identity and on-chain assets.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🗄️</FeatureIcon>
              <FeatureTitle>Your Own Database</FeatureTitle>
              <FeatureDescription>
                Every user gets their own encrypted SQLite database. Your digital archives, 
                memories, and content live on your device, not someone else's server.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔗</FeatureIcon>
              <FeatureTitle>On-Chain Ready</FeatureTitle>
              <FeatureDescription>
                Built-in blockchain mechanisms for true digital ownership. 
                Deep linking and cross-app functionality for a seamless web3 experience.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>

          <HighlightSection>
            <SectionTitle style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
              A New Social Paradigm
            </SectionTitle>
            <HighlightGrid>
              <HighlightItem>
                <HighlightNumber>∞</HighlightNumber>
                <HighlightLabel>Ownership Forever</HighlightLabel>
              </HighlightItem>
              <HighlightItem>
                <HighlightNumber>0</HighlightNumber>
                <HighlightLabel>Data Extraction</HighlightLabel>
              </HighlightItem>
              <HighlightItem>
                <HighlightNumber>100%</HighlightNumber>
                <HighlightLabel>Your Control</HighlightLabel>
              </HighlightItem>
            </HighlightGrid>
          </HighlightSection>
        </Section>

        <Section id="gaming">
          <SectionTitle>LAND Gaming</SectionTitle>
          <SectionSubtitle>
            Local Area Network Decentralized Gaming—where hyper-local multiplayer meets true ownership
          </SectionSubtitle>

          <GameShowcase>
            <GameCard>
              <GameTitle>🏝️ Mystic Island</GameTitle>
              <GameBadge>Launch Title</GameBadge>
              <GameDescription>
                Explore mysterious territories with friends nearby. A local-first adventure game 
                where proximity matters and your discoveries stay on your land. Trade artifacts, 
                solve puzzles, and build communities in a world that respects your privacy.
              </GameDescription>
            </GameCard>

            <GameCard>
              <GameTitle>🎮 Borderlands</GameTitle>
              <GameBadge>Launch Title</GameBadge>
              <GameDescription>
                Define your boundaries and defend your territory. A strategic multiplayer 
                experience built on local networks where every connection is intentional. 
                Form alliances, negotiate trades, and expand your influence—all on your terms.
              </GameDescription>
            </GameCard>
          </GameShowcase>

          <FeatureGrid style={{ marginTop: '4rem' }}>
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Hyper-Local Multiplayer</FeatureTitle>
              <FeatureDescription>
                Play with people actually near you. Bluetooth and LAN connectivity 
                create authentic local gaming experiences without the lag or surveillance.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>💎</FeatureIcon>
              <FeatureTitle>True Item Ownership</FeatureTitle>
              <FeatureDescription>
                Your in-game items, collectibles, and achievements are cryptographically 
                yours. Trade them, keep them, or take them to other LAND games.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🌐</FeatureIcon>
              <FeatureTitle>Cross-Game Assets</FeatureTitle>
              <FeatureDescription>
                Items and reputation earned in one LAND game can travel with you to others. 
                Your digital identity grows with every experience.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section id="technology">
          <SectionTitle>Built on Solid Ground</SectionTitle>
          <SectionSubtitle>
            Modern technology meets timeless principles: privacy, ownership, and user sovereignty
          </SectionSubtitle>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Offline-First Architecture</FeatureTitle>
              <FeatureDescription>
                Everything works without an internet connection. Your social graph, 
                games, and content are always accessible, even when you're off the grid.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>Encrypted Storage</FeatureTitle>
              <FeatureDescription>
                Your SQLite database is encrypted at rest. Even if someone gets physical 
                access to your device, your data remains secure.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔄</FeatureIcon>
              <FeatureTitle>Peer-to-Peer Sync</FeatureTitle>
              <FeatureDescription>
                Share updates directly with friends via local networks. No central server 
                means no single point of failure or surveillance.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🎨</FeatureIcon>
              <FeatureTitle>Deep Customization</FeatureTitle>
              <FeatureDescription>
                Remember MySpace? YourLand brings back that creative freedom. 
                Make your space truly yours with complete customization control.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔐</FeatureIcon>
              <FeatureTitle>Secure Communication</FeatureTitle>
              <FeatureDescription>
                End-to-end encrypted messaging and file sharing. Your conversations 
                are private by default, not by corporate policy.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🌟</FeatureIcon>
              <FeatureTitle>Open Protocol</FeatureTitle>
              <FeatureDescription>
                Built on open standards and blockchain technology. YourLand is a 
                foundation for an ecosystem of privacy-respecting apps.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section>
          <HighlightSection>
            <SectionTitle style={{ fontSize: '3rem' }}>
              Ready to Claim Your Land?
            </SectionTitle>
            <SectionSubtitle style={{ marginBottom: '2rem' }}>
              Join the movement to reclaim digital ownership. Your land awaits.
            </SectionSubtitle>
            <CTAGroup>
              <PrimaryButton>Get Early Access</PrimaryButton>
              <SecondaryButton>Read the Whitepaper</SecondaryButton>
            </CTAGroup>
          </HighlightSection>
        </Section>

        <Footer>
          <FooterLogo>yourland</FooterLogo>
          <FooterText>Your Local Area Network Decentralized</FooterText>
          <FooterText style={{ marginTop: '1rem' }}>
            © 2025 YourLand. Built for users, owned by users.
          </FooterText>
        </Footer>
      </Container>
    </>
  );
}
