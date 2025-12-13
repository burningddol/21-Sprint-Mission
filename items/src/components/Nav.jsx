import { Link } from 'react-router-dom';
import pandaFace from '../assets/panda_face.png';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 200px;
` ;

export default function Nav() {

return(
  <NavContainer>
    <img src={pandaFace}/>
     <Link to="/boards"> 자유게시판 </Link> 
    중고마켓
  </NavContainer>
);

} 