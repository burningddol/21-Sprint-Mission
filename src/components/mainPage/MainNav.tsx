import media from '../../utils/media';
import styled from 'styled-components';
import pandaTitle from '@/assets/panda_title.png';
import titleImg from '@/assets/onlyTitle.png';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const NavBox = styled.div`
  width: 100%;
  height: 70px;
  padding: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--white);
  ${media.nowTablet`
    padding: 0 24px;
  `}

  ${media.nowMobile`
    padding: 0 16px;
  `}
`;

const TitleLogo = styled.div`
  width: 153px;
  height: 51px;
  background-image: url(${pandaTitle});

  ${media.nowMobile`
  width: 103px;
    background-image: url(${titleImg});
  `}
`;

export default function MainNav() {
  return (
    <header>
      <NavBox>
        <TitleLogo />
        <Link to="/login">
          <Button
            width="128px"
            height="48px"
            $borderRadius="8px"
            fontSize="16px"
            fontWeight="400"
          >
            로그인
          </Button>
        </Link>
      </NavBox>
    </header>
  );
}
