import LoginForm from "@/widgets/login-form";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie || "";

  const parseCookie = (key: string) => {
    return cookie
      .split("; ")
      .find((v) => v.startsWith(key + "="))
      ?.split("=")[1];
  };

  const apiId = parseCookie("apiId");
  const name = parseCookie("name");

  if (!apiId) {
    return {
      props: {
        apiId: null,
        name: null,
      },
    };
  }

  const decodedApiId = decodeURIComponent(apiId);
  const decodedName = name ? decodeURIComponent(name) : null;

  return {
    props: {
      apiId: decodedApiId,
      name: decodedName,
    },
  };
}

interface Props {
  apiId: string;
  name: string;
}

export default function Home({ apiId, name }: Props) {
  return <LoginForm apiId={apiId} name={name} />;
}
