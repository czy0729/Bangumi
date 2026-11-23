/*
 * @Author: czy0729
 * @Date: 2026-11-23 05:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-23 22:08:11
 *
 * vendor 文件与上游 react-native-render-html@4.1.1 的导出符号/常量内容守卫, 以及本地导出的行为基线
 * 上游包为 devDependency, --omit=dev 安装时本文件的守卫会失败
 */
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { generateDefaultBlockStyles, generateDefaultTextStyles } from '../html-default-styles'
import { cssObjectToString, cssStringToObject, cssStringToRNStyle } from '../html-styles'
import { STYLESETS, TextOnlyPropTypes } from '../html-utils'

const VENDOR_DIR = join(__dirname, '..')
const UPSTREAM_PKG = 'react-native-render-html'

/** [vendor 文件, 上游同名文件] */
const FILE_PAIRS: [string, string][] = [
  ['html-utils.ts', 'HTMLUtils.js'],
  ['html-styles.ts', 'HTMLStyles.js'],
  ['html-default-styles.ts', 'HTMLDefaultStyles.js'],
  ['html-image.tsx', 'HTMLImage.js']
]

/** 上游包目录, devDependency 移除后返回 null */
function getUpstreamDir(): string | null {
  try {
    return dirname(require.resolve(`${UPSTREAM_PKG}/package.json`))
  } catch {
    return null
  }
}

function read(file: string): string {
  return readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
}

/** 提取运行时导出名 (类型与接口不参与对比) */
function getExportNames(source: string): string[] {
  const names = new Set<string>()
  for (const match of source.matchAll(
    /^export\s+(?:default\s+)?(?:function|class|const|let)\s+(\w+)/gm
  )) {
    names.add(match[1])
  }
  for (const match of source.matchAll(/^export\s*\{([^}]*)\}/gm)) {
    match[1].split(',').forEach(item => {
      const name = item
        .trim()
        .split(/\s+as\s+/)
        .pop()
      if (name) names.add(name)
    })
  }

  return [...names].sort()
}

/** 需要内容级比对的常量 (vendor 与上游同名) */
const CONST_NAMES = [
  'ImageStylePropTypes',
  'ViewStylePropTypes',
  'TextStylePropTypes',
  'BLOCK_TAGS',
  'TEXT_TAGS',
  'PREFORMATTED_TAGS',
  'MIXED_TAGS',
  'TEXT_TAGS_IGNORING_ASSOCIATION',
  'PERC_SUPPORTED_STYLES'
]

const upstreamDir = getUpstreamDir()

/** 上游包目录, 缺失说明 devDependency 被移除, 一致性守卫已失效 */
function upstreamPath(...segments: string[]): string {
  if (!upstreamDir) throw new Error(`${UPSTREAM_PKG} 未安装, 无法执行 vendor 一致性守卫`)

  return join(upstreamDir, ...segments)
}

/**
 * 取 `const NAME = ...` 到下一个顶层声明之间的字符串字面量
 * 只比对内容, 不依赖两侧的格式与类型标注
 */
function getConstStringLiterals(source: string, name: string): string[] {
  const start = source.indexOf(`const ${name}`)
  if (start === -1) return []

  const rest = source.slice(start + name.length + 6)
  const end = rest.search(/\n(?:export )?(?:const|function|interface|type|let) /)
  const body = end === -1 ? rest : rest.slice(0, end)

  return [...body.matchAll(/'([^']*)'/g)].map(match => match[1])
}

describe('vendor 与上游 4.1.1 一致', () => {
  test('上游包可解析', () => {
    expect(upstreamDir).not.toBeNull()
  })

  test.each(FILE_PAIRS)('%s 导出的成员与 %s 相同', (vendorFile: string, upstreamFile: string) => {
    const vendorNames = getExportNames(read(join(VENDOR_DIR, vendorFile)))
    const upstreamNames = getExportNames(read(upstreamPath('src', upstreamFile)))

    expect(vendorNames).toEqual(upstreamNames)
  })

  test.each(CONST_NAMES)('%s 的内容与上游相同', (name: string) => {
    const upstreamValues = getConstStringLiterals(read(upstreamPath('src', 'HTMLUtils.js')), name)

    expect(upstreamValues.length).toBeGreaterThan(0)
    expect(getConstStringLiterals(read(join(VENDOR_DIR, 'html-utils.ts')), name)).toEqual(
      upstreamValues
    )
  })

  test('IGNORED_TAGS 在上游基础上补充 script/style', () => {
    const upstreamValues = getConstStringLiterals(
      read(upstreamPath('src', 'HTMLUtils.js')),
      'IGNORED_TAGS'
    )

    expect(upstreamValues.length).toBeGreaterThan(0)
    expect(
      getConstStringLiterals(read(join(VENDOR_DIR, 'html-utils.ts')), 'IGNORED_TAGS').sort()
    ).toEqual([...upstreamValues, 'script', 'style'].sort())
  })
})

describe('vendor 行为基线', () => {
  test('STYLESETS 为冻结的三个 style set', () => {
    expect({ ...STYLESETS }).toEqual({ VIEW: 'view', TEXT: 'text', IMAGE: 'image' })
    expect(Object.isFrozen(STYLESETS)).toBe(true)
  })

  test('TextOnlyPropTypes 只保留 Text 独有项', () => {
    expect(TextOnlyPropTypes).toContain('fontSize')
    expect(TextOnlyPropTypes).toContain('lineHeight')
    expect(TextOnlyPropTypes).not.toContain('position')
  })

  test('css 字符串与对象互转', () => {
    expect(cssStringToObject('color:red; font-size:12px;')).toEqual({
      color: 'red',
      'font-size': '12px'
    })
    expect(cssObjectToString({ color: 'red' })).toBe('color:red;')
  })

  test('cssStringToRNStyle 剥离 !important 并换算单位', () => {
    expect(
      cssStringToRNStyle('color:red!important; text-align:center!important', STYLESETS.TEXT)
    ).toEqual({ color: 'red', textAlign: 'center' })
    expect(cssStringToRNStyle('font-size:x-large!important', STYLESETS.TEXT)).toEqual({
      fontSize: 20
    })
    expect(cssStringToRNStyle('margin-top:20px', STYLESETS.VIEW)).toEqual({ marginTop: 20 })
  })

  test('默认块级与文本样式以 baseFontSize 为基准', () => {
    expect(generateDefaultBlockStyles(8).ul).toEqual({ paddingLeft: 20, marginBottom: 8 })
    expect(generateDefaultTextStyles(16).h1.fontSize).toBe(32)
    expect(generateDefaultTextStyles(16).p).toEqual({ marginTop: 16, marginBottom: 16 })
  })
})
