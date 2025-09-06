const BASE_URL = import.meta.env.VITE_DI_TEST_ENVIRONMENT as string
const API_KEY = import.meta.env.VITE_DI_API_KEY as string

async function request(endpoint: string, params: Record<string, unknown> = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`)
  url.searchParams.set('apiKey', API_KEY)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// Step 1 - Get Street Collections
export async function getStreetCollections(
  countryCode: string,
  streetName: string,
  optionals?: {
    city?: string
    location?: string
    limitToOfficial?: boolean
    limit?: number
  }
) {
  const streetQuery = optionals?.city ? `${streetName},${optionals.city}` : streetName

  return request(
    `${encodeURIComponent(countryCode)}/streetSearch/${encodeURIComponent(streetQuery)}`,
    {
      location: optionals?.location,
      limitToOfficial: optionals?.limitToOfficial,
      limit: optionals?.limit,
    }
  )
}

export async function getStreetNumbers() {}

export async function getFloors() {}

export async function getHouseholds() {}