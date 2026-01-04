import styled from 'styled-components';
import kakaoIcon from '@/assets/kakao.png';
import googleIcon from '@/assets/google.png';

const Container = styled.div`
  width: 100%;
  height: 74px;
  margin: 24px 0 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  background-color: var(--color-simple-lb);
  border-radius: 8px;
`;

const InfoText = styled.span`
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-800);
`;

const SNSBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 42px;
`;

export default function SimpleLoginForm() {
  return (
    <Container>
      <InfoText>간편 로그인하기</InfoText>
      <SNSBox>
        <img src={googleIcon} />
        <img src={kakaoIcon} />
      </SNSBox>
    </Container>
  );
}
