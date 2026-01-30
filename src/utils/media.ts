import { css, RuleSet } from 'styled-components';

/* eslint-disable @typescript-eslint/no-explicit-any */
const media = {
  nowTablet: (strings: TemplateStringsArray, ...values: any[]): RuleSet =>
    css`
      @media (max-width: 1199px) {
        ${css(strings, ...values)}
      }
    `,
  nowMobile: (strings: TemplateStringsArray, ...values: any[]): RuleSet =>
    css`
      @media (max-width: 767px) {
        ${css(strings, ...values)}
      }
    `,
};

export default media;
