import { useSearchParams } from 'react-router-dom';

export default function useSortParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderBy = searchParams.get('orderBy') || 'recent';

  const setOrderBy = (nextOption: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('orderBy', nextOption);
      return params;
    });
  };

  return { orderBy, setOrderBy };
}
