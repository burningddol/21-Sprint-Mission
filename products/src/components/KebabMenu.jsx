import styled from 'styled-components';
import kebabIc from '../assets/kebab.png';

const Button = styled.button`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  border: none;
  background: url(${kebabIc}) center / 24px 24px no-repeat;

  position: absolute;
  top: 0px;
  right: 0px;
`;

export default function KebabMenu() {
  return <Button />;
}
