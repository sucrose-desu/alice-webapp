import Link from 'next/link'

export default function NotFound() {
  // __RENDER
  return (
    <div className='text-center p-8'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>Return Home</Link>
    </div>
  )
}
