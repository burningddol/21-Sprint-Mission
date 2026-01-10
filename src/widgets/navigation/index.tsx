import styled from "styled-components";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <Header>
      <Container>
        <Link href="/">
          <Image src={logo} alt="로고" priority />
        </Link>
      </Container>
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--slate-200);
`;

const Container = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
