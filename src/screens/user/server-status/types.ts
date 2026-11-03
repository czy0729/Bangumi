/*
 * @Author: czy0729
 * @Date: 2026-11-04 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 *
 * 网络探针: 站点、探测档位与运行模式
 */

/** 探测档位, 同时作为状态点样式键 */
export type ProbeStatus = 'success' | 'warning' | 'danger'

/** 运行模式: 空闲 / 单个站点 / 全部站点 */
export type ProbeMode = 'idle' | 'one' | 'all'

/** 待检测站点 */
export type Site = {
  /** 说明文案 */
  desc: string

  /** 请求地址, 展示与实际请求共用 */
  url: string

  /** 每次检测的延迟 (毫秒), 0 表示失败或超时 */
  msg: number[]

  /** 是否检测中 */
  loading: boolean

  /** 额外请求头 */
  headers?: Record<string, string>
}
