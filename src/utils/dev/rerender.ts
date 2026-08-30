/*
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 00:57:32
 */
import { WEB } from '@constants/device'
import { DEV, RERENDER_NOT_SHOW, RERENDER_SHOW } from '@src/config'
import { logger } from './logger'
import { now } from './utils'
import { RERENDER_LOG_COUNT, RERENDER_MEMO } from './ds'

import type { Join } from '@types'

/** @deprecated 调试查看组件 re-render 情况 */
export function rerender(key: string, ...other: unknown[]) {
  if (
    !DEV ||
    !key ||
    !RERENDER_SHOW.test(key) ||
    RERENDER_NOT_SHOW.some(item => key.includes(item))
  ) {
    return
  }

  if (!RERENDER_MEMO.data[key]) RERENDER_MEMO.data[key] = 0
  RERENDER_MEMO.data[key] += 1

  let _key = key
  for (let len = _key.length; len <= 24; len += 1) {
    _key += ' '
  }

  let _count = String(RERENDER_MEMO.data[key])
  if (_count && Number(_count) <= RERENDER_LOG_COUNT) return

  _count += ' '
  for (let len = 1; len <= Math.min(RERENDER_MEMO.data[key], 12); len += 1) {
    _count += '■'
  }

  for (let len = _count.length; len <= 12; len += 1) {
    _count += ' '
  }

  logger.log(now(), 'render', _key, _count, ...other)
}

/** 组装调试组件名 */
export function rc<A extends string, B extends string = 'Main'>(
  a: A,
  b?: B
): Join<[A, Exclude<B, undefined>], '.'> {
  return [a, b || 'Main'].join('.') as Join<[A, Exclude<B, undefined>], '.'>
}

/** 调试查看组件 re-render 情况 */
export function r(key: string, ...other: unknown[]) {
  if (
    !DEV ||
    !key ||
    !RERENDER_SHOW.test(key) ||
    RERENDER_NOT_SHOW.some(item => key.includes(item))
  ) {
    return
  }

  if (!RERENDER_MEMO.data[key]) RERENDER_MEMO.data[key] = 0
  RERENDER_MEMO.data[key] += 1

  let _key = key
  for (let len = _key.length; len <= (WEB ? 40 : 20); len += 1) _key += ' '

  let _count = String(RERENDER_MEMO.data[key])
  if (_count && Number(_count) <= RERENDER_LOG_COUNT) return

  _count += ' '
  for (let len = 1; len <= Math.min(RERENDER_MEMO.data[key], 10); len += 1) _count += '■'
  for (let len = _count.length; len <= 15; len += 1) _count += ' '

  setTimeout(() => {
    logger.purple('re-render', _key, RERENDER_MEMO.data[key] < 10 ? ` ${_count}` : _count, ...other)
  }, 0)
}
