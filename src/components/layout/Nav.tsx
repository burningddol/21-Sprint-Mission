import { NavLink, Link } from 'react-router-dom';

import userIcon from '../../assets/user_icon.png';
import styled from 'styled-components';
import styles from './Nav.module.scss';
import media from '../../utils/media';
import pandaTitle from '@/assets/panda_title.png';
import titleImg from '@/assets/title_productPage.png';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 200px;
  height: 70px;
  border-bottom: 1px solid #dfdfdf;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.04);

  ${media.nowTablet`
  padding: 0 24px;
  `};

  ${media.nowMobile`
    padding: 0 16px;
    `}
`;

const TitleLogo = styled.div`
  width: 153px;
  height: 51px;
  background-image: url(${pandaTitle});
  margin-right: 40px;

  ${media.nowTablet`
    margin-right: 30px;
  `}

  ${media.nowMobile`
    width: 85px;
    margin-right: 0px;
    background-image: url(${titleImg});
    background-repeat: no-repeat;
    background-position: center;

  `}
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-600);
  border: none;

  margin-right: 20px;
  padding: 12px 10px;
  text-align: center;
  vertical-align: middle;

  &.active {
    color: var(--blue-100);
  }

  ${media.nowMobile`
    font-size: 16px;
    margin-right: 0;
    padding: 10px 8px;
    border-radius: 15px;
    `}
`;

export default function Nav() {
  return (
    <NavContainer>
      <div className={styles.left}>
        <Link to="/">
          <TitleLogo />
        </Link>
        <StyledNavLink to="/boards"> 자유게시판 </StyledNavLink>
        <StyledNavLink to="/products">중고마켓</StyledNavLink>
      </div>
      <img src={userIcon} alt="유저인터페이스 아이콘" />
    </NavContainer>
  );
}
