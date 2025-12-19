import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import kebabIc from '../assets/kebab.png';

const KebabBox = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;
const Button = styled.button`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  border: none;
  background: url(${kebabIc}) center / 24px 24px no-repeat;
`;
const KebabOptionItem = styled.li`
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
    $firstOption ? '12px 12px 0 0' : $lastOption ? '0 0 12px 12px' : '0 0 0 0'};
  border-bottom: ${({ $firstOption }) => $firstOption && 'none'};
  border-top: ${({ $lastOption }) => $lastOption && 'none'};
`;

const KebabUl = styled.ul`
  position: absolute;
  background-color: #ffffff;
  border-radius: 12px;
  top: 35px;
  right: 0;
`;

export default function KebabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const kebabRef = useRef(null);
  const kebabOptions = [
    {
      name: '수정하기',
      value: 'ammed',
    },

    {
      name: '삭제하기',
      value: 'delete',
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (e) => {
      if (!kebabRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  const handleClick = (value) => {
    alert(`과연 ${value}권한이 있을까요? \n다시 생각해보도록`);
  };

  return (
    <KebabBox ref={kebabRef}>
      <Button onClick={() => setIsOpen((pre) => !pre)} />

      {isOpen && (
        <KebabUl>
          {kebabOptions.map((option, index) => (
            <KebabOptionItem
              $firstOption={index == 0}
              $lastOption={index == kebabOptions.length - 1}
              key={option.value}
              onClick={() => {
                handleClick(option.name);
                setIsOpen(false);
              }}
            >
              {option.name}
            </KebabOptionItem>
          ))}
        </KebabUl>
      )}
    </KebabBox>
  );
}
