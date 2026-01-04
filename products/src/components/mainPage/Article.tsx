import styled from 'styled-components';
import media from '@/utils/media';

interface ReverseProp {
  $reverse: boolean;
}

const ArticleCard = styled.article<ReverseProp>`
  width: 988px;
  height: 444px;
  margin: auto auto;
  background-color: var(--color-section-bg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;

  ${media.nowTablet`
    width: 696px;
    height: 708px;
    flex-direction: ${({ $reverse }) => ($reverse ? 'column-reverse' : 'column')};
    justify-content: space-between;
    align-items: flex-start;
  `}

  ${media.nowMobile`
    width: 344px;
    height: 417px;

  `}
`;

const ArticleImg = styled.img`
  width: 100%;
  max-width: 579px;
  height: 100%;

  ${media.nowTablet`
    max-width: none;
    width: 696px;
    height: 524px;
    border-radius: 10px;
  `}

  ${media.nowMobile`
    width: 344px;
    height: 259px;
    
  `}
`;

const ArticleTextBox = styled.div<ReverseProp>`
  width: 293px;
  height: 238px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ $reverse }) => ($reverse ? 'flex-end' : 'flex-start')};

  ${media.nowTablet`
    width: 100%;
    height: 160px;
  `}

  ${media.nowMobile`
    
    height: 134px;
  `}
`;

const ArticleTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--blue-100);

  ${media.nowMobile`
    
    font-size: 16px;
  `}
`;

const ArticleContent = styled.span<ReverseProp>`
  width: 293px;

  font-size: 40px;
  font-weight: 700;
  color: var(--gray-700);
  line-height: 1.4;
  word-break: keep-all;
  text-align: ${({ $reverse }) => ($reverse ? 'right' : 'left')};

  ${media.nowTablet`
   
    width:100%;
    font-size: 32px;
  `}

  ${media.nowMobile`
    
    font-size: 24px;
  `}
`;

const ArticleSubContent = styled.span<ReverseProp>`
  width: 298px;
  font-size: 24px;
  font-weight: 400;
  color: var(--gray-700);
  line-height: 1.4;
  text-align: ${({ $reverse }) => ($reverse ? 'right' : 'left')};

  ${media.nowTablet`
    width: 216px;
    font-size: 18px;
  `}
`;

interface ArticleInfo {
  articleImg: string;
  imgAlt: string;
  articleTitle: string;
  articleContent: string;
  articleSubContent: string;
}

interface ArticleProps {
  articleInfo: ArticleInfo;
  reverse?: boolean;
}
export default function Article({
  articleInfo,
  reverse = false,
}: ArticleProps) {
  return (
    <ArticleCard $reverse={reverse}>
      {!reverse && (
        <ArticleImg src={articleInfo.articleImg} alt={articleInfo.imgAlt} />
      )}

      <ArticleTextBox $reverse={reverse}>
        <ArticleTitle>{articleInfo.articleTitle}</ArticleTitle>

        <ArticleContent $reverse={reverse}>
          {articleInfo.articleContent}
        </ArticleContent>

        <ArticleSubContent $reverse={reverse}>
          {articleInfo.articleSubContent}
        </ArticleSubContent>
      </ArticleTextBox>

      {reverse && (
        <ArticleImg src={articleInfo.articleImg} alt={articleInfo.imgAlt} />
      )}
    </ArticleCard>
  );
}
