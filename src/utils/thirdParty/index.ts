/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 20:30:00
 */
import Axios from './axios'

import type { CustomAxios } from './types'

/**
 * 统一出口: 打包的 axios (真实 axios 实例)
 *  - 包一层只是把类型收紧到实际用到的 method / config 字段
 *  - 不要再在这里挂 `defaults`: 之前写的 { withCredentials: false, timeout: 8000 } 是死配置 ——
 *    真实 axios 的默认值来自它自己的 defaults, 包装函数上的同名属性不会参与 mergeConfig,
 *    因此那个 8000 从未生效 (需要默认超时请直接改此处的 Axios.defaults, 但要评估全局影响)
 * */
const axiosInstance: CustomAxios = (config: any) => {
  // @ts-expect-error
  return Axios(config)
}

export { axiosInstance as axios }
