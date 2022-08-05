import dynamic from 'next/dynamic'

const NewGalleryForm = dynamic(() => import('../components/NewGalleryForm'), {
  ssr: false,
})

export default function NewGallery() {
  return <NewGalleryForm />
}
