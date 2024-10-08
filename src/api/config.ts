export const CONFIG = {
  API_ROOT: 'https://api.tenshianime.ru/api'
}

type RequestOptions = {
  contentType?: boolean | string
  isFormDataBody?: boolean
}

export default class API {
  static request = async (
    endpoint: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    signal = null,
    optionsReq: RequestOptions = { contentType: 'application/json' }
  ) => {
    const headers = new Headers({})

    if (optionsReq.contentType !== false) {
      headers.append('Content-Type', optionsReq.contentType as string)
    }

    const options: RequestInit = {
      method,
      credentials: 'include',
      headers
    }

    if (body) {
      options.body = optionsReq.isFormDataBody ? body : JSON.stringify(body)
    }

    if (signal) {
      options.signal = signal
    }

    return fetch(`${CONFIG.API_ROOT}/${endpoint}`, options)
      .then((response) => {
        return getJSON(response)
      })
      .catch((err) => {
        throw err
      })
  }
}

function getJSON(response: Response) {
  return response
    .json()
    .then((obj) => {
      return obj
    })
    .catch(() => {
      return null
    })
}
