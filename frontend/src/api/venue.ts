import { IVenueResponse } from '@/interfaces'
import request from './request'

const Venue = {
  getAutoComplete: (query: string) =>
    request.get<IVenueResponse>(`/venue/autocomplete?query=${query}`),
}

export default Venue
