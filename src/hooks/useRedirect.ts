import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type State = 'logined' | 'etc';

export default function useRedirect(state: State = 'logined') {
  const navigate = useNavigate();

  useEffect(() => {
    if (state === 'logined') {
      const access = localStorage.getItem('accessToken');
      if (access) {
        navigate('/');
      }
    }
  }, []);
}
