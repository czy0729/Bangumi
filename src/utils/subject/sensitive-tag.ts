/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-09 06:13:01
 *
 * 敏感标签判断 (公共, 各找XX频道渲染标签时共用)
 *  - 词表收敛自本目录下全部频道实际在用的 tag:
 *    manga(TAGS) / anime(TAGS) / game(TAGS) / adv(TAGS) / music(TAGS) / real(TAGS) /
 *    wenku(TAGS) / hentai(CHARA + JOB + BODY + CONTENT), nsfw 频道无标签词表
 *  - 交叉校验语料: typerank 五类 9049 条 + 上述 ds 词表 828 条 = 9877 条, 零连带命中
 *  - 「生肉」为无字幕资源义, 不在列; BL / 百合 / 耽美 / 后宫 为题材义, 不在列
 *  - 增删任何一档都必须重跑 __tests__/sensitive-tag.test.ts (命中集合与人工确认清单需完全一致)
 */

/**
 * 敏感标签词 (小写子串包含匹配)
 *  - 本档每一项都必须保证: 在全量标签语料里只命中自身与语义等价的少数派写法,
 *    凡会连带命中正常标签的词 (如 肉 → 肉鸽/生肉) 一律移到下面两档
 */
export const SENSITIVE_TAG_WORDS = [
  /** 分级 */
  'r18',
  'r-18',
  '18x',
  '18+',
  '18禁',
  '4x',
  'r15',
  'bdsm',
  'nsfw',
  'hentai',
  'porn',
  'sex',
  '色情',
  '情色',
  '性描写',
  '无码',
  '有码',
  '露出',
  /** 语料既有 */
  '成年コミック',
  'エロ',
  '工口',
  '本子',
  '里番',
  '肉番',
  '巨乳',
  '萝莉',
  '卖肉',
  '人妻',
  '乳摇',
  '成人漫画',
  '成人向',
  '限制',
  '性癖',
  '乱伦',
  '出轨',
  '乱交',
  '监禁',
  '背德',
  '师生恋',
  '妹控',
  '兄控',
  '姐控',
  '足控',
  '幼驯染',
  '拔作',
  '黄油',
  '打飞机',
  '痴女',
  '痴汉',
  '扶他',
  '近亲',
  '逆强制',
  '口交',
  '乳交',
  '肛交',
  '脚交',
  '群交',
  '内射',
  '颜射',
  '肉便器',
  '自慰',
  '喷奶',
  '放尿',
  '阿嘿颜',
  '精神控制',
  '凌辱',
  '调教',
  '触手产物'
] as const

/**
 * 整串相等匹配 (子串会连带命中正常标签)
 *  - 肉 → 肉鸽 / 生肉 / 行尸走肉 / 肉片
 *  - 变态 → 变态王子与不笑猫
 *  - 正太 → 得能正太郎 (漫画家)
 *  - 触手 → 触手猴 (音乐标签)
 *  - 强制 → 强制冷静
 */
const SENSITIVE_TAG_EXACT = new Set(['肉', '变态', '正太', '触手', '强制'])

/**
 * ASCII 短词走单词边界匹配 (子串会连带命中无关标签, 且无法用整串匹配, 否则会漏掉 NTR剧情 这类复合写法)
 *  - ntr → LapinTrack / Ubisoft Montreal (Ubisoft Entertainment)
 *  - sm  → PLAYISM / SMEE / Official髭男dism
 *  - 3p  → d3p
 *  - loli → hololive
 */
const SENSITIVE_TAG_BOUND = /\b(?:ntr|sm|3p)\b|\bloli/i

/** 整串排除: 命中词表但语义为正常作品名 */
const SENSITIVE_TAG_ALLOW = new Set(['エロマンガ先生', 'ブラザーピエロ'])

/** 判断标签是否敏感 */
export function isSensitiveTag(tag: string) {
  const normalized = String(tag || '').toLowerCase()
  if (!normalized) return false
  if (SENSITIVE_TAG_ALLOW.has(normalized)) return false

  if (SENSITIVE_TAG_EXACT.has(normalized)) return true
  if (SENSITIVE_TAG_BOUND.test(normalized)) return true

  return SENSITIVE_TAG_WORDS.some(word => normalized.includes(word))
}
