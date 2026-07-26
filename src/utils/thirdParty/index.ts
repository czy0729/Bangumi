/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:12:48
 */
import Axios from './axios'

import type { CustomAxios } from './types'

const axiosInstance: CustomAxios = (config: any) => {
  // @ts-expect-error
  return Axios(config)
}

axiosInstance.defaults = {
  withCredentials: false,
  timeout: 8000
}

export { axiosInstance as axios }
