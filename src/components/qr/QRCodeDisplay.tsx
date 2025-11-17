import React from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';

const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const QRWrapper = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QRTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #00ff87;
  margin: 0;
  text-align: center;
`;

const QRSubtext = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 0;
`;

const CopyButton = styled.button`
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: #0a0a0a;
  padding: 0.75rem 2rem;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 255, 135, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 135, 0.4);
  }
`;

interface QRCodeDisplayProps {
  value: string;
  title?: string;
  subtext?: string;
  size?: number;
  showCopyButton?: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  title = 'Scan to Join',
  subtext,
  size = 200,
  showCopyButton = true,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const inviteUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/invite/${value}`
    : '';

  return (
    <QRContainer>
      {title && <QRTitle>{title}</QRTitle>}
      <QRWrapper>
        <QRCode
          value={inviteUrl || value}
          size={size}
          level="M"
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </QRWrapper>
      {subtext && <QRSubtext>{subtext}</QRSubtext>}
      {showCopyButton && (
        <CopyButton onClick={handleCopy}>
          📋 Copy Link
        </CopyButton>
      )}
    </QRContainer>
  );
};

