import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import styles from "./FileInput.module.scss";
import placeHolderImage from '../assets/place_holder_image.png';
import xIcon from '../assets/ic_X.png';

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
  gap: 10px;
  };

`;

const PreviewImg = styled.img`
  width: 282px;
  height: 282px;
  border: 1px solid var(--gray-50);
  border-radius: 12px;

  @media (max-width: 1200px) {
  width: 168px;
  height: 168px;

  };
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


export default function FileInput({name}) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  
  const inputRef = useRef();

  const handleClick = () => {
    if(inputRef.current) inputRef.current.click()
  };

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    console.log( e.target.files);
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

  return(
    <>
      <label className={styles.imgLabel} htmlFor="imgInput"> 상품 이미지 </label>
      <input id="imgInput"
            name={name} 
            type="file"
            ref={inputRef} 
            onChange={handleChange} 
            hidden  />
      <ImgBox>    
        <img className={styles.add} src={placeHolderImage} onClick={handleClick}/>
        {preview && (
          <PreviewBox>
            <PreviewImg src={preview}/>
            <IconX src={xIcon} onClick={handleClear}/>
          </PreviewBox>
        )}
      </ImgBox>  
    </>
  );
}