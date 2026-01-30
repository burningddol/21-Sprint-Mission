import { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import styles from './FileInput.module.scss';
import placeHolderImage from '../../assets/place_holder_image.png';
import xIcon from '../../assets/ic_X.png';
import media from '../../utils/media';

interface FileInputProps {
  name?: string;
}

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  ${media.nowTablet`
  gap: 10px;
  `};
`;

const PreviewImg = styled.img`
  width: 282px;
  height: 282px;
  border: 1px solid var(--gray-50);
  border-radius: 12px;

  ${media.nowTablet`
  width: 168px;
  height: 168px;
  `};
`;

const PreviewBox = styled.div`
  position: relative;
`;

const IconX = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export default function FileInput({ name }: FileInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0] ?? null;
    setFile(nextFile);
  };

  const handleClear = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <>
      <label className={styles.imgLabel} htmlFor="imgInput">
        {' '}
        상품 이미지{' '}
      </label>
      <input
        id="imgInput"
        name={name}
        type="file"
        ref={inputRef}
        onChange={handleChange}
        hidden
      />
      <ImgBox>
        <img
          className={styles.add}
          src={placeHolderImage}
          onClick={handleClick}
        />
        {preview && (
          <PreviewBox>
            <PreviewImg src={preview} />
            <IconX src={xIcon} onClick={handleClear} />
          </PreviewBox>
        )}
      </ImgBox>
    </>
  );
}
