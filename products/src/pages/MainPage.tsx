import ArticleList from '@/components/mainPage/ArticleList';
import MainBanner from '@/components/mainPage/MainBanner';
import MainNav from '@/components/mainPage/MainNav';

export default function MainPage() {
  return (
    <>
      <MainNav />
      <MainBanner top />
      <ArticleList />
      <MainBanner bottom />
    </>
  );
}
