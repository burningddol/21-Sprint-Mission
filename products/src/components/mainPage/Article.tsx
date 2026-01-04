import styled from 'styled-components';

const ArticleCard = styled.article`
  width: 988px;
  height: 444px;
  margin: auto auto;
  background-color: var(--color-section-bg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
`;

const ArticleImg = styled.img`
  width: 100%;
  max-width: 579px;
  height: 100%;
`;
interface ReverseProp {
  $reverse: boolean;
}

const ArticleTextBox = styled.div<ReverseProp>`
  width: 298px;
  height: 238px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ $reverse }) => ($reverse ? 'flex-end' : 'flex-start')};
`;

const ArticleTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--blue-100);
`;

const ArticleContent = styled.span<ReverseProp>`
  width: 293px;
  height: 112px;
  font-size: 40px;
  font-weight: 700;
  color: var(--gray-700);
  line-height: 1.4;
  word-break: keep-all;
  text-align: ${({ $reverse }) => ($reverse ? 'right' : 'left')};
`;

const ArticleSubContent = styled.span<ReverseProp>`
  font-size: 24px;
  font-weight: 400;
  color: var(--gray-700);
  line-height: 1.4;
  text-align: ${({ $reverse }) => ($reverse ? 'right' : 'left')};
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
    <ArticleCard>
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
