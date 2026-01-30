import { useSearchParams } from 'react-router-dom';

export default function usePaginationParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const setCurrentPage = (nextPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(nextPage));
      return params;
    });
  };

  return { currentPage, setCurrentPage };
}
