import { Form, Formik, FormikHelpers } from 'formik';
import CustomInput from './CustomInput';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { signUpSchema, SignUpFormValues } from '@/utils/authSchema';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CustomInputValues: {
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

  const onSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) => {
    setIsLoading(true);
    alert(
      values.email +
        '\n' +
        values.nickname +
        '\n' +
        values.password +
        '\n' +
        '개인정보 냠냠'
    );
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
          {CustomInputValues.map((value, index) => (
            <CustomInput key={index} {...value} />
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
