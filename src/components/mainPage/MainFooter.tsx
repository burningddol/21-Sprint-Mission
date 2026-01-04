import styled from 'styled-components';
import { Link } from 'react-router-dom';
import faceBookIcon from '@/assets/facebook.png';
import twitterIcon from '@/assets/twitter.png';
import youtubeIcon from '@/assets/youtube.png';
import instagramIcon from '@/assets/instagram.png';
import media from '@/utils/media';

const Footer = styled.footer`
  width: 100%;
  height: 160px;
  background-color: var(--gray-900);
`;

const ContentsBox = styled.div`
  width: 1120px;
  height: 20px;
  margin: 0 auto;
  position: relative;
  top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;

  ${media.nowTablet`
    width: 536px;
  `}

  ${media.nowMobile`
    width: 311px;
  `}
`;

const FirmInfo = styled.span`
  color: var(--gray-400);

  ${media.nowMobile`
    position: absolute;
    top:80px;

  `}
`;

const FooterMenu = styled.span`
  width: 160px;
  height: 100%;
  display: flex;
  gap: 0 29px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--gray-200);
`;

const SNSButtons = styled.div`
  width: 116px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface SNSImgProp {
  $SNSImg: string;
}

const SNSButton = styled.a<SNSImgProp>`
  width: 20px;
  height: 20px;
  background-image: url(${({ $SNSImg }) => $SNSImg});
`;
export default function MainFooter() {
  return (
    <Footer>
      <ContentsBox>
        <FirmInfo>©codeit - 2024</FirmInfo>

        <FooterMenu>
          <StyledLink to="/privacy">Privacy Policy</StyledLink>
          <StyledLink to="/faq">FAQ</StyledLink>
        </FooterMenu>

        <SNSButtons>
          <SNSButton href="https://www.facebook.com/" $SNSImg={faceBookIcon} />
          <SNSButton href="https://x.com/" $SNSImg={twitterIcon} />
          <SNSButton href="https://www.youtube.com/" $SNSImg={youtubeIcon} />
          <SNSButton
            href="https://www.instagram.com/"
            $SNSImg={instagramIcon}
          />
        </SNSButtons>
      </ContentsBox>
    </Footer>
  );
}
