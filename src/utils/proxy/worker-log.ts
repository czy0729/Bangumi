/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-20 22:46:46
 */

export type LogType = 'host' | 'api' | 'lain'

export type WorkerLog = {
  time: number
  level: 'info' | 'success' | 'warn' | 'error'
  type: LogType
  message: string
}

const MAX_LOGS = 50
const logs: WorkerLog[] = []

/** 添加 Worker 代理日志 */
export function addWorkerLog(level: WorkerLog['level'], message: string, type: LogType = 'host') {
  logs.push({ time: Date.now(), level, type, message })
  if (logs.length > MAX_LOGS) logs.shift()
}

/** 获取所有 Worker 代理日志 */
export function getWorkerLogs(): WorkerLog[] {
  return [...logs]
}
