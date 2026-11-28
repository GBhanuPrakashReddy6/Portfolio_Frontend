// Talks to the Spring Boot backend (PortfolioBackend).
// In dev, Vite proxies /api to http://localhost:8080 (see vite.config.js).
// In production set VITE_API_URL to the backend's address, e.g. https://api.example.com
const API = `${import.meta.env.VITE_API_URL ?? ''}/api/recommendations`

// The backend creates an anonymous author id on the first submission.
// We keep it in the browser so this visitor can see their own pending recommendations.
const KEY = 'recommendationAuthorId'

function getAuthorId() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function saveAuthorId(id) {
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* private mode etc. - ignore */
  }
}

function headers(extra = {}) {
  const id = getAuthorId()
  return { ...extra, ...(id ? { 'X-Author-Id': id } : {}) }
}

export async function fetchRecommendations() {
  const res = await fetch(API, { headers: headers() })
  if (!res.ok) throw new Error(`Failed to load recommendations (${res.status})`)
  return res.json()
}

/** Returns the saved recommendation. Throws an Error with `.errors` (field -> message) on failure. */
export async function submitRecommendation(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(body.message || 'Something went wrong. Please try again.')
    err.errors = body.errors || {}
    throw err
  }
  saveAuthorId(body.authorId)
  return body.recommendation
}
