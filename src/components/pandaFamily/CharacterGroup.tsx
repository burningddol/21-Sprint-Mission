import styled from 'styled-components';
import Character from './Character';
import type { CharacterRole, FocusTarget } from './Character';

const Container = styled.div`
  position: relative;
  width: 540px;
  height: 570px;
`;

const Shadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14px;
  border-radius: 50%;
  opacity: 0.4;
`;

const CharacterSlot = styled.div`
  position: absolute;
  bottom: 0;
`;

interface CharacterGroupProps {
  cursorX: number;
  cursorY: number;
  focusTarget: FocusTarget;
  isTyping: boolean;
}

interface CharacterConfig {
  role: CharacterRole;
  scale: number;
  heightRatio: number;
  accentColor: string;
  left: number;
  zIndex: number;
}

const CHARACTERS: CharacterConfig[] = [
  {
    role: 'shy',
    scale: 1.7,
    heightRatio: 1.7,
    accentColor: '#FFB8C6',
    left: 200,
    zIndex: 2,
  },
  {
    role: 'main',
    scale: 2.4,
    heightRatio: 1.7,
    accentColor: '#A8C8FF',
    left: 0,
    zIndex: 1,
  },
  {
    role: 'idle',
    scale: 1.7,
    heightRatio: 1,
    accentColor: '#e4f8de',
    left: 30,
    zIndex: 3,
  },
  {
    role: 'peeker',
    scale: 1.45,
    heightRatio: 1,
    accentColor: '#a2f788',
    left: 270,
    zIndex: 4,
  },
];

export default function CharacterGroup({
  cursorX,
  cursorY,
  focusTarget,
  isTyping,
}: CharacterGroupProps) {
  return (
    <Container>
      <Shadow
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at center, #b0b0b0 0%, transparent 70%)',
        }}
      />

      {CHARACTERS.map(
        ({ role, scale, heightRatio, accentColor, left, zIndex }) => (
          <CharacterSlot key={role} style={{ left, zIndex }}>
            <Character
              cursorX={cursorX}
              cursorY={cursorY}
              focusTarget={focusTarget}
              isTyping={isTyping}
              role={role}
              scale={scale}
              heightRatio={heightRatio}
              accentColor={accentColor}
            />
          </CharacterSlot>
        )
      )}
    </Container>
  );
}
