/*
 * @Author: czy0729
 * @Date: 2026-10-06 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-07 01:53:09
 *
 * 找XX 筛选项一致性校验 (只读)
 * 用法: node scripts/tag-verify.js [channel ...]
 *
 *  1. 客户端 src/utils/subject/<ch>/ds.ts 的维度表与 web/standalone/<ch>/cache 的生成侧表逐项一致
 *  2. src/assets/proto/<ch>/bin/index.bin 解码后, t / p / a 下标与 c 单值均落在表长度范围内
 *
 * 任一频道不一致时退出码为 1
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SUBJECT_DIR = path.join(ROOT, 'src/utils/subject')
const PROTO_DIR = path.join(ROOT, 'src/assets/proto')

/** 频道 → { cache 文件, bin 名, 字段: ds.ts 常量名 } */
const CHANNELS = {
  wenku: {
    cache: 'web/standalone/wenku/cache/wenku.json',
    fields: {
      tags: 'WENKU_TAGS',
      publishers: 'WENKU_PUBLISHERS',
      authors: 'WENKU_AUTHORS',
      cates: 'WENKU_CATES'
    },
    binFields: [
      { key: 't', table: 'WENKU_TAGS' },
      { key: 'p', table: 'WENKU_PUBLISHERS' },
      { key: 'a', table: 'WENKU_AUTHORS' }
    ],
    binSingle: [{ key: 'c', table: 'WENKU_CATES' }]
  },
  anime: {
    cache: 'web/standalone/anime/cache/anime.json',
    fields: { tags: 'ANIME_TAGS', metas: 'ANIME_META', officials: 'ANIME_OFFICIAL' },
    binFields: [
      { key: 't', table: 'ANIME_TAGS' },
      { key: 'o', table: 'ANIME_OFFICIAL' },
      { key: 'mt', table: 'ANIME_META' }
    ]
  },
  manga: {
    cache: 'web/standalone/manga/cache/manga.json',
    fields: { tags: 'MANGA_TAGS', publishers: 'MANGA_PUBLISHERS' },
    binFields: [
      { key: 't', table: 'MANGA_TAGS' },
      { key: 'p', table: 'MANGA_PUBLISHERS' }
    ]
  },
  music: {
    cache: 'web/standalone/music/cache/music.json',
    fields: { tags: 'MUSIC_TAGS' },
    binFields: [{ key: 't', table: 'MUSIC_TAGS' }]
  },
  real: {
    cache: 'web/standalone/real/cache/real.json',
    fields: { tags: 'REAL_TAGS' },
    binFields: [{ key: 't', table: 'REAL_TAGS' }]
  },
  album: {
    cache: 'web/standalone/album/cache/album.json',
    fields: {
      tags: 'ALBUM_TAGS',
      publishers: 'ALBUM_PUBLISHERS',
      authors: 'ALBUM_AUTHORS',
      cates: 'ALBUM_CATES'
    },
    binFields: [
      { key: 't', table: 'ALBUM_TAGS' },
      { key: 'p', table: 'ALBUM_PUBLISHERS' },
      { key: 'a', table: 'ALBUM_AUTHORS' }
    ],
    binSingle: [{ key: 'c', table: 'ALBUM_CATES' }]
  },
  nsfw: {
    cache: 'web/standalone/nsfw/cache/nsfw-tags.json',
    fields: { tags: 'NSFW_TAGS' },
    binFields: [{ key: 'tg', table: 'NSFW_TAGS' }]
  },
  game: {
    cache: 'web/standalone/game/cache/game-tags.json',
    fields: { tags: 'GAME_TAGS' },
    binFields: [{ key: 'tg', table: 'GAME_TAGS' }]
  },
  adv: {
    cache: 'web/standalone/adv/cache/adv-tags.json',
    fields: { tags: 'ADV_TAGS' },
    binFields: [{ key: 'ta', table: 'ADV_TAGS' }]
  }
}

/** 从 ds.ts 解析 export const X = [ ... ] as const (兼容转义引号) */
function parseConst(source, name) {
  const match = source.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const`))
  if (!match) return null

  const items = []
  const re = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g
  let result = re.exec(match[1])
  while (result) {
    items.push(String(result[1] !== undefined ? result[1] : result[2]).replace(/\\(['"\\])/g, '$1'))
    result = re.exec(match[1])
  }
  return items
}

let failed = 0
const logs = []

function fail(channel, message) {
  failed++
  logs.push(`  ✘ ${channel}: ${message}`)
}

function pass(channel, message) {
  logs.push(`  ✔ ${channel}: ${message}`)
}

function run(channel) {
  const config = CHANNELS[channel]
  if (!config) {
    fail(channel, '未配置校验规则')
    return
  }

  const dsPath = path.join(SUBJECT_DIR, channel, 'ds.ts')
  if (!fs.existsSync(dsPath)) {
    fail(channel, '找不到 ds.ts')
    return
  }

  const source = fs.readFileSync(dsPath, 'utf-8')
  const tables = {}
  Object.keys(config.fields).forEach(field => {
    const name = config.fields[field]
    const list = parseConst(source, name)
    if (!list) {
      fail(channel, `${name} 解析失败`)
      return
    }

    tables[name] = list

    /** 与生成侧表逐项比对 */
    const cachePath = path.join(ROOT, config.cache)
    if (!fs.existsSync(cachePath)) return

    const raw = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
    const cacheList = Array.isArray(raw) ? raw : raw[field]
    if (!Array.isArray(cacheList)) return

    const same =
      cacheList.length === list.length && cacheList.every((item, index) => item === list[index])
    if (!same) {
      fail(
        channel,
        `${name} 与生成侧表不一致 (ds ${list.length} 项 / cache ${cacheList.length} 项)`
      )
    }
  })

  /** bin 下标范围校验 */
  const binPath = path.join(PROTO_DIR, channel, 'bin/index.bin')
  const protoPath = path.join(PROTO_DIR, channel, 'proto/index.proto')
  if (!fs.existsSync(binPath) || !fs.existsSync(protoPath)) {
    logs.push(`  - ${channel}: 无 bin/proto, 跳过下标校验`)
    return
  }

  let payload
  try {
    const protobufjs = require(path.resolve(ROOT, 'web/test/node_modules/protobufjs'))
    const { root } = protobufjs.parse(fs.readFileSync(protoPath, 'utf-8'))
    const Message = root.lookupType('Payload')
    payload = Message.toObject(Message.decode(fs.readFileSync(binPath)), {
      longs: Number,
      enums: Number,
      bytes: String
    }).payload
  } catch (error) {
    fail(channel, `bin 解码失败: ${error.message}`)
    return
  }

  if (!Array.isArray(payload)) {
    fail(channel, 'bin 载荷不是数组')
    return
  }

  const overs = []
  payload.forEach(item => {
    ;(config.binFields || []).forEach(({ key, table }) => {
      const list = tables[table]
      if (!list) return

      const values = item[key]
      if (values === undefined) return

      const array = Array.isArray(values) ? values : [values]
      array.forEach(index => {
        if (typeof index !== 'number' || index < 0 || index >= list.length) {
          overs.push(`${key}=${index}`)
        }
      })
    })
    ;(config.binSingle || []).forEach(({ key, table }) => {
      const list = tables[table]
      if (!list) return

      const value = item[key]
      /** 单值为 1-based (0 表示无) */
      if (typeof value === 'number' && value > list.length) overs.push(`${key}=${value}`)
    })
  })

  if (overs.length) {
    fail(channel, `bin 下标越界 ${overs.length} 处: ${overs.slice(0, 10).join(' / ')}`)
  } else {
    pass(channel, `${payload.length} 条, 下标全部命中 (${Object.keys(tables).length} 张表)`)
  }
}

const args = process.argv.slice(2)
const targets = args.length ? args : Object.keys(CHANNELS)
targets.forEach(run)

console.log('\n找XX 筛选项一致性校验')
logs.forEach(item => console.log(item))
console.log(failed ? `\n✘ 失败 ${failed} 项` : '\n✔ 全部通过')
process.exit(failed ? 1 : 0)
