import { useField } from 'formik';
import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import closedEye from '@/assets/visibility.png';
import openedEye from '@/assets/visibility_on.png';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  forPassword?: boolean;
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px 0;
  font-family: 'pretendard';
  color: var(--gray-800);
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

interface InputProp {
  $onError: boolean;
}

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input<InputProp>`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 12px;
  background-color: var(--gray-100);
  font-size: 16px;
  font-weight: 400;
  padding: 0 25px;
  border: 1px solid transparent;
  &:focus {
    border-color: var(--blue-100);
    outline: none;
  }
  border-color: ${({ $onError }) => ($onError ? 'var(--red)' : 'transparent')};
`;

interface IsVisibleProp {
  $isOn: boolean;
}

const EyeButton = styled.button<IsVisibleProp>`
  width: 24px;
  height: 24px;
  background-image: url(${({ $isOn }) => ($isOn ? openedEye : closedEye)});
  border: none;
  position: absolute;
  top: 17px;
  right: 20px;
`;

const ErrorMsg = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: var(--red);
  padding-left: 15px;
`;
export default function CustomInput({
  forPassword = false,
  label,
  ...props
}: CustomInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [field, meta] = useField(props.name!);
  const hasError = meta.touched && !!meta.error;
  const passwordState: 'text' | 'password' = isVisible ? 'text' : 'password';

  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          {...field}
          {...props}
          type={forPassword ? passwordState : props.type}
          $onError={hasError}
        />
        {forPassword && (
          <EyeButton
            $isOn={isVisible}
            onClick={() => setIsVisible((prev) => !prev)}
            type="button"
          />
        )}
      </InputWrapper>
      {meta.touched && meta.error && <ErrorMsg>{meta.error}</ErrorMsg>}
    </Container>
  );
}
