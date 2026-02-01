import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { FocusTarget } from '@/components/pandaFamily/Character';
import CharacterGroup from '@/components/pandaFamily/CharacterGroup';
import { useCursorTracking } from '@/components/pandaFamily/libs/useCursorTracking';
import useRedirect from '@/hooks/useRedirect';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import media from '@/utils/media';

const CharacterContainer = styled.div`
  gap: 55px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;

  ${media.nowTablet`
     gap: 0;
     position: relative;
     left:-85px;
  `}
`;

const CharactersView = styled.div`
  display: block;
  position: relative;
  bottom: 80px;

  ${media.nowTablet`
     transform: scale(0.78);
     bottom: 40px;
     left:70px;
  `}

  ${media.nowMobile`
    display: none; 
  `}
`;

export default function LoginPage() {
  const [focusTarget, setFocusTarget] = useState<FocusTarget>('none');
  const [isTyping, setIsTyping] = useState(false);
  const { cursor, ref: charGroupRef } = useCursorTracking();

  useRedirect('logined');

  const handleFocusChange = useCallback((target: FocusTarget) => {
    setFocusTarget(target);
    if (target === 'none') setIsTyping(false);
  }, []);

  return (
    <AuthLayout>
      <CharacterContainer>
        <CharactersView ref={charGroupRef}>
          <CharacterGroup
            cursorX={cursor.x}
            cursorY={cursor.y}
            focusTarget={focusTarget}
            isTyping={isTyping}
          />
        </CharactersView>

        <LoginForm
          onFocusChange={handleFocusChange}
          onTypingChange={setIsTyping}
        />
      </CharacterContainer>
    </AuthLayout>
  );
}
