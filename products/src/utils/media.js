import { css } from 'styled-components';

const media = {
  nowTablet: (...args) => css`
    @media (max-width: 1200x) {
      ${css(...args)}
    }
  `,
  nowMobile: (...args) => css`
    @media (max-width: 744px) {
      ${css(...args)}
    }
  `,
};

export default media;
