import { useCallback, useMemo } from 'react'
import { useSelector } from '@/store'

export function useGenre() {
  // __STATE's
  const genres = useSelector(({ common }) => common.genres)

  // __FUNCTION's
  const getOne = useCallback(
    (id: number) => {
      return genres.find((genre) => genre.id === id)?.text || ''
    },
    [genres]
  )

  const getAll = useCallback(
    (...ids: number[]) => {
      return ids.map((id) => genres.find((genre) => genre.id === id)?.text || '')
    },
    [genres]
  )

  // __RENDER
  return useMemo(() => {
    return {
      list: genres,
      getOne,
      getAll
    }
  }, [genres, getOne, getAll])
}
