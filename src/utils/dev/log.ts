/*
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 00:57:20
 */
import { DEV, LOG_LEVEL } from '@src/config'
import { logger } from './logger'
import { handleCircular, now } from './utils'

/**
 * 测试 log
 * @version 171024 0.1
 * @version 181101 1.0 测试环境才显示
 * @param {String} type  消息类型
 * @param {String} key   消息键
 * @param {Any}    value 消息值
 */
export function log(
  type: unknown = '',
  key: unknown = '',
  value: unknown = '',
  ...other: unknown[]
) {
  if (LOG_LEVEL === 0) return

  const res: unknown[] = [type]
  if (key !== undefined) res.push('\n', key)
  if (value !== undefined) res.push('\n', value)
  if (other && other.length) res.push('\n', other)

  logger.log(now(), ...res)
}

/** 全局 log, 能打印循环引用 */
export function globalLog(value: unknown, space: string | number) {
  logger.log(JSON.stringify(value, handleCircular(), space))
}

/** 全局警告 */
export function globalWarn(key: unknown, method: unknown) {
  if (!DEV) return
  log(`\x1b[40m\x1b[33m[${key}] ${method}\x1b[0m`)
}
