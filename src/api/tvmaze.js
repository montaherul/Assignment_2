const BASE_URL = 'https://api.tvmaze.com'

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`The request failed with status ${response.status}.`)
  }
  return response.json()
}

export function searchShows(term, signal) {
  const query = encodeURIComponent(term.trim())
  return fetchJson(`${BASE_URL}/search/shows?q=${query}`, signal).then((items) =>
    items.map((item) => item.show),
  )
}

export function getShowCatalog(signal) {
  return fetchJson(`${BASE_URL}/shows`, signal)
}