import { Form, Formik, FormikHelpers } from 'formik';
import CustomInput from './CustomInput';
import { loginSchema } from '@/utils/authSchema';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { LoginFormValues } from '@/utils/authSchema';
import { LoginData, User } from '@/types/auth';
import { postLoginData } from '@/api/authApi';
import { useUser } from '../common/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../common/Toast';

const StyledForm = styled(Form)`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CUSTOM_PROPS: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  forPassword?: boolean;
}[] = [
  {
    label: '이메일',
    name: 'email',
    type: 'email',
    placeholder: 'codeit@email.com',
    autoComplete: 'email',
  },
  {
    label: '비밀번호',
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    autoComplete: 'new-password',
    forPassword: true,
  },
];

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const { showToast } = useToast();

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
          {CUSTOM_PROPS.map((props, index) => (
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
        </StyledForm>
      )}
    </Formik>
  );
}
