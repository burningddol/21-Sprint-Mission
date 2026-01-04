import styled from 'styled-components';
import pandaLogo from '@/assets/panda_title_big.png';
import LoginForm from '@/components/authPage/LoginForm';
import SimpleLoginForm from '@/components/authPage/SimpleLoginForm';
import { Link } from 'react-router-dom';

const Header = styled.header`
  width: 396px;
  height: 132px;
  margin: 150px auto 40px auto;
`;

const Main = styled.main`
  width: 640px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const StyledSpan = styled.span`
  font-family: 'pretendard';
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-800);
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: var(--blue-100);
`;

export default function LoginPage() {
  return (
    <>
      <Header>
        <img src={pandaLogo} alt="판다얼굴로고" />
      </Header>
      <Main>
        <LoginForm />
        <SimpleLoginForm />
        <StyledSpan>
          판다마켓이 처음이신가요?{' '}
          <StyledLink to="/signup">회원가입</StyledLink>
        </StyledSpan>
      </Main>
    </>
  );
}
