import ArticleList from '@/components/main/ArticleList';
import MainBanner from '@/components/main/MainBanner';
import MainFooter from '@/components/main/MainFooter';
import MainNav from '@/components/main/MainNav';

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
