import Head from "next/head";
import styled from "styled-components";

const positioningFramework = [
  {
    concept: "YourLand",
    description:
      "The individual's personal or collective domain - a digital/physical ecosystem representing their values, work, and expression.",
  },
  {
    concept: "The Network",
    description:
      "The protocol layer and shared space connecting all lands, enabling communication, collaboration, and discovery.",
  },
  {
    concept: "Exploration",
    description:
      "The experience of discovering new lands, connecting with creators, and exchanging knowledge or resources.",
  },
  {
    concept: "Terrain Themes",
    description:
      "The \"feel\" of your land - from raw and natural to luxurious and refined. Visual theming reflects individuality (earth tones, grids, patterns, textures).",
  },
  {
    concept: "Proximity",
    description:
      "Connection through closeness - Bluetooth, local-first, or shared context. The nearer you are, the deeper the potential for real connection.",
  },
];

const corePhilosophy = [
  "YourLand is an invitation to define how you interact with the world.",
  "It is not a platform - it is a landscape for self-expression, collaboration, and creation.",
  "Each person has their own land, a space to build, shape, and share their vision.",
  "YourLand.Network connects these worlds together - it is where explorers, builders, and dreamers discover one another's lands, share resources, and grow together.",
];

const networkActions = [
  {
    title: "Discover",
    description:
      "Explore the network and find other lands that align with your interests or values.",
  },
  {
    title: "Connect",
    description: "Form meaningful, peer-to-peer relationships.",
  },
  {
    title: "Collaborate",
    description: "Exchange ideas, resources, and creations across lands.",
  },
  {
    title: "Evolve",
    description: "Refine your land over time - it grows as you do.",
  },
];

const tonePrinciples = [
  {
    title: "Inviting",
    description: "\"Come build your world.\"",
  },
  {
    title: "Empowering",
    description: "\"It is your land, your choice.\"",
  },
  {
    title: "Grounded",
    description: "\"Rooted in shared reality, growing together.\"",
  },
  {
    title: "Exploratory",
    description: "\"A network you navigate like terrain.\"",
  },
];

const nextSteps = [
  {
    title: "Landing Page Draft",
    subtitle: "Bring the invitation to life on the homepage.",
    items: [
      "Hero headline: \"Your Land. Your World.\"",
      "Subtext: \"A network of builders defining their own interactions with the world.\"",
      "Primary call-to-action: Explore the Network (links to early examples or prototype lands).",
    ],
  },
  {
    title: "Network Map (Concept Visual)",
    items: [
      "Dynamic map: each node represents a land.",
      "Interaction: Clicking a node opens that world - a creator's domain or project.",
    ],
  },
  {
    title: "Manifesto Page",
    items: ["Core statement: ownership, connection, creativity, freedom."],
  },
  {
    title: "Onboarding Flow (Later)",
    items: [
      "Define your land: select terrain, tone, and focus.",
      "Connect to others: discover nearby or interest-aligned lands.",
    ],
  },
];

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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/grid-background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.15;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 255, 135, 0.15) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 4s ease-in-out infinite;
    z-index: 0;
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

const SectionInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ParagraphGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.75rem;
`;

const ParagraphCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1.75rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.78);
`;

const Quote = styled.blockquote`
  margin: 0 auto;
  padding: 2rem;
  max-width: 820px;
  border-left: 4px solid #00ff87;
  background: rgba(0, 255, 135, 0.08);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  font-weight: 600;
  font-style: italic;
`;

const FrameworkTable = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FrameworkRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  align-items: start;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.75rem 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FrameworkConcept = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff87;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FrameworkDescription = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
`;

const ContentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const ContentListItem = styled.li`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 1.5rem 1.75rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.7;

  strong {
    display: block;
    font-size: 1.05rem;
    color: #ffffff;
    margin-bottom: 0.5rem;
    letter-spacing: 0.5px;
  }
`;

const ContentHeading = styled.h3`
  font-size: 1.55rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
`;

const Subheading = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const NextStepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const NextStepCard = styled.div`
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(0, 255, 135, 0.15);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
`;

const CardBulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardBulletItem = styled.li`
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;

  strong {
    color: #00ff87;
  font-weight: 600;
  }
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
        <title>YourLand.Network &mdash; Your Land. Your World.</title>
        <meta
          name="description"
          content="YourLand.Network invites builders, explorers, and creators to design their own worlds, connect with others, and grow together across a landscape of shared values."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Nav>
          <Logo>yourland</Logo>
          <NavLinks>
            <NavLink href="#philosophy">Philosophy</NavLink>
            <NavLink href="#framework">Framework</NavLink>
            <NavLink href="#next-steps">Next Steps</NavLink>
          </NavLinks>
        </Nav>

        <Hero>
          <HeroContent>
            <Tagline>Invitation to Build</Tagline>
            <Title>Your Land.<br />Your World.</Title>
            <Subtitle>
              A network of builders defining their own interactions with the world. Shape your land,
              connect through the network, and grow alongside fellow explorers, makers, and dreamers.
            </Subtitle>
            <CTAGroup>
              <PrimaryButton as="a" href="#next-steps">Explore the Network</PrimaryButton>
              <SecondaryButton as="a" href="#philosophy">Read the Manifesto</SecondaryButton>
            </CTAGroup>
          </HeroContent>
        </Hero>

        <Section id="philosophy">
          <SectionTitle>🌍 Core Philosophy</SectionTitle>
          <SectionInner>
            <ParagraphGrid>
              {corePhilosophy.map((statement) => (
                <ParagraphCard key={statement}>{statement}</ParagraphCard>
              ))}
            </ParagraphGrid>
            <Quote>&ldquo;Your Land to build upon. Our network to build together.&rdquo;</Quote>
          </SectionInner>
        </Section>

        <Section id="framework">
          <SectionTitle>🧭 Positioning Framework</SectionTitle>
          <SectionSubtitle>
            A shared language for how lands relate to the network and to one another.
          </SectionSubtitle>
          <SectionInner>
            <FrameworkTable>
              {positioningFramework.map((item) => (
                <FrameworkRow key={item.concept}>
                  <FrameworkConcept>{item.concept}</FrameworkConcept>
                  <FrameworkDescription>{item.description}</FrameworkDescription>
                </FrameworkRow>
              ))}
            </FrameworkTable>
          </SectionInner>
        </Section>

        <Section id="enables">
          <SectionTitle>🧩 What YourLand.Network Enables</SectionTitle>
          <SectionInner>
            <ContentList>
              {networkActions.map((action) => (
                <ContentListItem key={action.title}>
                  <strong>{`${action.title} \u2192`}</strong>
                  {action.description}
                </ContentListItem>
              ))}
            </ContentList>
          </SectionInner>
        </Section>

        <Section id="tone">
          <SectionTitle>🪞 Philosophical Tone</SectionTitle>
          <SectionSubtitle>
            How the network should feel whenever someone encounters YourLand.
          </SectionSubtitle>
          <SectionInner>
            <ContentList>
              {tonePrinciples.map((principle) => (
                <ContentListItem key={principle.title}>
                  <strong>{principle.title}</strong>
                  {principle.description}
                </ContentListItem>
              ))}
            </ContentList>
          </SectionInner>
        </Section>

        <Section id="next-steps">
          <SectionTitle>🏗️ Next Steps</SectionTitle>
          <SectionInner>
            <NextStepsGrid>
              {nextSteps.map((card) => (
                <NextStepCard key={card.title}>
                  <div>
                    <ContentHeading>{card.title}</ContentHeading>
                    {card.subtitle && <Subheading>{card.subtitle}</Subheading>}
                  </div>
                  <CardBulletList>
                    {card.items.map((item) => {
                      const [lead, ...rest] = item.split(":");
                      const detail = rest.join(":").trim();
                      const hasDetail = rest.length > 0 && detail.length > 0;

                      return (
                        <CardBulletItem key={item}>
                          {hasDetail ? (
                            <>
                              <strong>{`${lead.trim()}:`}</strong> {detail}
                            </>
                          ) : (
                            item
                          )}
                        </CardBulletItem>
                      );
                    })}
                  </CardBulletList>
                </NextStepCard>
              ))}
            </NextStepsGrid>
          </SectionInner>
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
