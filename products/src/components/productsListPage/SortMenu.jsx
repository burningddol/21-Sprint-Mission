import { useState, useRef, useEffect } from 'react';
import styles from './SortMenu.module.scss';
import styled from 'styled-components';
import arrowIcon from '../../assets/arrow.png';
import useSortParam from '../../hooks/useSortParam';
import media from '../../utils/media';

const SortOptionItem = styled.li`
  width: 130px;
  height: 42px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-800);
  border: 0.1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-radius: ${({ $firstOption, $lastOption }) =>
    $firstOption ? '12px 12px 0 0' : $lastOption ? '0 0 12px 12px' : '0 0 0 0'};

  &:hover {
    color: var(--blue-100);
  }
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 15px;
  top: 22.5%;
  pointer-events: none;

  ${media.nowMobile`
    display: none;
    `}
`;

export default function SortMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { orderBy, setOrderBy } = useSortParam();
  const sortRef = useRef(null);
  const sortOptions = [
    {
      name: '최신순',
      value: 'recent',
    },

    {
      name: '좋아요순',
      value: 'favorite',
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (e) => {
      if (!sortRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.positionBox} ref={sortRef}>
      <div className={styles.positionBox}>
        <button
          className={`${styles.sortOptions} ${open ? styles.active : ''}`} // 버튼 오픈 시 그림자 삭제 css
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {sortOptions.map((option) => option.value == orderBy && option.name)}
        </button>
        <ArrowIcon src={arrowIcon} />
      </div>
      {isOpen && (
        <ul className={styles.sortUl}>
          {sortOptions.map((option, index) => (
            <SortOptionItem
              $firstOption={index == 0}
              $lastOption={index == sortOptions.length - 1}
              key={option.value}
              onClick={() => {
                setOrderBy(option.value);
                setIsOpen(false);
              }}
            >
              {option.name}
            </SortOptionItem>
          ))}
        </ul>
      )}
    </div>
  );
}
