/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 21:07:52
 */
import { getSupporterConfig } from '@utils/kv/worker'

export type LogType = 'host' | 'api' | 'lain'

export type WorkerLog = {
  time: number
  level: 'info' | 'success' | 'warn' | 'error'
  type: LogType
  message: string
}

const MAX_LOGS = 50
const logs: WorkerLog[] = []

/** 打码占位符 */
const MASK = '***'

/** 取出地址里的域名 (不含 scheme / 端口 / 路径) */
function getDomain(url: string): string {
  const host = String(url || '').match(/^(?:https?:)?\/\/([^/?#]+)/)?.[1] || ''
  return host.split(':')[0]
}

/**
 * 隐藏内置支持者节点的真实域名
 * - 支持者节点对用户免费开放, 但不希望暴露具体地址, 故写入日志前统一打码
 * - 只处理内置节点, 用户自填地址与社区反代原样保留 (便于排障)
 */
export function maskSupporterHost(message: string): string {
  if (typeof message !== 'string' || !message) return message

  const { host, lainHost } = getSupporterConfig()
  let result = message

  ;[host, lainHost].forEach(url => {
    const domain = getDomain(url)
    if (domain) result = result.split(domain).join(MASK)
  })

  return result
}

/** 添加 Worker 代理日志 (内置支持者节点域名会打码) */
export function addWorkerLog(level: WorkerLog['level'], message: string, type: LogType = 'host') {
  logs.push({ time: Date.now(), level, type, message: maskSupporterHost(message) })
  if (logs.length > MAX_LOGS) logs.shift()
}

/** 获取所有 Worker 代理日志 */
export function getWorkerLogs(): WorkerLog[] {
  return [...logs]
}

/** 清空所有 Worker 代理日志 */
export function clearWorkerLogs() {
  logs.length = 0
}
