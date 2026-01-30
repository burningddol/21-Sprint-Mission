import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';
import useRedirect from '@/hooks/useRedirect';

export default function SignUpPage() {
  useRedirect('logined');

  return (
    <AuthLayout
      linkTo="/login"
      linkLabel="로그인"
      footerText="이미 회원이신가요?"
      hasBottomMargin
    >
      <SignUpForm />
    </AuthLayout>
  );
}
