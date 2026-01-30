import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from './UserProvider';
import useOutsideClick from '@/hooks/useOutsideClick';
import Button from './Button';

import userIcon from '../../assets/user_icon.png';

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

  &:hover {
    background-color: var(--gray-100);
  }
`;

export default function AuthSection() {
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
}
