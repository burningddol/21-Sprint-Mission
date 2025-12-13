import { Link, NavLink} from 'react-router-dom';
import pandaFace from '../assets/panda_face.png';
import userIcon from '../assets/user_icon.png';
import styled from 'styled-components';
import styles from './Nav.module.scss';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 200px;
  height: 70px;
  border-bottom: 1px solid #dfdfdf;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.04);
` ;

const LogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 153px;
  height: 51px;
  margin-right: 40px;
`
const PandaImg = styled.img`
  margin-right: 3px;
`;

const LogoText = styled.span`
  font-family: "ROKAFSans";
  font-size: 25.63px;
  font-weight: 700;
  color: var(--blue-100);
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: "pretendard";
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-600);
  border: none;
  border-radius: 20px;
  margin-right: 20px;
  padding: 12px 10px;
  &.active {
    background: linear-gradient(to right, #1e6fff, #3692ff);
    color: var(--gray-50);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;
export default function Nav() {

return(
  <NavContainer>
    <div className={styles.left}>
      <LogoBox>
        <PandaImg src={pandaFace} alt="판다마켓 로고 판다얼굴"/>
        <LogoText>판다마켓</LogoText>
      </LogoBox>
      <StyledNavLink to="/boards" > 자유게시판 </StyledNavLink> 
      <StyledNavLink to="/" > 중고마켓 </StyledNavLink>
    </div>
    <img src={userIcon} alt="유저인터페이스 아이콘"/>
  </NavContainer>
);

} 