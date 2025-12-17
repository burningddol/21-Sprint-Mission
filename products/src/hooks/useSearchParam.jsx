import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams({
    currentPage: 1,
    search: '',
  });
  // Url 표현돼야하는 상태들 관리
  const initKeyword = searchParams.get('search');
  const [search, setSearch] = useState(initKeyword || '');

  // Url 표현돼야 하는 상태들 재선언 (searchParam 바뀔때)
  useEffect(() => {
    const keywordFromUrl = searchParams.get('search') || '';

    setSearch(keywordFromUrl);
  }, [searchParams]);

  return {
    searchParams,
    setSearchParams,
    search,
    setSearch,
  };
}
