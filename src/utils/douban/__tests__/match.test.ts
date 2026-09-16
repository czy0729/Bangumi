/*
 * @Author: czy0729
 * @Date: 2026-09-17 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 14:00:00
 */
/** xhrTimeout 是 xhrCustom 的薄封装, 实现走同文件引用, 这里补一份同构的走 mock */
jest.mock('../../fetch', () => {
  const xhrCustom = jest.fn()
  return {
    xhrCustom,
    xhrTimeout: (url: string, timeout: number = 8000, headers?: Record<string, string>) => {
      let timer: ReturnType<typeof setTimeout> | undefined
      return Promise.race([
        xhrCustom({ url, headers }),
        new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => reject(new Error('xhr timeout')), timeout)
        })
      ]).finally(() => clearTimeout(timer))
    }
  }
})
jest.mock('../../thirdParty/html', () => ({ cheerio: jest.fn() }))

import { matchMovie } from '../index'
import { getSeason, hasSeasonConflict } from '../season'

import type { SearchItem } from '../types'

/** 候选构造: [id, title, name, year], index 取下标 (口径与 search() 输出一致, 已归一化) */
const rows = (...items: [string, string, string, string?][]): SearchItem[] =>
  items.map(([id, title, name, year], index) => ({ id, title, name, year, index }))

/** 真实搜索快照: 无职转生 (第三季 / 第二季×2 / 第一季 / 第一季第二部 / OVA) */
const MUGEN = rows(
  ['35460732', '无职转生ⅲ 到了异世界就拿出真本事', '無職転生ⅲ ～異世界行ったら本気だす～', '2026'],
  [
    '35460731',
    '无职转生ⅱ 到了异世界就拿出真本事 part.1',
    '無職転生ⅱ ～異世界行ったら本気だす～',
    '2023'
  ],
  [
    '35306636',
    '无职转生到了异世界就拿出真本事 part.2',
    '無職転生～異世界行ったら本気だす～ 第2クール',
    '2021'
  ],
  [
    '36576576',
    '无职转生ⅱ 到了异世界就拿出真本事 part 2',
    '無職転生ⅱ ～異世界行ったら本気だす～ 第2クール',
    '2024'
  ],
  ['30513783', '无职转生到了异世界就拿出真本事', '無職転生～異世界行ったら本気だす～', '2021'],
  [
    '35775699',
    '无职转生到了异世界就拿出真本事 ova',
    '無職転生～異世界行ったら本気だす～ ova',
    '2022'
  ]
)

/** 真实搜索快照: 译名差异 (第一条是目标 2026, 第二条标题更像但 2006) */
const WARLOCK = rows(['1', '我独自盗墓', '도굴왕', '2026'], ['2', '盗墓王', '盗墓王', '2006'])
const WARLOCK_OLD = rows(['1', '我独自盗墓', '도굴왕', '2020'], ['2', '盗墓王', '盗墓王', '2006'])
const ROCKY = rows(['2', 'rocky', 'rocky', '1976'], ['1', 'rocky iv', 'rocky iv', '1985'])

const Q = '无职转生 第三季 ～到了异世界就拿出真本事～'
const JP = '無職転生Ⅲ ～異世界行ったら本気だす～'
const Q1 = '无职转生～到了异世界就拿出真本事～'
const JP1 = '無職転生～異世界行ったら本気だす～'

const REZERO_Q = 'Re：从零开始的异世界生活 第四季 夺还篇'
const REZERO_JP = 'Re:ゼロから始める異世界生活 4th season 奪還編'

/**
 * 新版搜索快照 (2026-09-17): 13 条候选, 正传第四季排首位
 *  - 原始标题是拼接串 (中文名 + 空格 + 原名 + 年份), 此处已拆为 title / name
 *  - 顺序即接口顺序, 不可重排: 季数优先层是先到先得
 * */
const REZERO_NEW = rows(
  ['37295319', 'Re：从零开始的异世界生活 第四季', 'Re:ゼロから始める異世界生活 4th season', '2026'],
  ['30353116', 'Re：从零开始的异世界生活 第二季', 'Re:ゼロから始める異世界生活 2nd season', '2020'],
  [
    '35213072',
    'Re：从零开始的异世界生活 第二季 Part.2',
    'Re:ゼロから始める異世界生活 2nd season Part.2',
    '2021'
  ],
  [
    '27140066',
    'Re：从零开始的异世界生活 雪之回忆',
    'Re:ゼロから始める異世界生活 Memory Snow',
    '2018'
  ],
  ['27607434', 'Re：从零开始的异世界生活 冰结之绊', 'Re:ゼロから始める異世界生活 氷結の絆', '2019'],
  ['37028312', 'Re：从零开始的异世界生活 第三季', 'Re:ゼロから始める異世界生活 3rd season', '2024'],
  [
    '35863312',
    'Re：从零开始的异世界生活 第二季 骑士授勋仪式 UTAGE',
    'Re:ゼロから始める異世界生活 2nd season 騎士叙勲式 UTAGE',
    '2021'
  ],
  [
    '38405075',
    'Re：从零开始的休息时间 第四季',
    'Re:ゼロから始める休憩時間（ブレイクタイム）4th season',
    '2026'
  ],
  ['34937942', 'Re：从零开始的异世界生活 新编集版', 'Re:ゼロから始める異世界生活 新編集版', '2020'],
  ['35138514', 'Re：从零开始的休息时间 第二季', 'Re:ゼロから始める休憩時間 2nd season', '2020'],
  ['37227558', '四方极爱2', 'เซ็ตพี่หมอ II', '2025'],
  [
    '36035908',
    '异世界居酒屋阿信 第三季～皇帝与欧利亚的公主篇～',
    '異世界居酒屋『のぶ』Season3～皇帝とオイリアの王女編～',
    '2023'
  ],
  [
    '38543008',
    '从Lv2开始开外挂的前勇者候补过着悠哉异世界生活 第2季',
    'Lv2からチートだった元勇者候補のまったり異世界ライフ 第2期',
    '2027'
  ]
)

/** [说明, 查询词, 原名, 年份, 候选集, 期望命中 id] */
const MOVIE_CASES: [string, string, string, string, SearchItem[], string][] = [
  ['季数: 年份一致命中第三季', Q, JP, '2026', MUGEN, '35460732'],
  ['季数: 年份为空命中第三季', Q, JP, '', MUGEN, '35460732'],
  ['季数: 年份错位到第二季仍命中第三季', Q, JP, '2023', MUGEN, '35460732'],
  ['无季数: 第一季维持原有匹配', Q1, JP1, '2021', MUGEN, '30513783'],
  ['无季数: 年份缺失仍可命中', Q1, JP1, '', MUGEN, '30513783'],
  ['译名差异: 标题更像但年份不符的不抢占', '盗墓王', '盗掘王', '2026', WARLOCK, '1'],
  ['译名差异: 年份缺失时保持原有行为', '盗墓王', '盗掘王', '', WARLOCK, '2'],
  ['译名差异: 无年份一致候选时回退备用', '盗墓王', '盗掘王', '2026', WARLOCK_OLD, '2'],
  ['罗马数字: 优先命中季数一致的候选', 'Rocky IV', 'Rocky IV', '1985', ROCKY, '1'],
  /** 新版源: 目标正传第四季在首位, 季数优先层直接命中 */
  ['新版源: 目标在首位时命中正传第四季', REZERO_Q, REZERO_JP, '2026', REZERO_NEW, '37295319']
]

/** [输入, 期望季数] */
const SEASON_CASES: [string | undefined, number][] = [
  ['无职转生 第三季 ～到了异世界就拿出真本事～', 3],
  ['某番 第10季', 10],
  ['無職転生Ⅲ ～異世界行ったら本気だす～', 3],
  ['無職転生ⅲ ～異世界行ったら本気だす～', 3],
  ['Rocky IV', 4],
  ['Final Fantasy VII', 7],
  ['Season 2', 2],
  ['無職転生～異世界行ったら本気だす～ 第2クール', 0],
  ['无职转生：到了异世界就拿出真本事 Part.2', 0],
  ['某番 第12话', 0],
  ['無職転生～異世界行ったら本気だす～ OVA', 0],
  ['', 0],
  [undefined, 0]
]

/** [a, b, 是否冲突] */
const CONFLICT_CASES: [number, number, boolean][] = [
  [3, 0, false],
  [0, 2, false],
  [0, 0, false],
  [4, 0, false],
  [0, 7, false],
  [3, 2, true],
  [3, 3, false]
]

describe('matchMovie', () => {
  it.each(MOVIE_CASES)('%s', (_name, q, jp, year, result, id) => {
    expect(matchMovie(q, result, jp, year)).toBe(id)
  })
})

describe('getSeason', () => {
  it.each(SEASON_CASES)('getSeason(%s) = %i', (str, season) => {
    expect(getSeason(str)).toBe(season)
  })
})

describe('hasSeasonConflict', () => {
  it.each(CONFLICT_CASES)('hasSeasonConflict(%i, %i) = %s', (a, b, conflict) => {
    expect(hasSeasonConflict(a, b)).toBe(conflict)
  })
})
