import dynamic from 'next/dynamic'

const GalleryList = dynamic(() => import('components/GalleryList'), {
  ssr: false,
})

export default function Galleries() {
  return <GalleryList />
}
