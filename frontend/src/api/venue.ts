import { IVenue } from '@/interfaces'
import request from './request'

const Venue = {
  getChatsByOwner: (query: string) =>
  request.get<IVenue[]>(`/autocomplete/query=${query}`),
}

export default Venue
