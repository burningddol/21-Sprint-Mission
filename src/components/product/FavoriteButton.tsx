import styled, { keyframes } from 'styled-components';
import media from '../../utils/media';

interface FavoriteButtonProps {
  count: number;
}

const pushPop = keyframes`
   0% { transform: scale(0.8); }
  50% { transform: scale(0.65); }
  100% { transform: scale(0.8); }
`;

const pop = keyframes`
   0% { transform: scale(0.2); }
  100% { transform: scale(1); }
`;

const clickPop = keyframes`
   0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const HeartIcon = styled.svg`
  width: 32px;
  height: 32px;

  ${media.nowTablet`
    width: 27px;
    height: 27px;
  `};
  path {
    fill: none;
    stroke: #6b7280;
    stroke-width: 1.8;
  }
`;

const Button = styled.button`
  width: 87px;
  height: 40px;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 5px;
  font-family: 'pretendar';
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-500);
  & ${HeartIcon} {
    animation: ${pushPop} 0.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  &:hover {
    border: 1px solid var(--gray-400);
  }

  &:hover ${HeartIcon} {
    animation: ${pop} 0.5s ease forwards;
    path {
      fill: var(--red);
      stroke: var(--red);
    }
  }
  &:active ${HeartIcon} {
    animation: ${clickPop} 0.5s ease forwards;
  }

  ${media.nowTablet`
    width: 79px;
    height: 32px;
     gap: 0 2px;
  `};
`;

const HEART_PATH =
  'M21.1997 4.90039C25.1051 4.90039 28.2452 7.9009 28.5464 11.7812L28.5669 12.1602V12.4004C28.5668 14.5632 27.7277 16.4503 26.3247 17.7363L26.0327 18.0039V18.0986C26.0187 18.1104 26.0043 18.1225 25.9897 18.1348C25.7818 18.3101 25.4997 18.5534 25.1636 18.8457C24.4902 19.4313 23.5881 20.2253 22.605 21.0918C20.6408 22.8229 18.3528 24.8449 16.8901 26.1084C16.4239 26.4969 15.7079 26.4969 15.2417 26.1084C13.7764 24.8428 11.4525 22.817 9.4751 21.0889C8.48386 20.2226 7.5804 19.4314 6.9165 18.8486C6.58461 18.5573 6.31311 18.3184 6.12061 18.1484C6.11365 18.1423 6.10677 18.1358 6.1001 18.1299V18.0273L5.83643 17.7637C4.39581 16.3231 3.567 14.4151 3.56689 12.4004V12.1426C3.69507 8.23997 7.02258 5.03324 10.9331 5.0332C11.5505 5.0332 12.3382 5.24524 13.1069 5.65918C13.849 6.05883 14.5073 6.61335 14.9438 7.24316C15.4233 8.26862 16.9006 8.25157 17.3462 7.19141C17.7132 6.53143 18.3555 5.95411 19.105 5.53613C19.873 5.10782 20.6559 4.90042 21.1997 4.90039Z';

export default function FavoriteButton({ count }: FavoriteButtonProps) {
  return (
    <Button>
      <HeartIcon viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d={HEART_PATH} />
      </HeartIcon>
      {count}
    </Button>
  );
}
