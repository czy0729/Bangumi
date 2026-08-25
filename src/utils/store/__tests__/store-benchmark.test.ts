/*
 * Store V1 / V2 性能基准对比
 * 运行: BENCH=1 npx jest src/utils/store/__tests__/store-benchmark.test.ts
 * @Author: czy0729
 * @Date: 2026-08-23 14:30:00
 */
import { observable, toJS } from 'mobx'
import StoreModern from '../index'
import LegacyStore from '../legacy'

// 覆盖 jest.setup.js 的精简 mobx mock, 使用真实实现
jest.mock('mobx', () => jest.requireActual('mobx'))

const FIXED_TS = 1700000000

jest.mock('@src/config', () => ({
  __esModule: true,
  DEV: false
}))

const mockFetch = jest.fn()

jest.mock('../../fetch', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockFetch(...args),
  queue: (fns: (() => unknown)[]) => Promise.all(fns.map(fn => fn()))
}))

const mockFetchSubjectV0 = jest.fn()

jest.mock('../../fetch.v0', () => ({
  __esModule: true,
  fetchSubjectV0: (...args: unknown[]) => mockFetchSubjectV0(...args)
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockSetStorage = jest.fn((_key: string, _data: unknown) => Promise.resolve())
const mockStorageMap = new Map<string, unknown>()

jest.mock('../../storage', () => ({
  __esModule: true,
  setStorage: (key: string, data: unknown) => {
    mockStorageMap.set(key, data)
    return mockSetStorage(key, data)
  }
}))

jest.mock('../../storage/utils', () => ({
  __esModule: true,
  getItem: (key: string) =>
    Promise.resolve(mockStorageMap.has(key) ? JSON.stringify(mockStorageMap.get(key)) : null)
}))

jest.mock('../../utils', () => ({
  __esModule: true,
  getTimestamp: () => FIXED_TS,
  omit: (obj: Record<string, unknown>, keys: string[]) => {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  }
}))

jest.mock('@constants/constants', () => ({
  ...jest.requireActual('@constants/constants'),
  LIST_EMPTY: {
    list: [],
    pagination: { page: 0, pageTotal: 0 },
    _list: []
  }
}))

/** 单条条目的模拟载荷(嵌套深度接近真实接口) */
const makeItem = (id: number) => ({
  id,
  name: `条目${id}`,
  nameCn: `条目中文名${id}`,
  summary: '简介'.repeat(60),
  date: '2026-08-23',
  images: {
    common: `https://lain.bgm.tv/pic/cover/c/${id}.jpg`,
    medium: `https://lain.bgm.tv/pic/cover/m/${id}.jpg`,
    large: `https://lain.bgm.tv/pic/cover/l/${id}.jpg`,
    grid: `https://lain.bgm.tv/pic/icon/g/${id}.jpg`
  },
  rating: {
    score: 7.5,
    total: 1000 + id,
    rank: id,
    details: { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 }
  },
  tags: [
    { name: 'tag1', count: id },
    { name: 'tag2', count: id * 2 }
  ],
  collection: { wish: id, collect: id, doing: id, on_hold: id, dropped: id }
})

const ITEM_COUNT = 1500
const WARMUP = 10
const RUNS = 30

const makePayload = () => ({
  list: Array.from({ length: ITEM_COUNT }, (_, index) => makeItem(index)),
  pagination: { page: 1, pageTotal: 9 },
  _list: []
})

const hrMs = () => Number(process.hrtime.bigint()) / 1e6

/** 预热后多次测量取中位数 */
const measure = async (fn: () => Promise<unknown>) => {
  for (let i = 0; i < WARMUP; i += 1) await fn()

  const times: number[] = []
  for (let i = 0; i < RUNS; i += 1) {
    const start = hrMs()
    await fn()
    times.push(hrMs() - start)
  }
  times.sort((a, b) => a - b)
  return times[Math.floor(times.length / 2)]
}

const measureSync = (fn: () => unknown) => {
  for (let i = 0; i < WARMUP; i += 1) fn()

  const times: number[] = []
  for (let i = 0; i < RUNS; i += 1) {
    const start = hrMs()
    fn()
    times.push(hrMs() - start)
  }
  times.sort((a, b) => a - b)
  return times[Math.floor(times.length / 2)]
}

/** 基准用实例的类型化视图 */
type BenchState = {
  subject: {
    list: {
      rating: { total: number }
      tags: unknown[]
      collection: { wish: number }
      images: { common: string }
    }[]
  }
}

type BenchStore = {
  state: BenchState
  fetch: (...args: unknown[]) => Promise<unknown>
}

const bench = process.env.BENCH ? it : it.skip

describe('V1 / V2 性能基准', () => {
  bench(
    'fetch 入库 / 深读取 / toJS 对比',
    async () => {
      // 两版各自独立载荷池, 避免互相污染
      const poolV1 = Array.from({ length: WARMUP + RUNS }, makePayload)
      const poolV2 = Array.from({ length: WARMUP + RUNS }, makePayload)

      // ---------- 1. fetch 入库 ----------
      const v1 = new LegacyStore(
        observable({ subject: {}, loading: false })
      ) as unknown as BenchStore
      const v2 = new StoreModern(
        observable({ subject: {}, loading: false })
      ) as unknown as BenchStore

      let cursorV1 = 0
      let cursorV2 = 0

      const ingestV1 = async () => {
        mockFetch.mockResolvedValueOnce(poolV1[cursorV1])
        cursorV1 += 1
        await v1.fetch('https://api/list', 'subject', { list: true })
      }
      const ingestV2 = async () => {
        mockFetch.mockResolvedValueOnce(poolV2[cursorV2])
        cursorV2 += 1
        await v2.fetch('https://api/list', 'subject', { list: true })
      }

      const ingest1 = await measure(ingestV1)
      const ingest2 = await measure(ingestV2)

      // ---------- 2. 深读取遍历(模拟渲染数据准备) ----------
      const walk = (store: { state: BenchState }) => {
        let sum = 0
        const data = store.state.subject
        const { list } = data
        for (let i = 0; i < list.length; i += 1) {
          const item = list[i]
          sum += item.rating.total
          sum += item.tags.length
          sum += item.collection.wish
          sum += item.images.common.length
        }
        return sum
      }

      const read1 = measureSync(() => walk(v1))
      const read2 = measureSync(() => walk(v2))

      // 内容一致性校验: 确保对比建立在相同数据之上
      expect(walk(v1)).toBe(walk(v2))

      // ---------- 3. toJS 全量导出 ----------
      // 注意: V2 数据为原始对象, toJS 直通返回不做克隆
      const export1 = measureSync(() => toJS(v1.state.subject))
      const export2 = measureSync(() => toJS(v2.state.subject))

      const row = (name: string, a: number, b: number) =>
        `${name.padEnd(18)} V1 ${a.toFixed(2).padStart(8)}ms   V2 ${b
          .toFixed(2)
          .padStart(8)}ms   V2 快 ${(a / b).toFixed(1)}x`

      // eslint-disable-next-line no-console
      console.log(
        [
          '',
          `载荷 ${ITEM_COUNT} 条, 预热 ${WARMUP} 次, 计时 ${RUNS} 次取中位数`,
          '--------------------------------------------------------',
          row('fetch 入库', ingest1, ingest2),
          row('深读取遍历', read1, read2),
          row('toJS 导出(V2 直通)', export1, export2),
          '--------------------------------------------------------'
        ].join('\n')
      )

      expect(ingest1).toBeGreaterThan(0)
    },
    600000
  )
})
