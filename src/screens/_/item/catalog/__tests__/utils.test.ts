/*
 * @Author: czy0729
 * @Date: 2026-09-26 22:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 23:22:58
 */
import {
  getCatalogCount,
  getCatalogData,
  getCatalogDesc,
  getCatalogName,
  getCatalogTitle,
  isBadCatalog
} from '../utils'

import type { CatalogDetail, CatalogDetailFromOSS } from '@stores/discovery/types'

// 测试只关心判定用到的字段, 其余字段以最小值补齐
const detail = {
  _loaded: true,
  list: [{ id: 1 }],
  title: '详情'
} as CatalogDetail

const oss = {
  _loaded: true,
  total: 3,
  title: '快照'
} as CatalogDetailFromOSS

describe('getCatalogCount', () => {
  it('全部未传时总数为 0 且无最高类型', () => {
    const result = getCatalogCount({})
    expect(result.total).toBe(0)
    expect(result.typeCn).toBeUndefined()
  })

  it('统计各类型条目数总和', () => {
    const result = getCatalogCount({ anime: 3, book: 2, game: 1 })
    expect(result.total).toBe(6)
  })

  it('占比最高的类型中文名', () => {
    const result = getCatalogCount({ anime: 1, book: 5 })
    expect(result.typeCn).toBe('书籍')
  })

  it('同票时表中靠前的类型胜出 (anime 先于 book)', () => {
    const result = getCatalogCount({ book: 2, anime: 2 })
    expect(result.typeCn).toBe('动画')
  })

  it('undefined 与 0 等价', () => {
    expect(getCatalogCount({ anime: undefined }).total).toBe(0)
    expect(getCatalogCount({ anime: 0 }).total).toBe(0)
  })
})

describe('getCatalogData', () => {
  it('本地详情有内容时优先', () => {
    expect(getCatalogData(detail, oss)).toBe(detail)
  })

  it('详情为空但快照已加载时用快照', () => {
    expect(getCatalogData({ ...detail, list: [] } as CatalogDetail, oss)).toBe(oss)
  })

  it('详情未加载时用快照', () => {
    expect(getCatalogData({ ...detail, _loaded: false } as CatalogDetail, oss)).toBe(oss)
  })

  it('都未加载时回落详情 (渲染加载前状态)', () => {
    const unloadedDetail = { ...detail, _loaded: false } as CatalogDetail
    const unloadedOss = { ...oss, _loaded: false } as CatalogDetailFromOSS
    expect(getCatalogData(unloadedDetail, unloadedOss)).toBe(unloadedDetail)
  })
})

describe('isBadCatalog', () => {
  const base = {
    isUser: true,
    userId: 123,
    selfIds: ['456'],
    listLength: 0,
    ossTotal: 0,
    detailLoaded: true,
    ossLoaded: false
  }

  it('别人创建且确认无条目时为坏目录', () => {
    expect(isBadCatalog(base)).toBe(true)
  })

  it('[问题] 自己创建的不受影响 (数字 Id 与字符串 Id 等价比较)', () => {
    expect(isBadCatalog({ ...base, selfIds: ['123'] })).toBe(false)
    expect(isBadCatalog({ ...base, selfIds: ['123'], userId: '123' })).toBe(false)
  })

  it('非用户目录模式不判定', () => {
    expect(isBadCatalog({ ...base, isUser: false })).toBe(false)
  })

  it('详情有条目时不是坏目录', () => {
    expect(isBadCatalog({ ...base, listLength: 2 })).toBe(false)
  })

  it('云快照有总数时不是坏目录', () => {
    expect(isBadCatalog({ ...base, ossTotal: 8 })).toBe(false)
  })

  it('[问题] 详情与快照都未加载时不能判定 (避免加载前误杀)', () => {
    expect(isBadCatalog({ ...base, detailLoaded: false, ossLoaded: false })).toBe(false)
  })
})

describe('getCatalogName', () => {
  it('优先使用条目上的名称', () => {
    expect(getCatalogName('a', 'b', 'c')).toBe('a')
  })

  it('依次回退到编纂者名称与详情昵称', () => {
    expect(getCatalogName(undefined, 'b', 'c')).toBe('b')
    expect(getCatalogName(undefined, undefined, 'c')).toBe('c')
  })

  it('解码 HTML 实体', () => {
    expect(getCatalogName('&lt;名字&gt;')).toBe('<名字>')
  })
})

describe('getCatalogTitle', () => {
  it('优先使用条目上的标题', () => {
    expect(getCatalogTitle('传入', '详情')).toBe('传入')
  })

  it('回退到详情标题并解码', () => {
    expect(getCatalogTitle(undefined, 'A &amp; B')).toBe('A & B')
  })
})

describe('getCatalogDesc', () => {
  it('依次取 info / content / ossInfo', () => {
    expect(getCatalogDesc('a', 'b', 'c')).toBe('a')
    expect(getCatalogDesc(undefined, 'b', 'c')).toBe('b')
    expect(getCatalogDesc(undefined, undefined, 'c')).toBe('c')
  })

  it('去除 HTML 标签并解码实体', () => {
    expect(getCatalogDesc('<b>你好 &amp; 再见</b>')).toBe('你好 & 再见')
  })

  it('换行折叠为空格', () => {
    expect(getCatalogDesc('第一行\n第二行\r\n第三行')).toBe('第一行 第二行 第三行')
  })

  it('[问题] 无效值返回空串而非字符串 undefined', () => {
    expect(getCatalogDesc(undefined, undefined, undefined)).toBe('')
  })
})
