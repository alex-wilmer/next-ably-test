import dynamic from 'next/dynamic'

const GallerySlug = dynamic(() => import('components/GallerySlug'), {
  ssr: false,
})

export default function GID() {
  return <GallerySlug />
}
