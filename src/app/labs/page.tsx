import Image from 'next/image'

import { ContextComponent } from './context'
import { GenreComponent } from './genre'
import '@/styles/pages/labs.scss'

export default function LabsContainer() {
  // __STATE<React.Hooks>

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--labs-container p-8'>
      <div className='mb-8 grid gap-5'>
        <p className='italic'>.ui--labs-container</p>
      </div>

      <div className='mb-8 grid gap-1'>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
      </div>

      <div className='mb-8 grid gap-1'>
        <Image
          className='h-auto w-72 rounded-sm'
          alt='Uchi no Kaisha no Chiisai Senpai no Hanashi'
          src='/static/images/posters/003.jpg'
          quality={100}
          width={288}
          height={410.44}
          priority
        />

        <h2>Hoshikuzu Telepath</h2>
        <p className='text-lg font-medium'>โทรจิตละอองดาว</p>
        <p className='line-clamp-4 max-w-lg font-light text-gray-200'>
          อุมิกะ สาวมัธยมปลายที่พูดคุยกับคนอื่นยาก
          ชอบมโนว่าตนเหมือนเอเลี่ยนที่ติดอยู่บนโลกและฝันจะออกไปนอกโลกเพื่อหามนุษย์ต่างดาวเป็นเพื่อน จนกระทั่งเธอได้พบ ยู
          นักเรียนสาวร่าเริงที่เพิ่งย้าย และบอกว่าตนเป็นเอเลี่ยนที่กลับนอกโลกไม่ได้
          ทั้งสองจึงสร้างชมรมวิจัยจรวดขึ้นมาและได้รู้จักคนมากขึ้น
        </p>

        <GenreComponent />
      </div>

      <ContextComponent />
    </div>
  )
}
