import MainBanner from '@/components/mainPage/MainBanner';
import MainNav from '@/components/mainPage/MainNav';

export default function MainPage() {
  return (
    <>
      <MainNav />
      <MainBanner top />
      <MainBanner bottom />
    </>
  );
}
