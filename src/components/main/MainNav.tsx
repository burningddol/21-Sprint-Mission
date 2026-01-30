import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import pandaTitle from '@/assets/panda_title.png';
import titleImg from '@/assets/onlyTitle.png';
import userIcon from '../../assets/user_icon.png';
import media from '../../utils/media';
import Button from '../common/Button';
import { useUser } from '../common/UserProvider';
import useOutsideClick from '@/hooks/useOutsideClick';

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

const ProfileButton = styled.button`
  border: none;
  background-color: transparent;
  position: relative;
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

export default function MainNav() {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onClose = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);
  const dropdownRef = useOutsideClick(onClose, isDropdownOpen);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const renderAuthSection = () => {
    if (!user) {
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
    }

    if (user === 'isPending') return <span>로딩중...</span>;

    return (
      <ProfileButton onClick={toggleDropdown}>
        <img src={userIcon} alt="유저 프로필" />
        {isDropdownOpen && (
          <DropdownMenu onClick={handleLogout} ref={dropdownRef}>
            로그아웃
          </DropdownMenu>
        )}
      </ProfileButton>
    );
  };

  return (
    <header>
      <NavBox>
        <Link to="/">
          <TitleLogo />
        </Link>
        {renderAuthSection()}
      </NavBox>
    </header>
  );
}
