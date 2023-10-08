import { ContextComponent } from './context'
import '@/styles/pages/labs.scss'

export default function LabsContainer() {
  // __STATE<React.Hooks>

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--labs-container p-8'>
      <div className='mb-6 grid gap-5'>
        <p className='italic'>.ui--labs-container</p>
      </div>

      <div className='mb-6 grid gap-2'>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>

        <p className='mt-10 text-xl font-medium'>รุ่นพี่ตัวน้อยดูท่าจะตกหลุมรัก</p>
        <p className='line-clamp-4 max-w-lg font-light text-gray-200'>
          โนซากิ ทาคุมะ พนักงานหนุ่มหน้าใหม่ประจำบริษัททำงานได้ไม่คล่องแคล่วเท่าไรนัก
          จนต้องให้สาวรุ่นพี่ตัวเล็กผู้ชื่นชอบแมวเป็นชีวิตจิตใจอย่างคาตาเสะ ชิโอริมาคอยดูแลอยู่เรื่อย
          ไหนจะมีหัวหน้าผู้ชอบเรื่องรักๆ ใคร่ๆ มาคอยเอาใจช่วยอยู่ห่างๆ อีก
          แล้วแบบนี้ความรักในรั้วบริษัทของพวกเขาจะผลิบานได้ไหมนะ?
        </p>
      </div>

      <ContextComponent />
    </div>
  )
}
