import styled from 'styled-components';
import bannerImg from '@/assets/banner_panda.png';
import bannerBottomImg from '@/assets/banner_panda_bottom.png';
import Button from '../common/Button';
import media from '@/utils/media';

const BannerBox = styled.div`
  width: 100%;
  height: 540px;
  background-color: var(--color-banner-bg);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${media.nowTablet`
    height: 771px;
   
  `}

  ${media.nowMobile`
    height: 540px;
   
  `}
`;

const BannerBoxBottom = styled.div`
  width: 100%;
  height: 540px;
  background-color: var(--color-banner-bg);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${media.nowTablet`
    height: 927px;
   
  `}

  ${media.nowMobile`
    height: 540px;
   
  `}
`;

const ContentsBox = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  width: clamp(777px, 85vw, 1110px);
  height: clamp(238px, 25vw, 340px);

  ${media.nowTablet`
     flex-direction: column;
     height: 687px;
  `}
  ${media.nowMobile`
    height: 492px;
   
  `}
`;

const ContentsBoxBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: clamp(777px, 85vw, 1110px);
  height: clamp(238px, 30vw, 397px);

  ${media.nowTablet`
     flex-direction: column;
     height: 726px;
  `}

  ${media.nowMobile`
    height: 419px;
   
  `}
`;

const TextContents = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 33px 0;
  width: 100%;

  ${media.nowTablet`
    align-items: center;
  `}

  ${media.nowMobile`
    gap: 23px 0;
  `}
`;

const TextBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 295px;
  font-family: 'pretendard';
  font-size: 40px;
  font-weight: 700;
  color: var(--gray-700);
  word-break: keep-all;
  line-height: 1.3;

  ${media.nowTablet`
    max-width: none;
  `}

  ${media.nowMobile`
    font-size: 32px;
    max-width: 295px;
    text-align: center;
  `}
`;

const TextBoxBottom = styled.span`
  width: 100%;
  max-width: 295px;
  font-family: 'pretendard';
  font-size: 40px;
  font-weight: 700;
  color: var(--gray-700);
  word-break: keep-all;
  line-height: 1.3;
  padding-bottom: 70px;

  ${media.nowTablet`
    text-align: center;
  `}

  ${media.nowMobile`
  max-width: 265px;
    font-size: 32px;
  `}
`;

const ImgContent = styled.img`
  width: 100%;
  max-width: 746px;
  height: 100%;

  ${media.nowTablet`
     width: 744px;
     height: 340px;
  `}

  ${media.nowMobile`
     width: auto;
     height: 204px;
     
  `}
`;

const ImgContentBottom = styled.img`
  width: 100%;
  max-width: 746px;
  height: 100%;

  ${media.nowTablet`
     width: 744px;
     height: 397px;
  `}

  ${media.nowMobile`
     width: 375px;
     height: 198px;
     
  `}
`;

interface location {
  top?: boolean;
  bottom?: boolean;
}

export default function MainBanner({ top = false, bottom = false }: location) {
  //상단배너
  if (top)
    return (
      <main>
        <BannerBox>
          <ContentsBox>
            <TextContents>
              <TextBox>일상의 모든 물건을 거래해 보세요</TextBox>
              <Button
                width="100%"
                $maxWidth="357px"
                height="56px"
                $borderRadius="40px"
                fontSize="20px"
                color="var(--gray-50)"
                $mobileWidth="240px"
                $mobileHeight="48px"
                $mobileFontSize="18px"
              >
                구경하러 가기
              </Button>
            </TextContents>
            <ImgContent src={bannerImg} alt="판다가 인사하는 그림" />
          </ContentsBox>
        </BannerBox>
      </main>
    );

  //하단배너
  if (bottom)
    return (
      <main>
        <BannerBoxBottom>
          <ContentsBoxBottom>
            <TextContents>
              <TextBoxBottom>믿을 수 있는 판다마켓 중고 거래</TextBoxBottom>
            </TextContents>
            <ImgContentBottom
              src={bannerBottomImg}
              alt="판다 두마리 인사하는 그림"
            />
          </ContentsBoxBottom>
        </BannerBoxBottom>
      </main>
    );
}
