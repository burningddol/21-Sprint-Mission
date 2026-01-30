import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import useRedirect from '@/hooks/useRedirect';

export default function LoginPage() {
  useRedirect('logined');

  return (
    <AuthLayout
      linkTo="/signup"
      linkLabel="회원가입"
      footerText="판다마켓이 처음이신가요?"
    >
      <LoginForm />
    </AuthLayout>
  );
}
