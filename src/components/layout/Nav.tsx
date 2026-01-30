import { useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '../common/UserProvider';
import useOutsideClick from '@/hooks/useOutsideClick';
import Button from '../common/Button';

import pandaTitle from '@/assets/panda_title.png';
import titleImg from '@/assets/title_productPage.png';
import userIcon from '../../assets/user_icon.png';
import media from '../../utils/media';
import styles from './Nav.module.scss';

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
  `}

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
    margin-right: 0;
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
  margin-right: 20px;
  padding: 12px 10px;
  text-align: center;

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

const ProfileButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 45px;
  width: 139px;
  height: 51px;
  background-color: var(--white);
  border-radius: 8px;
  border: 1px solid var(--gray-300);
  font-family: 'pretendard';
  font-weight: 400;
  font-size: 16px;
  color: var(--gray-500);
  align-content: center;
  cursor: pointer;
`;

export default function Nav() {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const dropdownRef = useOutsideClick(closeDropdown, isDropdownOpen);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const renderAuthArea = () => {
    if (user === 'isPending') {
      return <span>로딩중...</span>;
    }

    if (user) {
      return (
        <ProfileButton onClick={() => setIsDropdownOpen((prev) => !prev)}>
          <img src={userIcon} alt="유저 아이콘" />
          {isDropdownOpen && (
            <DropdownMenu onClick={handleLogout} ref={dropdownRef}>
              로그아웃
            </DropdownMenu>
          )}
        </ProfileButton>
      );
    }

    return (
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
    );
  };

  return (
    <NavContainer>
      <div className={styles.left}>
        <Link to="/">
          <TitleLogo />
        </Link>
        <StyledNavLink to="/boards">자유게시판</StyledNavLink>
        <StyledNavLink to="/products">중고마켓</StyledNavLink>
      </div>
      {renderAuthArea()}
    </NavContainer>
  );
}
