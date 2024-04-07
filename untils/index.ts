import { manufacturers } from "@/constants"
import { CarProps, FilterProps } from "@/types"
import { resourceUsage } from "process"

export async function fetchCars(filters: FilterProps) {
  const X_RAPIDAPI_KEY = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY
  const X_RAPIDAPI_HOST = process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST
  const { manufacturer, model, year, fuel, limit } = filters

  const URL_API = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`
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

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const { make, model, year } = car
  const url = new URL('https://cdn.imagin.studio/getimage')
  url.searchParams.append('customer', process.env.IMGAIN_API_KEY || 'hrjavascript-mastery')
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value)

  return `${window.location.pathname}?${searchParams.toString()}`
}
