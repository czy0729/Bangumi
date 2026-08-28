/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:06:40
 */

/** 日志等级 (与 LEVEL_COLORS / LEVEL_PREFIX 的键一致) */
export type LogLevel = 'info' | 'success' | 'warn' | 'error'

export type LogType = 'host' | 'api' | 'lain' | 'proxy' | 'dns' | 'cache' | 'connect'

export type TypeFilter = {
  key: string
  label: string
}

export type LogItem = {
  /** 时间戳 (毫秒) */
  time: number

  /** 日志等级 */
  level: LogLevel

  /** 日志类型 */
  type?: LogType

  /** 日志消息 */
  message: string
}

export type Props = {
  title: string
  logs: LogItem[]
  showFilters?: boolean
  typeFilters?: readonly TypeFilter[]
}
