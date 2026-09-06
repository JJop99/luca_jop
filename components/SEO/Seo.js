import Head from 'next/head'
import { useRouter } from 'next/router'

export const SITE_URL = 'https://lucajop.it'
export const SITE_NAME = 'Luca Jop — Architetto'

const DEFAULT_TITLE = 'Luca Jop — Architetto'
const DEFAULT_DESCRIPTION =
  'Studio di architettura di Luca Jop. Residenze, edifici pubblici e riqualificazione energetica.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

/**
 * Single source of truth for per-page metadata.
 * Renders title, description, canonical, Open Graph and Twitter tags,
 * plus optional JSON-LD structured data.
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = null,
}) {
  const { asPath } = useRouter()
  const path = (asPath || '/').split('?')[0].split('#')[0]
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  const fullTitle = title ? `${title} — Luca Jop` : DEFAULT_TITLE

  const head = (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

    </Head>
  )

  if (!jsonLd) return head

  // The JSON-LD block lives outside <Head>: next/head re-emits script tags on
  // hydration, so inside the head it ended up in the DOM twice. Structured data
  // is equally valid in the body.
  return (
    <>
      {head}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
