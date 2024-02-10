'use client'

import { useGenre } from '@/hooks'

export function GenreComponent() {
  // __STATE<React.Hooks>
  const genres = useGenre()

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <ul className='-mb-2 block'>
      {genres.getAll(3, 34, 38, 46).map((genre, index) => (
        <li className='mb-2 mr-2 inline-block rounded-md bg-rose-900/10 px-2 py-1' key={index}>
          <span className='text-xs font-medium capitalize italic text-rose-500'>{genre}</span>
        </li>
      ))}
    </ul>
  )
}
