import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
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
