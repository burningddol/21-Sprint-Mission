import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Warn from '../components/common/Warn';

const Container = styled.div`
  width: 100%;
  max-width: 840px;
  margin: 80px auto;
`;

const Button = styled.button``;

function NotFoundPage() {
  return (
    <Container>
      <Warn
        variant="big"
        title="존재하지 않는 페이지에요."
        description="올바른 주소가 맞는지 다시 한 번 확인해 주세요."
      />
      <div>
        <Link to="/">
          <Button as="div">홈으로 가기</Button>
        </Link>
      </div>
    </Container>
  );
}

export default NotFoundPage;
