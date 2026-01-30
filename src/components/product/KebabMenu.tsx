import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useState, useCallback } from 'react';
import kebabIc from '../../assets/kebab.png';
import useOutsideClick from '../../hooks/useOutsideClick';

interface KebabMenuProps {
  setIsEditOpen?: Dispatch<SetStateAction<boolean>>;
}

interface KebabOption {
  name: string;
  value: string;
}

const KEBAB_OPTIONS: KebabOption[] = [
  { name: '수정하기', value: 'edit' },
  { name: '삭제하기', value: 'delete' },
];

const KebabBox = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const ToggleButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  border: none;
  background: url(${kebabIc}) center / 24px 24px no-repeat;
`;

interface KebabOptionItemProps {
  $firstOption?: boolean;
  $lastOption?: boolean;
}

const KebabOptionItem = styled.li<KebabOptionItemProps>`
  width: 139px;
  height: 41px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-800);
  border: 0.1px solid var(--gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-radius: ${({ $firstOption, $lastOption }) =>
    $firstOption ? '12px 12px 0 0' : $lastOption ? '0 0 12px 12px' : '0'};
  border-bottom: ${({ $firstOption }) => $firstOption && 'none'};
  border-top: ${({ $lastOption }) => $lastOption && 'none'};

  &:hover {
    color: var(--blue-100);
  }
`;

const KebabUl = styled.ul`
  position: absolute;
  background-color: #ffffff;
  border-radius: 12px;
  top: 35px;
  right: 0;
`;

export default function KebabMenu({ setIsEditOpen }: KebabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const kebabRef = useOutsideClick(closeMenu, isOpen);

  const handleOptionClick = (value: string) => {
    setIsOpen(false);

    if (value === 'delete') {
      alert('과연 삭제하기권한이 있을까요?');
    } else if (value === 'edit') {
      setIsEditOpen?.(true);
    }
  };

  return (
    <KebabBox ref={kebabRef}>
      <ToggleButton onClick={() => setIsOpen((prev) => !prev)} />

      {isOpen && (
        <KebabUl>
          {KEBAB_OPTIONS.map((option, index) => (
            <KebabOptionItem
              $firstOption={index === 0}
              $lastOption={index === KEBAB_OPTIONS.length - 1}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.name}
            </KebabOptionItem>
          ))}
        </KebabUl>
      )}
    </KebabBox>
  );
}
