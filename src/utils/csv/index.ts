/*
 * @Author: czy0729
 * @Date: 2026-09-01 22:25:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 22:26:15
 *
 * CSV 解析与生成
 *
 * 零依赖实现, 复刻本 App 备份功能所需的行为子集:
 * - 解析: 分隔符自动检测 (, ; \t 全文计数取最多), RFC4180 引号字段
 *   (引号内分隔符/换行原样保留, "" 转义), 单元格一律 trim 并保持字符串
 * - 生成: 字符串值恒加引号且 " 转义为 "", 数字不加引号, 行间 \n 连接
 */

/** CSV 导入的原始数据行 (所有值均为字符串) */
export type CsvRow = Record<string, string>

/** CSV 导出的数据行 */
export type CsvRecord = Record<string, string | number>

/** 支持的分隔符 */
const SEPARATORS = [',', ';', '\t'] as const

/** 取全文中出现次数最多的分隔符 (与 csvjson-csv2json 的 detectSeparator 一致, 平局取靠前者) */
function detectSeparator(text: string): string {
  let result: string = SEPARATORS[0]
  let max = -1
  SEPARATORS.forEach(separator => {
    const count = text.split(separator).length - 1
    if (count > max) {
      max = count
      result = separator
    }
  })
  return result
}

/** 按分隔符与 RFC4180 规则切分为二维数组 (不 trim, 由调用方处理) */
function splitRows(text: string, separator: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    // 引号字段内原样保留, "" 转义为单个 "
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"'
          i++
        } else {
          quoted = false
        }
      } else {
        cell += char
      }
      continue
    }

    // 仅在单元格起始处进入引号字段
    if (char === '"' && !cell) {
      quoted = true
      continue
    }

    if (char === separator) {
      row.push(cell)
      cell = ''
      continue
    }

    if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      cell = ''
      rows.push(row)
      row = []
      continue
    }

    cell += char
  }

  // 无换行结尾的最后一行 (避免尾部换行产生多余的空行)
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }

  return rows
}

/**
 * 解析 CSV 文本为对象数组
 * - 首行为表头
 * - 缺列补空字符串, 多余列忽略, 单元格 trim
 * - 全空行跳过
 * - 空文本或无表头时抛出异常 (调用方负责 catch)
 */
export function parseCsv(text: string): CsvRow[] {
  if (!text || !text.trim()) throw new Error('Empty CSV')

  const source = text.replace(/^\uFEFF/, '')
  const rows = splitRows(source, detectSeparator(source))
  if (!rows.length) throw new Error('Empty CSV')

  const [heads, ...lines] = rows
  if (!heads.length || heads.every(head => !head.trim())) {
    throw new Error('Could not detect header')
  }

  const keys = heads.map(head => head.trim())

  return lines
    .filter(cells => cells.some(cell => cell.trim() !== ''))
    .map(cells => {
      const row: CsvRow = {}
      keys.forEach((key, index) => {
        row[key] = (cells[index] || '').trim()
      })
      return row
    })
}

/**
 * 生成 CSV 文本
 * - 表头与字符串值恒加引号, " 转义为 "" (兼容历史导出文件的再导入)
 * - 数字不加引号, null / undefined 输出空
 * - 行间 \n 连接, 无尾部换行, 无 BOM
 */
export function toCsv(heads: readonly string[], rows: CsvRecord[]): string {
  const escape = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return ''
    if (typeof value === 'number') return String(value)
    return `"${String(value).replace(/"/g, '""')}"`
  }

  return [heads, ...rows.map(row => heads.map(head => row[head]))]
    .map(cells => cells.map(escape).join(','))
    .join('\n')
}
