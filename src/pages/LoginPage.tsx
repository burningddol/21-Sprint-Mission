import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
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
