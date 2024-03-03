import { styled } from '../stitches.config.js';

const Info = styled('div', {
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  padding: '20px',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '50%',
  minWidth: '300px',
  backgroundImage: 'linear-gradient(135deg, #6e8efb, #a777e3)',
  color: '#ffffff',
});

export function WalletInfo() {
  return (
    <Info>
      <p>Wallet Info</p>
    </Info>
  )
}