/*
 * @Author: czy0729
 * @Date: 2026-08-30 06:12:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:35:11
 *
 * protobuf 静态资产校验 (项目级, 不依赖 web/test 开发沙盒)
 * 用法: node scripts/pb-verify.js [数据集名...]  (缺省全量)
 *
 * 对 src/assets/proto/{name}/{proto/index.proto, bin/index.bin} 逐项验证:
 *   1. proto 可解析且存在 Payload message (运行时 decode 的前提)
 *   2. bin 可被对应 proto 正确解码, 且 payload 为非空数组
 *   3. 解码后条目的字段都在 proto 定义内 (proto/bin 定义无漂移)
 *   4. 解码 -> 重编码 -> 再解码 结果与首次解码一致 (编码稳定性, 同时暴露 bin 中存在 proto 外字段)
 *
 * 任意一项失败时退出码为 1
 */
const fs = require('fs')
const path = require('path')
const protobuf = require('protobufjs')

const ASSETS_DIR = path.resolve(__dirname, '../src/assets/proto')

/** [数据集名] 与 src/assets/proto 下的目录一一对应 */
const DATASETS = [
  'bangumi-data',
  'anime',
  'manga',
  'game',
  'adv',
  'catalog',
  'ja',
  'd',
  'katakana',
  'anime-ids',
  'nsfw',
  'mono'
]

const KB = 1024
const toKB = n => `${(n / KB).toFixed(0)}K`

/** 运行时 decode 同款转换参数 */
function decodePayload(message, binBuffer) {
  const decoded = message.decode(binBuffer)
  const { payload } = message.toObject(decoded, {
    longs: Number,
    enums: Number,
    bytes: String
  })
  return { decoded, payload }
}

function verify(name) {
  const errors = []
  const dir = path.join(ASSETS_DIR, name)
  const protoFile = path.join(dir, 'proto', 'index.proto')
  const binFile = path.join(dir, 'bin', 'index.bin')

  // 1. proto 可解析且存在 Payload
  let Message
  try {
    const { root } = protobuf.parse(fs.readFileSync(protoFile, 'utf-8'))
    Message = root.lookupType('Payload')
  } catch (error) {
    return { info: {}, errors: [`proto 解析失败: ${error.message}`] }
  }

  const binBuffer = fs.readFileSync(binFile)
  const info = { bin: toKB(binBuffer.length), count: 0 }

  // 2. bin 可解码且 payload 为非空数组
  let payload
  let decoded
  try {
    ;({ decoded, payload } = decodePayload(Message, binBuffer))
    if (!Array.isArray(payload)) {
      errors.push(`payload 不是数组 (${typeof payload})`)
    } else if (!payload.length) {
      errors.push('payload 为空数组')
    } else {
      info.count = payload.length
    }
  } catch (error) {
    return { info, errors: [`bin 解码失败: ${error.message}`] }
  }

  // 3. 条目字段都在 proto 定义内
  const fields = Object.keys(Message.fields.payload.resolvedType.fields)
  const itemFields = new Set()
  payload.forEach(item => {
    Object.keys(item).forEach(key => {
      if (!fields.includes(key)) itemFields.add(key)
    })
  })
  if (itemFields.size) {
    errors.push(
      `条目存在 proto 外字段: ${[...itemFields].join(', ')} (proto 定义: ${fields.join(', ')})`
    )
  }

  // 4. 解码 -> 重编码 -> 再解码, 结果须与首次解码一致
  //    (不要求字节级一致: 历史 bin 可能是未打包 repeated 或旧版 protobufjs 生成)
  const reDecoded = decodePayload(Message, Buffer.from(Message.encode(decoded).finish())).payload
  if (JSON.stringify(reDecoded) !== JSON.stringify(payload)) {
    errors.push('重编码后再解码与首次解码结果不一致')
  }

  return { info, errors }
}

function main() {
  const only = process.argv.slice(2)
  const datasets = only.length ? DATASETS.filter(name => only.includes(name)) : DATASETS

  if (!datasets.length) {
    console.error(`未找到数据集: ${only.join(', ')}`)
    console.error(`可选: ${DATASETS.join(', ')}`)
    process.exit(1)
  }

  let failed = 0

  for (const name of datasets) {
    const { info, errors } = verify(name)

    if (errors.length) {
      failed += 1
      console.log(`\n✘ ${name}  bin ${info.bin || '?'}`)
      errors.forEach(error => console.log(`   - ${error}`))
    } else {
      console.log(`✔ ${name}  ${info.count} 条  bin ${info.bin}`)
    }
  }

  console.log(`\n${datasets.length - failed}/${datasets.length} 通过`)
  process.exit(failed ? 1 : 0)
}

main()
