import { GetServerSidePropsContext as Context, GetServerSidePropsResult as Result } from 'next'
import axios from '@/utils/axios'

export async function fetchTrack({ query }: Context): Promise<Result<any>> {
  const vid = query.vid instanceof Array ? query.vid[0] : query.vid
  let data

  if (vid) {
    try {
      const response = await axios.get(`/playback/${vid}`)
      if (response.data) {
        data = response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    props: { data }
  }
}
