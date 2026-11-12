/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:20:00
 *
 * 筛选候选分布生成 (构建期, 零运行时计算)
 * 用法: yarn counts  (或 node scripts/generate-filter-counts.js [频道名...], 缺省全量)
 *
 * 通过 babel 转译加载各频道真实的 search() 与 ds 候选常量 (解码数据以 shim 注入),
 * 以「其他维度全空」的查询逐候选实际搜索取未截断条数, 计数与运行时行为天然一致。
 * 产出 src/utils/subject/<ch>/counts.ts, 数字为候选的真实总数 (不封顶);
 * 结果列表条目的显示上限由 search 的 SEARCH_RESULT_LIMIT 决定, 与本数字无关。
 *
 * 对账: partition 维度 (谓词保证每个条目恰好归入一个候选) Σ候选数 == 数据集总量,
 * 不一致说明数据或谓词漂移, 退出码 1。
 *
 * 数据更新流程: 换 bin 后重跑本脚本, counts.ts 与 TEXT_UPDATE_* 同步维护。
 * 注意: bin 内容变更后 Metro 资源 URL 按内容哈希变化, 与本脚本无耦合。
 */
const fs = require('fs')
const path = require('path')
const Module = require('module')
const Babel = require('@babel/core')
const Protobuf = require('protobufjs')

const ROOT = path.resolve(__dirname, '..')
const ASSETS_DIR = path.join(ROOT, 'src/assets/proto')
const JSON_DIR = path.join(ROOT, 'src/assets/json')
const SUBJECT_DIR = path.join(ROOT, 'src/utils/subject')
const ONLY = process.argv.slice(2)

/**
 * 频道与维度配置
 *  - dims 顺序与各频道 filterDS 一致 (不含 sort / collected)
 *  - multiple: 查询值为数组形态的维度 (仅 anime meta/tags, 与 store onSelect 一致)
 *  - partition: 谓词保证每个条目恰好归入一个候选, 用于 Σ候选数 == 总数 对账
 *  - candidates 为 ds 常量名, 也可直接给数组 (adv 的 NSFW 定义在屏幕侧)
 */
const CHANNELS = [
  {
    name: 'anime',
    prefix: 'ANIME',
    dims: [
      { key: 'area', candidates: 'ANIME_AREA', partition: true },
      { key: 'meta', candidates: 'ANIME_META', multiple: true },
      { key: 'year', candidates: 'ANIME_YEAR' },
      { key: 'begin', candidates: 'ANIME_BEGIN' },
      { key: 'status', candidates: 'ANIME_STATUS', partition: true },
      { key: 'ep', candidates: 'ANIME_EP' },
      { key: 'tags', candidates: 'ANIME_TAGS', multiple: true },
      { key: 'official', candidates: 'ANIME_OFFICIAL' },
      { key: 'x', candidates: 'ANIME_NSFW', partition: true }
    ]
  },
  {
    name: 'adv',
    prefix: 'ADV',
    dims: [
      { key: 'year', candidates: 'ADV_YEAR' },
      { key: 'platform', candidates: 'ADV_PLATFORM' },
      { key: 'tag', candidates: 'ADV_TAGS' },
      { key: 'playtime', candidates: 'ADV_PLAYTIME', partition: true },
      { key: 'dev', candidates: 'ADV_DEV' },
      { key: 'cn', candidates: 'ADV_CN', partition: true },
      { key: 'x', candidates: ['限制', '未知'], partition: true }
    ]
  },
  {
    name: 'album',
    prefix: 'ALBUM',
    dims: [
      { key: 'year', candidates: 'ALBUM_YEAR' },
      { key: 'publisher', candidates: 'ALBUM_PUBLISHERS' },
      { key: 'cate', candidates: 'ALBUM_CATES' },
      { key: 'tag', candidates: 'ALBUM_TAGS' },
      { key: 'author', candidates: 'ALBUM_AUTHORS' },
      { key: 'x', candidates: 'ALBUM_NSFW', partition: true }
    ]
  },
  {
    name: 'game',
    prefix: 'GAME',
    dims: [
      { key: 'year', candidates: 'GAME_YEAR' },
      { key: 'platform', candidates: 'GAME_PLATFORM' },
      { key: 'cate', candidates: 'GAME_CATE' },
      { key: 'tag', candidates: 'GAME_TAGS' },
      { key: 'dev', candidates: 'GAME_DEV' },
      { key: 'pub', candidates: 'GAME_PUB' },
      { key: 'x', candidates: 'GAME_NSFW', partition: true }
    ]
  },
  {
    name: 'hentai',
    prefix: 'HENTAI',
    dims: [
      { key: 'year', candidates: 'HENTAI_YEAR' },
      { key: 'chara', candidates: 'HENTAI_CHARA' },
      { key: 'job', candidates: 'HENTAI_JOB' },
      { key: 'body', candidates: 'HENTAI_BODY' },
      { key: 'content', candidates: 'HENTAI_CONTENT' }
    ]
  },
  {
    name: 'manga',
    prefix: 'MANGA',
    dims: [
      { key: 'start', candidates: 'MANGA_YEAR' },
      { key: 'update', candidates: 'MANGA_YEAR' },
      { key: 'end', candidates: 'MANGA_YEAR' },
      { key: 'publisher', candidates: 'MANGA_PUBLISHERS' },
      { key: 'tag', candidates: 'MANGA_TAGS' },
      { key: 'vol', candidates: 'MANGA_VOL' },
      { key: 'ch', candidates: 'MANGA_CH' },
      { key: 'x', candidates: 'MANGA_NSFW', partition: true }
    ]
  },
  {
    name: 'music',
    prefix: 'MUSIC',
    dims: [
      { key: 'year', candidates: 'MUSIC_YEAR' },
      { key: 'tag', candidates: 'MUSIC_TAGS' },
      { key: 'x', candidates: 'MUSIC_NSFW', partition: true }
    ]
  },
  {
    name: 'nsfw',
    prefix: 'NSFW',
    dims: [
      { key: 'year', candidates: 'NSFW_YEAR' },
      { key: 'type', candidates: 'NSFW_TYPE' },
      { key: 'tag', candidates: 'NSFW_TAGS' }
    ]
  },
  {
    name: 'real',
    prefix: 'REAL',
    dims: [
      { key: 'region', candidates: 'REAL_REGION', partition: true },
      { key: 'year', candidates: 'REAL_YEAR' },
      { key: 'form', candidates: 'REAL_FORM', partition: true },
      { key: 'tag', candidates: 'REAL_TAGS' },
      { key: 'x', candidates: 'REAL_NSFW', partition: true }
    ]
  },
  {
    name: 'wenku',
    prefix: 'WENKU',
    dims: [
      { key: 'start', candidates: 'WENKU_YEAR' },
      { key: 'update', candidates: 'WENKU_YEAR' },
      { key: 'end', candidates: 'WENKU_YEAR' },
      { key: 'publisher', candidates: 'WENKU_PUBLISHERS' },
      { key: 'cate', candidates: 'WENKU_CATES' },
      { key: 'tag', candidates: 'WENKU_TAGS' },
      { key: 'vol', candidates: 'WENKU_VOL' },
      { key: 'author', candidates: 'WENKU_AUTHORS' },
      { key: 'anime', candidates: 'WENKU_ANIME', partition: true },
      { key: 'x', candidates: 'WENKU_NSFW', partition: true }
    ]
  }
]

/** 首次运行时预置空壳, 保证频道模块链 (barrel re-export counts) 可加载 */
function ensureCountsStub(channel) {
  const file = path.join(SUBJECT_DIR, channel.name, 'counts.ts')
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `export const ${channel.prefix}_COUNTS = {\n  total: 0\n}\n`)
    console.log(`· 预置空壳 ${path.relative(ROOT, file)}`)
  }
}

// ==================== 数据解码 (与 pb-verify / 运行时 decoder 的 defaults:false 语义一致) ====================

const DATA = {}

function decodeProtoDataset(name) {
  const dir = path.join(ASSETS_DIR, name)
  const { root } = Protobuf.parse(fs.readFileSync(path.join(dir, 'proto', 'index.proto'), 'utf-8'))
  const Message = root.lookupType('Payload')
  const buffer = fs.readFileSync(path.join(dir, 'bin', 'index.bin'))
  const decoded = Message.decode(buffer)
  return Message.toObject(decoded, { longs: Number, enums: Number, bytes: String }).payload
}

function decodeAllDatasets(channels) {
  channels.forEach(channel => {
    if (channel.name === 'hentai') {
      DATA[channel.name] = JSON.parse(
        fs.readFileSync(path.join(JSON_DIR, 'thirdParty/h.min.json'), 'utf8')
      )
    } else {
      DATA[channel.name] = decodeProtoDataset(channel.name)
    }
    console.log(`· 解码 ${channel.name}: ${DATA[channel.name].length} 条`)
  })
}

// ==================== Node 加载 TS 模块 (babel 转译 + 模块 shim) ====================

const SHIM_DIR = path.join(__dirname, '_shims')
const SHIM_UTILS = path.join(SHIM_DIR, 'utils.ts')
const SHIM_DEV = path.join(SHIM_DIR, 'dev.ts')
const SHIM_PROTOBUF = path.join(SHIM_DIR, 'protobuf.ts')
const SHIM_PINYIN = path.join(SHIM_DIR, 'pinyin.ts')
const SHIM_JSON = path.join(SHIM_DIR, 'json.ts')
const SHIM_CONSTANTS = path.join(SHIM_DIR, 'constants.ts')

function injectShim(absPath, exportsObject) {
  const mod = new Module(absPath, null)
  mod.filename = absPath
  mod.exports = exportsObject
  mod.loaded = true
  require.cache[absPath] = mod
}

function installModuleHooks() {
  require.extensions['.ts'] = function (module, filename) {
    const src = fs.readFileSync(filename, 'utf8')
    const { code } = Babel.transformSync(src, {
      filename,
      configFile: false,
      babelrc: false,
      presets: [['@babel/preset-typescript']],
      plugins: ['@babel/plugin-transform-modules-commonjs']
    })
    module._compile(code, filename)
  }

  const SHIM_BY_REQUEST = {
    '@utils': SHIM_UTILS,
    '@utils/dev': SHIM_DEV,
    '@utils/thirdParty/protobuf': SHIM_PROTOBUF,
    '@utils/thirdParty/pinyin/dict': SHIM_PINYIN,
    '@assets/json': SHIM_JSON,
    '@constants': SHIM_CONSTANTS
  }
  const PATH_SHIMS = {
    [path.join(ROOT, 'src/utils/index.ts')]: SHIM_UTILS,
    [path.join(ROOT, 'src/utils/dev/index.ts')]: SHIM_DEV,
    [path.join(ROOT, 'src/utils/thirdParty/protobuf/index.ts')]: SHIM_PROTOBUF
  }

  const originalResolveFilename = Module._resolveFilename
  Module._resolveFilename = function (request, parent, isMain, options) {
    if (SHIM_BY_REQUEST[request]) return SHIM_BY_REQUEST[request]

    let resolved
    try {
      resolved = originalResolveFilename.call(this, request, parent, isMain, options)
    } catch (error) {
      // 无扩展名 TS 模块与目录导入 (如 '../anime' → ../anime/index.ts)
      const base = parent?.filename
        ? path.resolve(path.dirname(parent.filename), request)
        : path.resolve(ROOT, request)
      const candidates = []
      try {
        if (fs.statSync(base).isDirectory()) candidates.push(path.join(base, 'index.ts'))
      } catch {}
      candidates.push(`${base}.ts`, `${base}.tsx`)
      resolved = candidates.find(candidate => fs.existsSync(candidate))
      if (!resolved) throw error
    }
    return PATH_SHIMS[resolved] || resolved
  }
}

function installShims() {
  injectShim(SHIM_UTILS, {
    asc: (a, b) => (a < b ? -1 : a > b ? 1 : 0),
    getTimestamp: value => (value === undefined ? Date.now() : Date.parse(value) || 0),
    isArray: Array.isArray
  })
  injectShim(SHIM_DEV, {
    logger: { log() {}, error() {}, warn() {}, info() {} },
    rc: (...keys) => keys.join('-'),
    r: () => {},
    rerender: () => {},
    ll: () => {},
    log: () => {},
    globalLog: () => {},
    globalWarn: () => {},
    now: () => Date.now(),
    getDisplayWidth: () => 0,
    padDisplay: value => value,
    fill: value => value
  })
  injectShim(SHIM_PROTOBUF, {
    decode: async name => DATA[name],
    get: name => DATA[name]
  })
  injectShim(SHIM_PINYIN, { getPinYinFirstCharacter: value => value })
  injectShim(SHIM_JSON, {
    loadJSON: async name => JSON.parse(fs.readFileSync(path.join(JSON_DIR, `${name}.json`), 'utf8'))
  })
  // @constants 只承载 nsfw 用到的 MODEL_SUBJECT_TYPE, 取真实实现保证 getValue 语义一致
  injectShim(SHIM_CONSTANTS, {
    MODEL_SUBJECT_TYPE: require(path.join(ROOT, 'src/constants/model/subject.ts'))
      .MODEL_SUBJECT_TYPE
  })
}

// ==================== 计数 ====================

async function countChannel(channel) {
  const mod = require(path.join(SUBJECT_DIR, channel.name, 'index.ts'))
  await mod.init()
  const search = mod.search
  const ds = require(path.join(SUBJECT_DIR, channel.name, 'ds.ts'))

  const total = search({}, Infinity).list.length
  const counts = {}
  const raw = {}

  channel.dims.forEach(dim => {
    const candidates = Array.isArray(dim.candidates) ? dim.candidates : ds[dim.candidates]
    if (!Array.isArray(candidates) || !candidates.length) {
      throw new Error(`${channel.name}.${dim.key} 候选常量缺失: ${dim.candidates}`)
    }

    const rawValues = {}
    candidates.forEach(candidate => {
      const query = dim.multiple ? { [dim.key]: [candidate] } : { [dim.key]: candidate }
      rawValues[String(candidate)] = search(query, Infinity).list.length
    })
    counts[dim.key] = rawValues
    raw[dim.key] = rawValues
  })

  return { total, counts, raw }
}

function verifyChannel(channel, total, raw) {
  const errors = []
  channel.dims.forEach(dim => {
    if (!dim.partition) return
    const sum = Object.values(raw[dim.key]).reduce((a, b) => a + b, 0)
    if (sum !== total) {
      errors.push(`${channel.name}.${dim.key}: Σ候选 ${sum} ≠ 总数 ${total} (数据或谓词可能漂移)`)
    }
  })
  return errors
}

/**
 * 校验分面桶与真实 search 谓词一致: 逐候选对比 桶计数 vs 搜索计数
 *  - 不一致说明 facet.ts 的桶函数与 search 谓词漂移, 阻止出厂数字与实际行为打架
 */
function verifyFacets(channel, data, raw) {
  const facets = require(path.join(SUBJECT_DIR, channel.name, 'facet.ts'))
  const errors = []

  channel.dims.forEach(dim => {
    const facetDim = facets.FACET_DIMS.find(item => item.key === dim.key)
    if (!facetDim) {
      errors.push(`${channel.name}: facet 维度缺失 ${dim.key}`)
      return
    }

    const labelIndex = new Map(facetDim.values.map((value, index) => [String(value), index]))
    Object.keys(raw[dim.key]).forEach(label => {
      const index = labelIndex.get(label)
      if (index === undefined) {
        errors.push(`${channel.name}.${dim.key}: facet 候选缺失 ${label}`)
        return
      }

      const viaBuckets = data.filter(item => {
        const bucket = facetDim.bucketsOf(item)
        return typeof bucket === 'number' ? bucket === index : bucket.includes(index)
      }).length
      const viaSearch = raw[dim.key][label]
      if (viaBuckets !== viaSearch) {
        errors.push(
          `${channel.name}.${dim.key}[${label}]: 桶计数 ${viaBuckets} ≠ 搜索计数 ${viaSearch}`
        )
      }
    })
  })
  return errors
}

// ==================== 产出 ====================

function formatNow() {
  const pad = num => String(num).padStart(2, '0')
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

function formatKey(label) {
  return `'${String(label).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

function emit(channel, counts, total) {
  const file = path.join(SUBJECT_DIR, channel.name, 'counts.ts')
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  // 复用首版 @Date, 避免重复生成时产生无意义 diff
  const created = (existing.match(/@Date: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/) || [])[1]
  const now = created || formatNow()
  const lines = [
    '/*',
    ' * @Author: czy0729',
    ` * @Date: ${now}`,
    ' * @Last Modified by: czy0729',
    ` * @Last Modified time: ${now}`,
    ' *',
    ' * 筛选候选分布 (scripts/generate-filter-counts.js 自动生成, 勿手改)',
    ' * 数字为候选的真实条目数 (全局分布); 结果列表条目的显示上限由 search 截断决定',
    ' */',
    `export const ${channel.prefix}_COUNTS = {`
  ]

  channel.dims.forEach(dim => {
    const entries = Object.entries(counts[dim.key])
    lines.push(`  ${dim.key}: {`)
    entries.forEach(([label, num], i) => {
      lines.push(`    ${formatKey(label)}: ${num}${i === entries.length - 1 ? '' : ','}`)
    })
    lines.push('  },')
  })
  lines.push(`  total: ${total}`)
  lines.push('}')

  let code = `${lines.join('\n')}\n`
  try {
    // 对齐仓库 prettier 配置, 保证重复生成 diff 稳定 (如中文候选键的引号策略)
    const prettier = require('prettier')
    const config = (prettier.resolveConfig && prettier.resolveConfig.sync(file)) || {}
    code = prettier.format(code, { ...config, filepath: file })
  } catch (error) {
    console.warn(`· prettier 格式化失败 (${channel.name}), 保留原始输出: ${error.message}`)
  }

  // 仅 Last Modified 时间变化时跳过写入, 保持 git 状态干净
  const normalize = source => source.replace(/@Last Modified time: .*/, '@Last Modified time: -')
  if (existing && normalize(existing) === normalize(code)) return file

  fs.writeFileSync(file, code)
  return file
}

// ==================== main ====================

async function main() {
  const channels = ONLY.length ? CHANNELS.filter(({ name }) => ONLY.includes(name)) : CHANNELS
  if (!channels.length) {
    console.error(`未找到频道: ${ONLY.join(', ')}`)
    console.error(`可选: ${CHANNELS.map(({ name }) => name).join(', ')}`)
    process.exit(1)
  }

  installModuleHooks()
  installShims()
  decodeAllDatasets(channels)
  channels.forEach(ensureCountsStub)

  // 阶段一: 计数 + 对账 (对账全部通过前不写任何产物, 避免失败运行污染 counts.ts)
  const results = []
  const errors = []
  for (const channel of channels) {
    const { total, counts, raw } = await countChannel(channel)
    errors.push(...verifyChannel(channel, total, raw))
    errors.push(...verifyFacets(channel, DATA[channel.name], raw))
    results.push({ channel, total, counts })
    console.log(
      `✔ ${channel.name}: ${total} 条, ${channel.dims.length} 个维度 (对账通过)`
    )
  }

  if (errors.length) {
    console.error('\n对账失败, 已跳过产物写入:')
    errors.forEach(error => console.error(`   - ${error}`))
    process.exit(1)
  }

  // 阶段二: 对账全部通过后统一产出
  for (const { channel, total, counts } of results) {
    const file = emit(channel, counts, total)
    console.log(`→ ${path.relative(ROOT, file)}`)
  }
  console.log(`\n${channels.length}/${channels.length} 频道生成完成`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
