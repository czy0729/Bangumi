/*
 * @Author: czy0729
 * @Date: 2026-09-28 20:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 20:00:00
 *
 * OSS 条目快照提炼逻辑单测
 */
import { normalizeOssSubject, OSS_SUBJECT_PICKER } from '../utils'

import type { OssSubject } from '../../types'

const TS = 1727500000

const staff = (name: string, desc: string, nameJP?: string) =>
  ({
    name,
    desc,
    ...(nameJP ? { nameJP } : {})
  } as OssSubject['staff'][number])

describe('normalizeOssSubject', () => {
  test('info 带属性标签时正则可命中放送开始', () => {
    const entry = normalizeOssSubject(
      {
        name: 'test',
        info: '<ul><li class="sub"><span class="tip">放送开始: </span>2023-04-08</li></ul>'
      },
      TS
    )
    expect(entry.date).toBe('2023-04-08')
    expect(entry.info).toBeUndefined()
  })

  test('命中发售日 / 上映时间 / 上映年度', () => {
    const entry = normalizeOssSubject({ info: '<li><span>发售日: </span>2011-07-29</li>' }, TS)
    expect(entry.date).toBe('2011-07-29')
  })

  test('info 无命中时 date 为空串, 再由 tags 兜底', () => {
    const entry = normalizeOssSubject(
      {
        info: '<li><span>其他: </span>x</li>',
        tags: [{ name: '治愈' }, { name: '2023年4月' }, { name: '2023' }]
      },
      TS
    )
    expect(entry.date).toBe('2023年4月')
  })

  test('tags 兜底优先年月, 其次年份', () => {
    const entry = normalizeOssSubject({ tags: [{ name: '2023' }, { name: '2022年1月' }] }, TS)
    expect(entry.date).toBe('2022年1月')

    const entry2 = normalizeOssSubject({ tags: [{ name: '科幻' }, { name: '2019' }] }, TS)
    expect(entry2.date).toBe('2019')
  })

  test('无 info 无 tags 时 date 不产出', () => {
    const entry = normalizeOssSubject({ name: 'test' }, TS)
    expect('date' in entry).toBe(false)
  })

  test('原作与导演取自 staff, name 缺失时降级 nameJP', () => {
    const entry = normalizeOssSubject(
      {
        staff: [staff('原作者', '原作'), staff('导演甲', '导演', 'director-jp')]
      },
      TS
    )
    expect(entry.origin).toBe('原作者')
    expect(entry.director).toBe('导演甲')
  })

  test('导演缺失时按 作者 / 开发 / 音乐 降级', () => {
    const entry = normalizeOssSubject({ staff: [staff('开发者', '开发')] }, TS)
    expect(entry.origin).toBe('')
    expect(entry.director).toBe('开发者')
  })

  test('staff 全部缺失时原作与导演为空串', () => {
    const entry = normalizeOssSubject({ staff: [staff('某人', '脚本')] }, TS)
    expect(entry.origin).toBe('')
    expect(entry.director).toBe('')
  })

  test('中间字段 info / tags / staff 被删除, 展示字段保留', () => {
    const entry = normalizeOssSubject(
      {
        name: '名字',
        name_cn: '中文名',
        rank: 10,
        rating: { score: 8.1, total: 1000 },
        totalEps: 12,
        info: '<li><span>放送开始: </span>2023-04-08</li>',
        tags: [{ name: '2023年4月' }],
        staff: [staff('原作者', '原作')],
        extra: '不应保留'
      } as OssSubject,
      TS
    )
    expect('info' in entry).toBe(false)
    expect('tags' in entry).toBe(false)
    expect('staff' in entry).toBe(false)
    expect('extra' in entry).toBe(false)
    expect(entry).toEqual({
      name: '名字',
      name_cn: '中文名',
      rank: 10,
      rating: { score: 8.1, total: 1000 },
      totalEps: 12,
      date: '2023-04-08',
      origin: '原作者',
      director: '',
      _loaded: TS
    })
  })

  test('不修改入参对象', () => {
    const raw = { info: '<li><span>放送开始: </span>2023-04-08</li>' } as OssSubject
    normalizeOssSubject(raw, TS)
    expect('date' in raw).toBe(false)
    expect('info' in raw).toBe(true)
  })

  test('picker 覆盖全部原始字段', () => {
    expect(OSS_SUBJECT_PICKER).toEqual([
      'name',
      'name_cn',
      'image',
      'rank',
      'rating',
      'totalEps',
      'info',
      'staff',
      'tags'
    ])
  })
})
