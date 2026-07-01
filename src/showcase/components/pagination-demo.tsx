import { useState } from 'react';
import { Pagination } from '../../components/pagination';

export interface PaginationDemoProps {
  surface: 'paper' | 'chalkboard';
}

export function PaginationDemo({ surface }: PaginationDemoProps) {
  const [page, setPage] = useState(4);

  return <Pagination page={page} totalPages={12} onPageChange={setPage} surface={surface} />;
}
