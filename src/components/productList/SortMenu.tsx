import { useState, useCallback } from 'react';
import styles from './SortMenu.module.scss';
import styled from 'styled-components';
import arrowIcon from '../../assets/arrow.png';
import useSortParam from '../../hooks/useSortParam';
import useOutsideClick from '../../hooks/useOutsideClick';
import media from '../../utils/media';

interface SortOption {
  name: string;
  value: string;
}

const SORT_OPTIONS: SortOption[] = [
  { name: '최신순', value: 'recent' },
  { name: '좋아요순', value: 'favorite' },
];

interface SortOptionItemProps {
  $firstOption?: boolean;
  $lastOption?: boolean;
}

const SortOptionItem = styled.li<SortOptionItemProps>`
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
    $firstOption ? '12px 12px 0 0' : $lastOption ? '0 0 12px 12px' : '0'};

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
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const sortRef = useOutsideClick(closeMenu, isOpen);

  const currentLabel = SORT_OPTIONS.find(
    (option) => option.value === orderBy
  )?.name;

  return (
    <div className={styles.positionBox} ref={sortRef}>
      <div className={styles.positionBox}>
        <button
          className={`${styles.sortOptions} ${isOpen ? styles.active : ''}`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {currentLabel}
        </button>
        <ArrowIcon src={arrowIcon} alt="정렬" />
      </div>
      {isOpen && (
        <ul className={styles.sortUl}>
          {SORT_OPTIONS.map((option, index) => (
            <SortOptionItem
              $firstOption={index === 0}
              $lastOption={index === SORT_OPTIONS.length - 1}
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
