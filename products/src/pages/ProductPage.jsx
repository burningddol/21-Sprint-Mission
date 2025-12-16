import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../utils/getProductsApi";
import ProductInfoBox from "../components/ProductInfoBox";
import LoadingSpinner from "../components/LoadingSpinner";


export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function loadProduct(){
      try{
        const product = await getProductById(productId);
        setProduct(product);
      }catch(e){
        console.log(e+"에러");
        navigate('*');
      }
    }
    loadProduct();
  },[]);
  
   if (!product) return <LoadingSpinner message="상품 정보를 불러오는 중..." />;

  return(
    <>
    <ProductInfoBox product={product}/>
    </>
  );
}