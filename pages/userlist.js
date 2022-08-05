import dynamic from 'next/dynamic'

const Userlist = dynamic(() => import('../components/Userlist'), {
  ssr: false,
})

export default function UserlistPage() {
  return <Userlist />
}
