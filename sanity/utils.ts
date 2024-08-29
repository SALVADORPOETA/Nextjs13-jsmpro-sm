import qs from 'query-string'

interface BuildQueryParams {
  type: string
  query: string
  category: string
  page: number
  perPage?: number
}

export function buildQuery(params: BuildQueryParams) {
  const { type, query, category, page = 1, perPage = 20 } = params

  const conditions = [`*[_type=="${type}"`]

  if (query) conditions.push(`title match "*${query}*"`)

  if (category && category !== 'all') {
    conditions.push(`category == "${category}"`)
  }

  // Calculate pagination limits
  const offset = (page - 1) * perPage
  const limit = perPage

  return conditions.length > 1
    ? `${conditions[0]} && (${conditions
        .slice(1)
        .join(' && ')})][${offset}...${limit}]`
    : `${conditions[0]}][${offset}...${limit}]`
}

interface UrlQueryParams {
  params: string
  key?: string
  value?: string | null
  keysToRemove?: string[]
}

export function formUrlQuery({
  params,
  key,
  value,
  keysToRemove,
}: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove]
    })
  } else if (key && value !== undefined) {
    currentUrl[key] = value
  }

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  )
}

// import qs from 'query-string'

// interface BuildQueryParams {
//   type: string
//   query: string
//   category: string
//   page: number
//   perPage?: number
// }

// export function buildQuery(params: BuildQueryParams) {
//   const { type, query, category, page = 1, perPage = 20 } = params

//   const conditions = [`*[_type=="${type}"`]

//   if (query) conditions.push(`title match "*${query}*"`)

//   if (category && category !== 'all') {
//     conditions.push(`category == "${category}"`)
//   }

//   // Calculate pagination limits
//   const offset = (page - 1) * perPage
//   const limit = perPage

//   return conditions.length > 1
//     ? `${conditions[0]} && (${conditions
//         .slice(1)
//         .join(' && ')})][${offset}...${limit}]`
//     : `${conditions[0]}][${offset}...${limit}]`
// }

// interface UrlQueryParams {
//   params: string
//   key?: string
//   value?: string | null
//   keysToRemove?: string[]
// }

// export function formUrlQuery({
//   params,
//   key,
//   value,
//   keysToRemove = [],
// }: {
//   params: string
//   key?: string
//   value?: string
//   keysToRemove?: string[]
// }) {
//   // Parse the current query parameters
//   const currentUrl = qs.parse(params)

//   // Remove specified keys
//   keysToRemove.forEach((keyToRemove) => {
//     delete currentUrl[keyToRemove]
//   })

//   // Add or update the specified key-value pair
//   if (key && value !== undefined) {
//     currentUrl[key] = value
//   }

//   // Build and return the updated URL
//   return qs.stringifyUrl(
//     { url: window.location.pathname, query: currentUrl },
//     { skipNull: true }
//   )
// }
