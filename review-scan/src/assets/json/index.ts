/*
 * @Author: czy0729
 * @Date: 2024-08-17 11:48:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 20:18:35
 */
import { JSONData, JSONPath } from './types'

const memo = new Map<JSONPath, JSONData[JSONPath]>()
const lock = new Map<JSONPath, true>()

/** 加载 json 数据, 客户端与本地获取方式是一致的, 目的是网页端能把 json 文件从打包中剔除 */
export async function loadJSON<T extends JSONPath>(
  name: T,
  defaultValue: any = {}
): Promise<JSONData[T]> {
  try {
    if (memo.has(name)) return memo.get(name) as JSONData[T]

    let data: JSONData[T]
    switch (name as JSONPath) {
      /** ==================== substrings ==================== */
      case 'substrings/anime':
        data = require('./substrings/anime.json')
        break

      case 'substrings/book':
        data = require('./substrings/book.json')
        break

      case 'substrings/game':
        data = require('./substrings/game.json')
        break

      case 'substrings/alias':
        data = require('./substrings/alias.json')
        break

      case 'substrings/addon':
        data = require('./substrings/addon.json')
        break

      /** ==================== typerank ==================== */
      case 'typerank/anime':
        data = require('./typerank/anime.json')
        break

      case 'typerank/book':
        data = require('./typerank/book.json')
        break

      case 'typerank/game':
        data = require('./typerank/game.json')
        break

      case 'typerank/music':
        data = require('./typerank/music.json')
        break

      case 'typerank/real':
        data = require('./typerank/real.json')
        break

      /** ==================== typerank-ids ==================== */
      case 'typerank/anime-ids':
        data = require('./typerank/anime-ids.json')
        break

      case 'typerank/book-ids':
        data = require('./typerank/book-ids.json')
        break

      case 'typerank/game-ids':
        data = require('./typerank/game-ids.json')
        break

      case 'typerank/music-ids':
        data = require('./typerank/music-ids.json')
        break

      case 'typerank/real-ids':
        data = require('./typerank/real-ids.json')
        break

      /** ==================== data ==================== */
      case 'katakana':
        data = require('./katakana.json')
        break

      case 'group':
        data = require('./group.json')
        break

      case 'mono':
        data = require('./mono.json')
        break

      /** ==================== japanese romanization ==================== */
      case 'thirdParty/ja.min':
        data = require('./thirdParty/ja.min.json')
        break

      case 'thirdParty/ja.addon':
        data = require('./thirdParty/ja.addon.json')
        break

      /** ==================== thirdParty ==================== */
      case 'thirdParty/d.min':
        data = require('./thirdParty/d.min.json')
        break

      case 'thirdParty/h.min':
        data = require('./thirdParty/h.min.json')
        break

      case 'thirdParty/nsfw.min':
        data = require('./thirdParty/nsfw.min.json')
        break

      case 'thirdParty/wenku.min':
        data = require('./thirdParty/wenku.min.json')
        break

      default:
        break
    }

    if (data) {
      memo.set(name, data)
      return data
    }
  } catch (error) {}

  return defaultValue
}

/** 返回同步的 json 数据, 需要先提前使用 loadJSON 加载数据 */
export function getJSON<T extends JSONPath>(
  name: T,
  defaultValue: any = {},
  autoLoad: boolean = false
): JSONData[T] {
  if (autoLoad && !memo.has(name) && !lock.has(name)) {
    lock.set(name, true)

    setTimeout(() => {
      loadJSON(name)
    }, 0)
  }

  return memo.get(name) || defaultValue
}
