import { useState, useEffect } from 'react';
import styled from 'styled-components';
import emptyCommentsImg from '../../assets/for_empty.png';

const Img = styled.img`
  margin-bottom: 48px;
  width: 196px;
  height: 230px;
  margin: 0 auto;
`;
export default function EmptyCommentsImg() {
  const [isShowImg, setShowImg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImg(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return isShowImg ? <Img src={emptyCommentsImg} /> : null;
}
