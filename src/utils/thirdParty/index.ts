/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 22:50:21
 */
import Axios from './axios'

import type { CustomAxios } from './types'

/**
 * 统一出口: 打包的 axios (真实 axios 实例)
 *  - 包一层只是把类型收紧到实际用到的 method / config 字段
 *  - 不要在包装函数上挂 `defaults`: 之前写的 { withCredentials: false, timeout: 8000 } 是死配置 ——
 *    真实 axios 的默认值来自它自己的 defaults, 包装函数上的同名属性不会参与 mergeConfig
 *  - 全局默认超时在下方 Axios.defaults 上设置, 请求级 config.timeout 可按需覆盖
 * */
// 全局默认 8000ms: 打包的 axios 默认 timeout: 0 (永不超时), 网络挂起时请求会永久悬挂
// @ts-expect-error 打包的 axios 无完整类型声明, defaults 运行时存在
Axios.defaults.timeout = 8000

const axiosInstance: CustomAxios = (config: any) => {
  // @ts-expect-error
  return Axios(config)
}

export { axiosInstance as axios }
