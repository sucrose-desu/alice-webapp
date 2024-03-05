import Link from 'next/link'

export default function NotFound() {
  // __RENDER
  return (
    <div className='p-8 text-center'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className='p-2 underline' href='/'>
        Return Home
      </Link>
    </div>
  )
}
