import dynamic from 'next/dynamic'
import config from '../../sanity.config'

// Disable SSR — the Studio uses browser APIs not available on the server
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
