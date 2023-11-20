import { IVenue } from '@/interfaces'
import request from './request'

const Venue = {
  getAutoComplete: (query: string) =>
    request.get<IVenue[]>(`/autocomplete/query=${query}`),
}

export default Venue
