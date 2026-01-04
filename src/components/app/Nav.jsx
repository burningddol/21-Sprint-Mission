import { NavLink, useLocation } from 'react-router-dom';
import pandaFace from '../../assets/panda_face.png';
import userIcon from '../../assets/user_icon.png';
import styled from 'styled-components';
import styles from './Nav.module.scss';
import media from '../../utils/media';

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

const LogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 153px;
  height: 51px;
  margin-right: 40px;

  ${media.nowMobile`
    margin-right: 0;
    width: 82px;
    `}
`;
const PandaImg = styled.img`
  margin-right: 3px;
  ${media.nowMobile`
    display: none;
    `}
`;

const LogoText = styled.span`
  font-family: 'ROKAFSans';
  font-size: 25.63px;
  font-weight: 700;
  color: var(--blue-100);

  ${media.nowMobile`
    font-size: 20.2px;
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

  ${(props) =>
    props['data-force-active'] &&
    `
    
    color: var(--blue-100);
    
  `}

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
  const location = useLocation();

  const isActive =
    location.pathname === '/addproduct' || /^\/\d+$/.test(location.pathname);

  return (
    <NavContainer>
      <div className={styles.left}>
        <LogoBox>
          <PandaImg src={pandaFace} alt="판다마켓 로고 판다얼굴" />
          <LogoText>판다마켓</LogoText>
        </LogoBox>
        <StyledNavLink to="/boards"> 자유게시판 </StyledNavLink>
        <StyledNavLink
          to="/"
          data-force-active={isActive} //특정 주소에서 active시키는 커스텀 class
        >
          중고마켓
        </StyledNavLink>
      </div>
      <img src={userIcon} alt="유저인터페이스 아이콘" />
    </NavContainer>
  );
}
