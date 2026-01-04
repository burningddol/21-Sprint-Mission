import { Form, Formik, FormikHelpers } from 'formik';
import CustomInput from './CustomInput';
import { loginSchema } from '@/utils/authSchema';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { LoginFormValues } from '@/utils/authSchema';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    setIsLoading(true);
    alert(values.email + '\n' + values.password + '\n' + '개인정보 냠냠');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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
          <CustomInput
            label="이메일"
            name="email"
            type="email"
            placeholder="codeit@email.com"
            autoComplete="email"
          />

          <CustomInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            forPassword
          />

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
