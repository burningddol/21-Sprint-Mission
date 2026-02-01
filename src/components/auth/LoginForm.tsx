import { Form, Formik, FormikHelpers } from 'formik';
import CustomInput from './CustomInput';
import { loginSchema } from '@/utils/authSchema';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { LoginFormValues } from '@/utils/authSchema';
import { LoginData, User } from '@/types/auth';
import { Link } from 'react-router-dom';
import { postLoginData } from '@/api/authApi';
import { useUser } from '../common/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../common/Toast';
import { FocusTarget } from '../pandaFamily/Character';
import SimpleLoginForm from './SimpleLoginForm';
import media from '@/utils/media';

interface LoginFormProps {
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
}

export interface CustomProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  forPassword?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: () => void;
  onKeyUp: () => void;
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

export default function LoginForm({
  onFocusChange,
  onTypingChange,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

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
  ];

  const onSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    setIsLoading(true);

    const loginData: LoginData = {
      email: values.email,
      password: values.password,
    };

    try {
      const data = await postLoginData(loginData);
      setUser(data.user);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    } catch (e) {
      console.log(e);
      showToast('로그인에 실패했습니다', 'error');
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <Formik<LoginFormValues>
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
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
            {isLoading ? '제출중...' : '로그인'}
          </Button>
          <SimpleLoginForm />

          <FooterText>
            판다마켓이 처음이신가요?{' '}
            <StyledLink to="/signup"> 회원가입</StyledLink>
          </FooterText>
        </StyledForm>
      )}
    </Formik>
  );
}
