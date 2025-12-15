import { useState } from "react";
import styled from "styled-components";
import styles from "./ContentsInput.module.scss";
import xIcon from '../assets/ic_X.png';

const Container = styled.div`
  margin-bottom: 110px;
`;

const StyledInput = styled.input`
  margin-top: 16px;
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 12px;
  background-color: var(--gray-100);
  font-family: "pretendard";
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-800);
  padding: 0 20px 0 20px;
`;

const Label = styled.label`
  display: block;
  font-family: "pretendard";
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-800);
  margin-top: 32px;
`
const TagsFlexBox = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 0 12px;
`;

const TagBox = styled.div`
  position: relative;
  height: 36px;
  padding: 11px 40px 11px 17px;
  background-color: var(--gray-100);
  border: none;
  border-radius: 26px;
  font-family: "pretendard";
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-800);
`;

const IconX = styled.img`
  position: absolute;
  top: 6px;
  right: 12px;
  cursor: pointer;
`;

export default function ContentsInput({tags, setTags, setProductName, setProductContent, setProductPrice}) {
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextTag = e.target.value.trim();
      const onlyJamo = /^[\u3131-\u318E\u1100-\u11FF]+$/;
      
      if (nextTag === "" || onlyJamo.test(nextTag)) {
        alert("태그는 최소 한 글자 이상, 의미 있는 문자열이어야 합니다.");
        return;
      }

      setTags((pre)=> [...pre, "#"+ nextTag]);
      e.target.value= "";
    }
  }
  
  const handleRemove = (index) => {
    const nextTags = [...tags];
    nextTags.splice(index,1);
    setTags(nextTags);
  };

  return(
    <Container>
      <Label htmlFor="name">상품명</Label>
      <StyledInput id="name"
                   name="name" 
                   type="text" 
                   onChange={(e)=> setProductName(e.target.value)} 
                   onKeyDown={handleKeyDown} 
                   placeholder="상품명을 입력해주세요"
                   />

      <Label htmlFor="intro">상품 소개</Label>
      <textarea id="intro"
                name="intro"
                className={styles.textArea}
                onChange={(e)=> setProductContent(e.target.value)}  
                placeholder="상품 소개를 입력해주세요"
                />

      <Label htmlFor="price">판매가격</Label>
      <StyledInput id="price" 
                   name="price" 
                   type="number" 
                   min={0} 
                   onChange={(e)=> setProductPrice(e.target.value)}
                   onKeyDown={handleKeyDown} 
                   placeholder="판매 가격을 입력해주세요"
                   />
    
      <Label htmlFor="tag">상품명</Label>
      <StyledInput id="tag" 
                   name="tag" 
                   type="text" 
                   onKeyDown={handleAddTag} 
                   placeholder="태그를 입력해주세요"
                   />

      {tags && <TagsFlexBox>
                  {tags.map((tag, index)=> <TagBox key={index}>
                      {tag}   
                      <IconX src={xIcon} onClick={() => handleRemove(index)}/> 
                    </TagBox>)}
                </TagsFlexBox>}
    </Container>
  );
}