import React, { useState } from 'react';
import styled from 'styled-components';
import type { EphemeralAccount } from '@/lib/ephemeral/account';

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff87;
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: #0a0a0a;
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 255, 135, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 255, 135, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SocialButton = styled.button`
  background: transparent;
  color: #ffffff;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: #00ff87;
    color: #00ff87;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 12px;
  padding: 1rem;
  color: #ff6b6b;
  font-size: 0.95rem;
`;

interface AccountCreationProps {
  referrerId?: string;
  realm?: string;
  questType?: string;
  onAccountCreated: (account: EphemeralAccount) => void;
}

export const AccountCreation: React.FC<AccountCreationProps> = ({
  referrerId,
  realm,
  questType,
  onAccountCreated,
}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { createEphemeralAccount } = await import('@/lib/ephemeral/storage');
      const account = await createEphemeralAccount(
        displayName,
        email || undefined,
        referrerId,
        realm,
        questType
      );
      onAccountCreated(account);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setError(null);
    setIsLoading(true);

    try {
      // For MVP, we'll use email-based social login simulation
      // In production, integrate with actual OAuth providers
      const socialEmail = `${provider.toLowerCase()}@example.com`;
      const { createEphemeralAccount } = await import('@/lib/ephemeral/storage');
      const account = await createEphemeralAccount(
        displayName || `${provider} User`,
        socialEmail,
        referrerId,
        realm,
        questType
      );
      onAccountCreated(account);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            type="text"
            placeholder="Enter your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            disabled={isLoading}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading || !displayName}>
          {isLoading ? 'Creating...' : 'Create Account'}
        </SubmitButton>

        <Divider>or</Divider>

        <SocialButton
          type="button"
          onClick={() => handleSocialLogin('Google')}
          disabled={isLoading}
        >
          <span>🔵</span> Continue with Google
        </SocialButton>

        <SocialButton
          type="button"
          onClick={() => handleSocialLogin('Apple')}
          disabled={isLoading}
        >
          <span>⚫</span> Continue with Apple
        </SocialButton>
      </Form>
    </FormContainer>
  );
};

