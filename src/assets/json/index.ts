/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:45:45
 */
import type { JSONData, JSONPath } from './types'

const memo = new Map<JSONPath, JSONData[JSONPath]>()
const lock = new Map<JSONPath, true>()

/** 未命中且调用方未提供 defaultValue 时的兜底 */
const EMPTY = {} as JSONData[JSONPath]

/** 加载 json 数据, 客户端与本地获取方式是一致的, 目的是网页端能把 json 文件从打包中剔除 */
export async function loadJSON<T extends JSONPath>(
  name: T,
  defaultValue?: JSONData[T]
): Promise<JSONData[T]> {
  try {
    if (memo.has(name)) return memo.get(name) as JSONData[T]

    let data: JSONData[T]
    switch (name as JSONPath) {
      /** ==================== substrings ==================== */
      case 'substrings/anime':
        data = require('./substrings/anime.json') as JSONData[T]
        break

      case 'substrings/book':
        data = require('./substrings/book.json') as JSONData[T]
        break

      case 'substrings/game':
        data = require('./substrings/game.json') as JSONData[T]
        break

      case 'substrings/real':
        data = require('./substrings/real.json') as JSONData[T]
        break

      case 'substrings/alias':
        data = require('./substrings/alias.json') as JSONData[T]
        break

      case 'substrings/addon':
        data = require('./substrings/addon.json') as JSONData[T]
        break

      /** ==================== typerank ==================== */
      case 'typerank/anime':
        data = require('./typerank/anime.json') as JSONData[T]
        break

      case 'typerank/book':
        data = require('./typerank/book.json') as JSONData[T]
        break

      case 'typerank/game':
        data = require('./typerank/game.json') as JSONData[T]
        break

      case 'typerank/music':
        data = require('./typerank/music.json') as JSONData[T]
        break

      case 'typerank/real':
        data = require('./typerank/real.json') as JSONData[T]
        break

      /** ==================== typerank-ids ==================== */
      case 'typerank/book-ids':
        data = require('./typerank/book-ids.json') as JSONData[T]
        break

      case 'typerank/game-ids':
        data = require('./typerank/game-ids.json') as JSONData[T]
        break

      case 'typerank/music-ids':
        data = require('./typerank/music-ids.json') as JSONData[T]
        break

      case 'typerank/real-ids':
        data = require('./typerank/real-ids.json') as JSONData[T]
        break

      /** ==================== data ==================== */
      case 'group':
        data = require('./group.json') as JSONData[T]
        break

      case 'nsfw_id_distribution':
        data = require('./nsfw_id_distribution.json') as JSONData[T]
        break

      /** ==================== japanese romanization ==================== */
      case 'thirdParty/ja.addon':
        data = require('./thirdParty/ja.addon.json') as JSONData[T]
        break

      /** ==================== thirdParty ==================== */
      case 'thirdParty/h.min':
        data = require('./thirdParty/h.min.json') as JSONData[T]
        break

      case 'thirdParty/wenku.min':
        data = require('./thirdParty/wenku.min.json') as JSONData[T]
        break

      default:
        break
    }

    if (data) {
      memo.set(name, data)
      return data
    }
  } catch {}

  return (defaultValue ?? EMPTY) as JSONData[T]
}

/** 返回同步的 json 数据, 需要先提前使用 loadJSON 加载数据 */
export function getJSON<T extends JSONPath>(
  name: T,
  defaultValue?: JSONData[T],
  autoLoad: boolean = false
): JSONData[T] {
  if (autoLoad && !memo.has(name) && !lock.has(name)) {
    lock.set(name, true)

    setTimeout(() => {
      loadJSON(name)
    }, 0)
  }

  const data = memo.get(name) || defaultValue
  return (data ?? EMPTY) as JSONData[T]
}
