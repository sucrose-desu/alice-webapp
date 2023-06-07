import type { GetServerSidePropsContext as Context, GetServerSidePropsResult as Result } from 'next'

interface Props {}

export default function WatchContainer({}: Props) {
  // __STATE <React.Hooks>

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--watch-container'>
      <i>.ui--watch</i>
    </div>
  )
}

export async function getServerSideProps({ query }: Context): Promise<Result<Props>> {
  // const vid = query.vid instanceof Array ? query.vid[0] : query.vid

  return {
    props: {}
  }
}
