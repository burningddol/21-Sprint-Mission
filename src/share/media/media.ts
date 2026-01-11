import { css } from "styled-components";

type MediaFn = (...args: Parameters<typeof css>) => ReturnType<typeof css>;

interface Media {
  nowTablet: MediaFn;
}

const media: Media = {
  nowTablet: (...args) => css`
    @media (max-width: 1299px) {
      ${css(...args)}
    }
  `,
};

export default media;
