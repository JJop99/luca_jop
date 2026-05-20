// Works list: all published works sorted by year desc
export const WORKS_QUERY = `*[_type == "work"] | order(year desc) {
  _id,
  title,
  year,
  shortDescription,
  "images": images[] {
    _key,
    alt,
    asset,
    hotspot,
    crop
  }
}`

// Single work detail
export const WORK_QUERY = `*[_type == "work" && _id == $id][0] {
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

// All work IDs for getStaticPaths
export const WORK_IDS_QUERY = `*[_type == "work"]._id`
