import DrawingCanvas from '@/components/Draw'
import Navbar from '@/components/Navbar'
import Upload from '@/components/Upload'

export default function Uploads() {
  return (
    <div>
      <Navbar />
      <Upload />
      <h6 className='text-center mx-auto pb-6 font-bold text-3xl'>OR</h6>
      <DrawingCanvas />
    </div>
  )
}
