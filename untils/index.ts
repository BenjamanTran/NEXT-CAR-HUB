export async function fetchCars() {
  const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY
  const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST
  const URL_API = process.env.URL_API

  if (!X_RAPIDAPI_KEY || !X_RAPIDAPI_HOST || !URL_API) {
    throw new Error('Missing environment variables')
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': X_RAPIDAPI_HOST
    }
  }


  try {
    const response = await fetch(URL_API, options)
    const result = await response.json()

    return result
  } catch (error) {
    console.error(error)
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50
  const mileageFactor = 0.1
  const ageFactor = 0.05

  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
};

