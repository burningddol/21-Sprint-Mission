import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';
import { FocusTarget } from '@/components/pandaFamily/Character';
import CharacterGroup from '@/components/pandaFamily/CharacterGroup';
import { useCursorTracking } from '@/components/pandaFamily/libs/useCursorTracking';
import useRedirect from '@/hooks/useRedirect';
import media from '@/utils/media';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

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
  transform: scale(1.15);
  ${media.nowTablet`
     transform: scaleX(0.78) scaleY(0.88);
     bottom: 40px;
     left:70px;
  `}

  ${media.nowMobile`
    display: none; 
  `}
`;

export default function SignUpPage() {
  const [focusTarget, setFocusTarget] = useState<FocusTarget>('none');
  const [isTyping, setIsTyping] = useState(false);
  const { cursor, ref: charGroupRef } = useCursorTracking();

  useRedirect('logined');

  const handleFocusChange = useCallback((target: FocusTarget) => {
    setFocusTarget(target);
    if (target === 'none') setIsTyping(false);
  }, []);

  return (
    <AuthLayout hasBottomMargin>
      <CharacterContainer>
        <CharactersView ref={charGroupRef}>
          <CharacterGroup
            cursorX={cursor.x}
            cursorY={cursor.y}
            focusTarget={focusTarget}
            isTyping={isTyping}
          />
        </CharactersView>
        <SignUpForm
          onFocusChange={handleFocusChange}
          onTypingChange={setIsTyping}
        />
      </CharacterContainer>
    </AuthLayout>
  );
}
