import styled from 'styled-components';
import bannerImg from '@/assets/banner_panda.png';
import bannerBottomImg from '@/assets/banner_panda_bottom.png';
import Button from '../common/Button';

const BannerBox = styled.div`
  width: 100%;
  height: 540px;
  background-color: var(--color-banner-bg);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: clamp(777px, 85vw, 1110px);
  height: clamp(238px, 25vw, 340px);
`;

const ContentsBoxBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: clamp(777px, 85vw, 1110px);
  height: clamp(238px, 30vw, 397px);
`;

const TextContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px 0;
  width: 100%;
`;

const TextBox = styled.span`
  width: 100%;
  max-width: 295px;
  font-family: 'pretendard';
  font-size: 40px;
  font-weight: 700;
  color: var(--gray-700);
  word-break: keep-all;
  line-height: 1.3;
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
`;

const ImgContent = styled.img`
  width: 100%;
  max-width: 746px;
  height: 100%;
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
                maxWidth="357px"
                height="56px"
                borderRadius="40px"
                fontSize="20px"
                color="var(--gray-50)"
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
        <BannerBox>
          <ContentsBoxBottom>
            <TextContents>
              <TextBoxBottom>믿을 수 있는 판다마켓 중고 거래</TextBoxBottom>
            </TextContents>
            <ImgContent src={bannerBottomImg} alt="판다 두마리 인사하는 그림" />
          </ContentsBoxBottom>
        </BannerBox>
      </main>
    );
}
