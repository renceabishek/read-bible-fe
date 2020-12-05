import { ApiError } from './ApiError'

export class ApiErrorResponse {
    status: number
    url: String
    error: ApiError
}