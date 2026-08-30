/*
 * @Author: czy0729
 * @Date: 2026-08-31 07:34:48
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-31 07:34:48
 */
import { FILTER_CV, FILTER_TAGS } from '../ds'
import {
  getPlainText,
  getSubjectCutList,
  mapSelectedComment,
  rebuildSnapshotSubjects,
  removeSlogan,
  removeSpec
} from '../utils'

import type { CollectionsV0Item, SnapshotSubjectsItem } from '../../types'

/** 构造条目快照 */
function subject(id, fields = {}) {
  return {
    id,
    ...fields
  } as SnapshotSubjectsItem
}

/** 构造收藏条目 */
function collection(id, tags = []) {
  return {
    id,
    name: '',
    cover: '',
    tags,
    score: 0,
    time: '2020-01-01'
  } as CollectionsV0Item
}

describe('getPlainText', () => {
  it('去除 HTML 标签, 默认保留空格', () => {
    expect(getPlainText('<p>hello world</p>', undefined)).toBe('hello world')
  })

  it('max 截断', () => {
    expect(getPlainText('abcdef', 3)).toBe('abc')
  })

  it('空值与非字符串原样返回', () => {
    expect(getPlainText('')).toBe('')
    expect(getPlainText(undefined)).toBe(undefined)
    // [类型定义问题] 类型标注 string, 运行时非字符串原样透传
    expect(getPlainText(123 as unknown as string)).toBe(123)
  })
})

describe('removeSlogan', () => {
  it('去除楼中楼 slogan', () => {
    expect(removeSlogan('不错[来自Bangumi for iOS]')).toBe('不错')
  })

  it('去除删除了回复', () => {
    expect(removeSlogan('删除了回复xxx')).toBe('xxx')
  })

  it('max 截断', () => {
    expect(removeSlogan('abcdef', 2)).toBe('ab')
  })
})

describe('removeSpec', () => {
  it('去除链接', () => {
    expect(removeSpec('看看https://bgm.tv/blog/123 这篇')).toBe('看看 这篇')
    expect(removeSpec('www.example.com')).toBe('')
  })

  it('去除特殊残留字符', () => {
    expect(removeSpec('abc&#;')).toBe('abc')
  })
})

describe('mapSelectedComment', () => {
  it('字段逐一映射, message 经纯文本处理', () => {
    const item = {
      id: 1,
      avatar: '//lain.bgm.tv/pic/user/l/icon.jpg',
      userId: 'foo',
      userName: 'name<',
      time: '2020-01-01'
    }
    expect(mapSelectedComment(item, '<b>内容</b>[来自Bangumi]', '3楼')).toEqual({
      id: 1,
      avatar: item.avatar,
      userId: 'foo',
      userName: 'name<',
      comment: '内容',
      time: '2020-01-01',
      action: '3楼'
    })
  })

  it('action 缺省为 undefined', () => {
    const item = { id: 1, avatar: '', userId: '', userName: '', time: '' }
    expect(mapSelectedComment(item, 'x').action).toBe(undefined)
  })
})

describe('rebuildSnapshotSubjects', () => {
  it('有快照: 重建并剔除冗余字段, 非字符串 image 归空', () => {
    const now = 1000000
    const result = rebuildSnapshotSubjects(
      {
        subject_1: {
          id: 1,
          // [类型定义问题] kv 运行时 image 可能返回非字符串, 生产代码按 typeof 归空
          image: 123 as unknown as string,
          name: '条目',
          name_cn: '条目中文',
          rank: 10,
          tags: [{ name: 'TV', count: '100', meta: false }],
          character: [{ id: 1, name: '角色', nameJP: '', image: '', desc: '主角', actorId: 9 }],
          staff: [
            { id: 2, name: ' Staff', nameJP: '', image: 456 as unknown as string, desc: '导演' }
          ],
          extra: '冗余字段'
        }
      } as Record<string, SnapshotSubjectsItem>,
      now
    )

    expect(Object.keys(result)).toEqual(['1'])
    expect(result[1]).toEqual({
      id: 1,
      image: '',
      name: '条目',
      name_cn: '条目中文',
      rank: 10,
      tags: [{ name: 'TV', count: '100', meta: false }],
      character: [{ id: 1, name: '角色', nameJP: '', image: '', desc: '主角', actorId: 9 }],
      staff: [{ id: 2, name: ' Staff', nameJP: '', image: '', desc: '导演' }],
      _loaded: now
    })
  })

  it('无快照: 仅合并 _loaded, 避免重复请求', () => {
    const now = 1000000
    const result = rebuildSnapshotSubjects({ subject_2: undefined }, now)
    expect(result[2]).toEqual({ _loaded: now })
  })
})

describe('getSubjectCutList', () => {
  it('条目缺失时跳过, 返回空列表', () => {
    const list = getSubjectCutList('标签', '', [404], 'anime', {}, [])
    expect(list).toEqual([])
  })

  it('标签公共: 过滤低频/年份/TV/日本, meta 权重为 value+1', () => {
    const subjects = {
      1: subject(1, {
        tags: [
          { name: 'TV', count: '999', meta: false },
          { name: '日本', count: '999', meta: false },
          { name: '2020年', count: '999', meta: false },
          { name: '低频', count: '10', meta: false },
          { name: '治愈', count: '999', meta: false },
          { name: '萌', count: '999', meta: true }
        ]
      }),
      2: subject(2, {
        tags: [{ name: '治愈', count: '999', meta: false }]
      })
    }

    const list = getSubjectCutList('标签', '', [1, 2], 'anime', subjects, [])
    // 萌 meta: 首次出现 value(2) + 1 = 3; 治愈 两个条目各 1: 首次 2 + 1 = 3, 同频按插入序
    expect(list).toEqual([
      ['治愈', '3'],
      ['萌', '3']
    ])
  })

  it('标签排除公共: meta 标签被排除', () => {
    const subjects = {
      1: subject(1, {
        tags: [
          { name: '治愈', count: '999', meta: false },
          { name: '萌', count: '999', meta: true }
        ]
      })
    }

    const list = getSubjectCutList('标签', '排除公共', [1], 'anime', subjects, [])
    expect(list).toEqual([['治愈', '2']])
  })

  it('标签个人: 按收藏 tags 计数 (每个条目各计一次)', () => {
    const subjects = { 1: subject(1), 2: subject(2) }
    const collections = [collection(1, ['治愈', '日常']), collection(2, ['治愈'])]

    const list = getSubjectCutList('标签', '个人', [1, 2], 'anime', subjects, collections)
    // 每个条目 × 每条含该 tag 的收藏各计一次: 治愈 2 个条目 x 2 = 4, 日常 2 x 1 = 2
    expect(list).toEqual([
      ['治愈', '4'],
      ['日常', '2']
    ])
  })

  it('标签个人: 仅出现一次的被阈值过滤', () => {
    const subjects = { 1: subject(1) }
    const collections = [collection(1, ['日常'])]
    expect(getSubjectCutList('标签', '个人', [1], 'anime', subjects, collections)).toEqual([])
  })

  it('制作人员: 核心职位加权 value+1', () => {
    const subjects = {
      1: subject(1, {
        staff: [
          { id: 1, name: '某人', nameJP: '', image: '', desc: '导演' },
          { id: 2, name: '另一人', nameJP: '', image: '', desc: '脚本' }
        ]
      })
    }

    const list = getSubjectCutList('制作人员', '', [1], 'anime', subjects, [])
    expect(list).toEqual([
      ['某人', '3'],
      ['另一人', '2']
    ])
  })

  it('制作人员: book 且未选职位时排除出版社/杂志', () => {
    const subjects = {
      1: subject(1, {
        staff: [
          { id: 1, name: '某出版社', nameJP: '', image: '', desc: '出版社' },
          { id: 2, name: '某作者', nameJP: '', image: '', desc: '作者' }
        ]
      })
    }

    const list = getSubjectCutList('制作人员', '', [1], 'book', subjects, [])
    expect(list).toEqual([['某作者', '3']])
  })

  it('制作人员: 指定职位时只统计该职位', () => {
    const subjects = {
      1: subject(1, {
        staff: [
          { id: 1, name: '某人', nameJP: '', image: '', desc: '导演' },
          { id: 2, name: '另一人', nameJP: '', image: '', desc: '脚本' }
        ]
      })
    }

    const list = getSubjectCutList('制作人员', '导演 (1)', [1], 'anime', subjects, [])
    expect(list).toEqual([['某人', '3']])
  })

  it('声优: 过滤主角/配角/客串', () => {
    const subjects = {
      1: subject(1, {
        character: [
          { id: 1, name: '角色', nameJP: '', image: '', desc: FILTER_CV[0], actorId: 9 },
          { id: 2, name: '角色2', nameJP: '', image: '', desc: '某声优', actorId: 10 }
        ]
      })
    }

    const list = getSubjectCutList('声优', '', [1], 'anime', subjects, [])
    expect(list).toEqual([['某声优', '1']])
  })

  it('排名: 前百/百/千/N/A 分桶', () => {
    const subjects = {
      1: subject(1, { rank: 50 }),
      2: subject(2, { rank: 550 }),
      3: subject(3, { rank: 1200 }),
      4: subject(4, {})
    }

    const list = getSubjectCutList('排名', '', [1, 2, 3, 4], 'anime', subjects, [])
    expect(list).toEqual([
      [' 前百 ', '1'],
      [' 5百 ', '1'],
      [' 1千 ', '1'],
      [' N/A ', '1']
    ])
  })

  it('超出各类型上限时截断', () => {
    // 标签上限 64
    const tags = Array.from({ length: 70 }, (_, i) => ({
      name: `标签${i}`,
      count: '999',
      meta: false
    }))
    const subjects = { 1: subject(1, { tags }) }
    // 每个标签只出现一次, count = 2 (value 1, 首次 value + 1), 通过阈值
    expect(getSubjectCutList('标签', '', [1], 'anime', subjects, []).length).toBe(64)

    // 声优上限 48
    const characters = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      name: `角色${i}`,
      nameJP: '',
      image: '',
      desc: `声优${i}`,
      actorId: i
    }))
    const subjects2 = { 1: subject(1, { character: characters }) }
    expect(getSubjectCutList('声优', '', [1], 'anime', subjects2, []).length).toBe(48)
  })

  it('过滤词不参与统计', () => {
    expect(FILTER_TAGS).toContain('TV')
    expect(FILTER_CV).toContain('主角')
  })
})
