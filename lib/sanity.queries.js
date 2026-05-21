// Works list: all published works sorted by year desc
// Only fetches the first image (cover) — WorkList only needs one thumbnail
export const WORKS_QUERY = `*[_type == "work"] | order(year desc) {
  _id,
  "slug": coalesce(slug.current, _id),
  title,
  year,
  shortDescription,
  "coverImage": images[0] {
    _key,
    alt,
    asset,
    hotspot,
    crop
  }
}`

// Single work: match by slug OR _id (supports both URL formats)
export const WORK_QUERY = `*[_type == "work" && (slug.current == $id || _id == $id)][0] {
  _id,
  title,
  year,
  shortDescription,
  description,
  role,
  "images": images[] {
    _key,
    alt,
    asset,
    hotspot,
    crop
  }
}`

// All slugs (falling back to _id) for getStaticPaths
export const WORK_IDS_QUERY = `*[_type == "work"]{ "id": coalesce(slug.current, _id) }.id`
