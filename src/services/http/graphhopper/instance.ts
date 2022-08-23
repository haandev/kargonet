import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'https://graphhopper.com/api/1',
})

instance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    profile: 'truck',
    key: '8c32a82e-7a2e-4ac0-938c-04e98c272613',
    locale: 'tr',
  }
  console.log(config)
  return config
})

instance.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, { indices: false })
}

export default instance
