import Pagination2 from 'components/Pagination2';
import { useCategoryPage } from 'contexts/categoryPage/use-category';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connectPagination } from 'react-instantsearch-dom';

const Pagination = ({ currentRefinement, nbPages, refine, itemsPerPage, createURL }: any) => {
  const router = useRouter();
  const { onChangeNoOfPages } = useCategoryPage();

  useEffect(() => {
    refine(router.query?.page || 1)
  }, [router])

  useEffect(() => {
    onChangeNoOfPages(nbPages);
  }, [nbPages])

  if (nbPages === 1) return null;

  return (
    <Pagination2 
      currentPage={currentRefinement}
      perPage={itemsPerPage}
      noOfPages={nbPages}
      onPageChange={(nextPage) => {
        Router.push({
          pathname: Router.pathname,
          query: {
            ...Router.query,
            page: nextPage
          }
        }, "", { shallow: true });

        window.scroll({ top: 0, behavior: 'smooth' })

        refine(nextPage)
      }}
    />
  )
}

export const CustomPagination = connectPagination(Pagination);