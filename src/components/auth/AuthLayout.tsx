import styled from 'styled-components';
import pandaLogo from '@/assets/panda_title_big.png';
import { Link } from 'react-router-dom';
import media from '@/utils/media';
import { ReactNode } from 'react';

const Header = styled.header`
  width: 396px;
  height: 132px;
  margin: 150px auto 40px auto;

  ${media.nowMobile`
    width: 198px;
    height: 66px;
    margin: 150px auto 24px auto;
  `}
`;

const StyledImg = styled.img`
  width: 396px;
  height: 132px;

  ${media.nowMobile`
    width: 198px;
    height: 66px;
  `};
`;

const Main = styled.main<{ $hasBottomMargin?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: ${({ $hasBottomMargin }) =>
    $hasBottomMargin ? '200px' : '0'};

  ${media.nowMobile`
    width: 343px;
  `};
`;

interface AuthLayoutProps {
  children: ReactNode;

  hasBottomMargin?: boolean;
}

export default function AuthLayout({
  children,

  hasBottomMargin = false,
}: AuthLayoutProps) {
  return (
    <>
      <Header>
        <Link to="/">
          <StyledImg src={pandaLogo} alt="판다얼굴로고" />
        </Link>
      </Header>
      <Main $hasBottomMargin={hasBottomMargin}>{children}</Main>
    </>
  );
}
