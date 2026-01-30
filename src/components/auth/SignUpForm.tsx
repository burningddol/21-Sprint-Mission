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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    label: '닉네임',
    name: 'nickname',
    type: 'text',
    placeholder: '닉네임을 입력해주세요',
    autoComplete: 'username',
  },
  {
    label: '비밀번호',
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    autoComplete: 'new-password',
    forPassword: true,
  },
  {
    label: '비밀번호 확인',
    name: 'confirmPassword',
    type: 'confirmPassword',
    placeholder: '비밀번호를 다시 한 번 입력하세요',
    autoComplete: 'new-password',
    forPassword: true,
  },
];

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { showToast } = useToast();

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
            {isLoading ? '제출중...' : '회원가입'}
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
}
