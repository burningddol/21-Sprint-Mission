import { Form, Formik, FormikHelpers } from 'formik';
import CustomInput from './CustomInput';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { signUpSchema, SignUpFormValues } from '@/utils/authSchema';
import { SignUpData } from '@/types/auth';
import { postSignUpData } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../common/Toast';
import { FocusTarget } from '../pandaFamily/Character';
import { Link } from 'react-router-dom';
import { CustomProps } from './LoginForm';
import SimpleLoginForm from './SimpleLoginForm';
import media from '@/utils/media';

interface SignUpFormProps {
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
}

const StyledForm = styled(Form)`
  display: flex;
  width: 580px;
  flex-direction: column;
  ${media.nowTablet`
      width: 350px;
    `}
`;

const FooterText = styled.span`
  font-family: 'pretendard';
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-800);
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: var(--blue-100);
`;

export default function SignUpForm({
  onFocusChange,
  onTypingChange,
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { showToast } = useToast();

  const customProps: CustomProps[] = [
    {
      label: '이메일',
      name: 'email',
      type: 'email',
      placeholder: 'codeit@email.com',
      autoComplete: 'email',
      onFocus: () => onFocusChange('email'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
    {
      label: '닉네임',
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임을 입력해주세요',
      autoComplete: 'username',
      onFocus: () => onFocusChange('nickname'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
    {
      label: '비밀번호',
      name: 'password',
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
      autoComplete: 'new-password',
      forPassword: true,
      onFocus: () => onFocusChange('password'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
    {
      label: '비밀번호 확인',
      name: 'confirmPassword',
      type: 'confirmPassword',
      placeholder: '비밀번호를 다시 한 번 입력하세요',
      autoComplete: 'new-password',
      forPassword: true,
      onFocus: () => onFocusChange('password'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
  ];

  const onSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) => {
    setIsLoading(true);

    const signUpData: SignUpData = {
      email: values.email,
      nickname: values.nickname,
      password: values.password,
      passwordConfirmation: values.confirmPassword,
    };

    try {
      await postSignUpData(signUpData);
      showToast('회원가입에 성공했습니다', 'success');
      navigate('/login');
    } catch (e) {
      console.log(e);
      showToast('회원가입에 실패했습니다', 'error');
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <Formik<SignUpFormValues>
      initialValues={{
        email: '',
        nickname: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <StyledForm>
          {customProps.map((props, index) => (
            <CustomInput key={index} {...props} />
          ))}

          <Button
            width="100%"
            height="56px"
            $borderRadius="40px"
            fontSize="20px"
            fontWeight="400"
            disabled={isSubmitting || !isValid || !dirty}
            type="submit"
          >
            {isLoading ? '제출중...' : '회원가입'}
          </Button>
          <SimpleLoginForm />

          <FooterText>
            이미 회원이신가요??
            <StyledLink to="/login"> 로그인</StyledLink>
          </FooterText>
        </StyledForm>
      )}
    </Formik>
  );
}
