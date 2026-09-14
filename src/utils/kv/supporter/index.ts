/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 22:15:44
 */
import { APP_ID, APP_SECRET } from '@constants/app'
import { decrypt, SHA1 } from '../../thirdParty/crypto'
import { ORDER, SEGMENTS, TAG } from './ds'

const SEED = '7k3x2609'

const STEP = 3

let cacheKey = ''

function getKey(): string {
  if (!cacheKey) cacheKey = SHA1(`${APP_ID}:${APP_SECRET}:${TAG}:${SEED}`)

  return cacheKey
}

function decode(segment: string): string {
  let out = ''
  for (let i = 0; i < segment.length; i++) {
    out += String.fromCharCode(segment.charCodeAt(i) + STEP)
  }

  return out
}

/** 可取值字段 */
export type SupporterKey = 'host' | 'secret' | 'lainHost' | 'lainSecret'

/** 读取值 (异常时返回空串) */
export function readSupporterValue(key: SupporterKey): string {
  try {
    const segments = SEGMENTS[key]
    if (!segments) return ''

    const cipher = ORDER.map(index => decode(segments[index])).join('')
    const value = JSON.parse(decrypt(cipher, getKey())) as unknown

    return typeof value === 'string' ? value : ''
  } catch {
    return ''
  }
}
