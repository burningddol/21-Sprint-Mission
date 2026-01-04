import styled from 'styled-components';
import hotItem from '@/assets/hot_item.png';
import searchItem from '@/assets/search_item.png';
import registerItem from '@/assets/register_item.png';
import Article from './Article';

const List = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 2160px;
  font-family: 'pretendard';
`;

export default function ArticleList() {
  const articleInfo: {
    articleImg: string;
    imgAlt: string;
    articleTitle: string;
    articleContent: string;
    articleSubContent: string;
  }[] = [
    {
      articleImg: hotItem,
      imgAlt: '판다 두마리가 옷구경하는 그림',
      articleTitle: 'Hot item',
      articleContent: '인기 상품을 확인해 보세요',
      articleSubContent:
        '가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요',
    },
    {
      articleImg: searchItem,
      imgAlt: '돋보기 그림',
      articleTitle: 'Search',
      articleContent: '구매를 원하는 상품을 검색하세요',
      articleSubContent: '구매하고 싶은 물품은 검색해서 쉽게 찾아보세요',
    },
    {
      articleImg: registerItem,
      imgAlt: '상품 고르는 그림',
      articleTitle: 'Register',
      articleContent: '판매를 원하는 상품을 등록하세요',
      articleSubContent: '어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요',
    },
  ];

  return (
    <List>
      <Article articleInfo={articleInfo[0]} />
      <Article articleInfo={articleInfo[1]} reverse />
      <Article articleInfo={articleInfo[2]} />
    </List>
  );
}
