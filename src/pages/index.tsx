import parseCookie from "@/share/utils/parseCookie";
import LoginForm from "@/widgets/login-form";
import { GetServerSidePropsContext } from "next";

interface Props {
  apiId: string;
  name: string;
}

export default function Home({ apiId, name }: Props) {
  return <LoginForm apiId={apiId} name={name} />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie || "";

  const apiId = parseCookie("apiId", cookie);
  const name = parseCookie("name", cookie);

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
