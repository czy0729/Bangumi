/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 10:00:00
 */

/** 日志等级对应颜色 */
export const LEVEL_COLORS = {
  info: '#8ab4f8',
  success: '#81c995',
  warn: '#fdd663',
  error: '#f28b82'
} as const

/** 日志等级对应前缀 */
export const LEVEL_PREFIX = {
  info: 'I',
  success: '✓',
  warn: '!',
  error: '✗'
} as const

/** Worker 日志类型筛选按钮配置 */
export const WORKER_TYPE_FILTERS = [
  { key: 'host', label: 'HOST' },
  { key: 'api', label: 'API' },
  { key: 'lain', label: 'LAIN' }
] as const

/** ECH 日志类型筛选按钮配置 */
export const ECH_TYPE_FILTERS = [
  { key: 'proxy', label: 'PROXY' },
  { key: 'dns', label: 'DNS' },
  { key: 'cache', label: 'CACHE' },
  { key: 'connect', label: 'CONN' }
] as const
