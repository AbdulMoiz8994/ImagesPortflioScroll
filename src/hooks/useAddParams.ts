import { useRouter } from 'next/router'
import React from 'react'

const useAddParams = () => {
  const router = useRouter();
  const { category, ...rest } = router.query;

  const removeParam = ({ title, value }) => {
    
    const isExist = router.query[title];
    console.log({ title, value, isExist })
    if (!isExist) return;

    if (Array.isArray(isExist)) {
      const params = isExist.filter(item => item !== value)
      router.push({
        query: {
          ...rest,
          [title]: params
        }
      }, "", { scroll: true, shallow: true })
    } else {
      const { category, ...rest2 } = router.query;
      delete rest2[title]

      console.log({ rest2 })
      router.replace({
        pathname: router.pathname,
        query: {
          category: router.query.category,
          ...rest2,
        }
      }, "", { scroll: true, shallow: true })
    }
    // console.log({ isExist });
  }

  const addNew = ({ title, values }) =>  {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [title]: values
      }
    },  "", { scroll: true, shallow: true })
  }

  const addParam = ({ title, value }) => {

    const isExist = router.query[title];
    if (!isExist) {
      router.push({
        query: {
          ...rest,
          [title]: value
        }
      }, "", { scroll: true, shallow: true })
    } else {
      let existingParam = router.query[title];
      let paramsInArray = []
      if (!Array.isArray(existingParam)) {
        paramsInArray = [existingParam]
      } else {
        paramsInArray = existingParam
      }

      console.log({ paramsInArray })
      
      router.push({
        query: {
          ...rest,
          [title]: [...value]
        }
      }, "", { scroll: true, shallow: true })
    }
  }

  return { addParam, removeParam, addNew }
}

export default useAddParams
