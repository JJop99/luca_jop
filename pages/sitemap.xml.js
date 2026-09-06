import { client } from '../lib/sanity.client'
import { WORK_IDS_QUERY } from '../lib/sanity.queries'
import { SITE_URL } from '../components/SEO/Seo'

const STATIC_PATHS = [
  { path: '/', priority: '1.0' },
  { path: '/works', priority: '0.9' },
  { path: '/about', priority: '0.7' },
  { path: '/contacts', priority: '0.7' },
]

function buildSitemap(workIds, lastmod) {
  const urls = [
    ...STATIC_PATHS.map(({ path, priority }) => ({ loc: `${SITE_URL}${path}`, priority })),
    ...workIds.map((id) => ({ loc: `${SITE_URL}/${encodeURIComponent(id)}`, priority: '0.8' })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  let workIds = []
  try {
    workIds = (await client.fetch(WORK_IDS_QUERY)) || []
  } catch (e) {
    workIds = []
  }

  const xml = buildSitemap(workIds, new Date().toISOString().split('T')[0])

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
