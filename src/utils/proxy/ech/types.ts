/*
 * @Author: czy0729
 * @Date: 2026-06-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 10:00:00
 */

/** ECH 代理配置 */
export type EchProxyConfig = {
  /** 监听端口, 传 0 由系统分配随机端口 */
  port?: number

  /** DoH 服务器地址 */
  dns?: string
}

/** ECH 代理状态 */
export type EchProxyStatus = {
  /** 是否正在运行 */
  running: boolean

  /** 当前端口号, 0 表示未启用 */
  port: number

  /** CA 证书 PEM 内容 (首次启动时返回, 用于安装到系统信任链) */
  caPem?: string
}

/** ECH 代理日志 */
export type EchProxyLog = {
  /** 时间戳 (毫秒) */
  time: number

  /** 日志等级 */
  level: 'info' | 'success' | 'warn' | 'error'

  /** 日志类型 */
  type: 'proxy' | 'dns' | 'cache' | 'connect'

  /** 日志消息 */
  message: string
}
