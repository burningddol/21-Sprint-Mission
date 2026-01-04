import ArticleList from '@/components/mainPage/ArticleList';
import MainBanner from '@/components/mainPage/MainBanner';
import MainFooter from '@/components/mainPage/MainFooter';
import MainNav from '@/components/mainPage/MainNav';

export default function MainPage() {
  return (
    <>
      <MainNav />
      <MainBanner top />
      <ArticleList />
      <MainBanner bottom />
      <MainFooter />
    </>
  );
}
