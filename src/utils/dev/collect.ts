/*
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 00:12:43
 */
import { logger } from './logger'


const _collectLogKeys: Record<string | number, boolean> = {}
const _collectLogItems: Record<string, any>[] = []
let _collectIndex = 0

/** 收集项数据, 到达一定数目后打印 */
export function ll(item: Record<string, any>, key: string | number, limit: number = 12) {
  if (_collectLogItems.length >= limit) return

  if (!key) {
    _collectIndex += 1
    key = _collectIndex
  }

  if (!_collectLogKeys[key]) {
    _collectLogKeys[key] = true
    _collectLogItems.push(item)
    if (_collectLogItems.length === limit) {
      logger.log('\n', JSON.stringify(_collectLogItems))
    }
  }
}
