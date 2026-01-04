import { css } from 'styled-components';

const media = {
  nowTablet: (...args) => css`
    @media (max-width: 1199px) {
      ${css(...args)}
    }
  `,
  nowMobile: (...args) => css`
    @media (max-width: 767px) {
      ${css(...args)}
    }
  `,
};

export default media;
