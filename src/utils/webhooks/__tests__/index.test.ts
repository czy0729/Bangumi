/*
 * @Author: czy0729
 * @Date: 2026-08-24 05:39:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 05:41:01
 *
 * 各 webhook hook 的 payload 构造测试, mock 发送器与埋点
 */

jest.mock('../webhook', () => ({
  logs: [],
  webhook: jest.fn()
}))

jest.mock('../../app', () => ({
  getSubjectCoverCommon: jest.fn((url?: string) => `subject:${url || ''}`),
  getMonoCoverSmall: jest.fn((url?: string) => `mono:${url || ''}`)
}))

jest.mock('../../html', () => ({
  removeHTMLTag: jest.fn((html: string) => String(html || '').replace(/<[^>]+>/g, ''))
}))

jest.mock('../../async', () => ({
  syncSystemStore: jest.fn(() => ({ setting: { webhook: true } }))
}))

jest.mock('../../track', () => ({
  t: jest.fn()
}))

jest.mock(
  '@constants',
  () => ({
    MODEL_COLLECTION_STATUS: {
      getTitle: jest.fn(() => 2)
    }
  }),
  { virtual: true }
)

import {
  webhookCatalog,
  webhookCollection,
  webhookEp,
  webhookFriend,
  webhookGroup,
  webhookMono,
  webhookSay
} from '../index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webhookMock: any = require('../webhook').webhook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tMock: any = require('../../track').t
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const syncSystemStoreMock: any = require('../../async').syncSystemStore

const SUBJECT = {
  id: 339326,
  images: { common: '//lain.bgm.tv/pic/cover/339326.jpg' },
  name: '異世界おじさん',
  name_cn: '异世界舅舅',
  type: 2,
  rank: 516,
  rating: { rank: 516, total: 5019, score: 7.7 },
  eps_count: 13,
  eps: [
    {
      id: 1116553,
      sort: 13,
      airdate: '2023-03-08',
      name: '',
      name_cn: '感谢大家的一路陪伴',
      duration: '00:23:40',
      comment: 195
    }
  ]
}

const USER = {
  id: 456208,
  username: 'sukaretto',
  avatar: { large: 'http://lain.bgm.tv/pic/user/l/456208.jpg' },
  nickname: '咕咕子❶',
  sign: ''
}

beforeEach(() => {
  jest.clearAllMocks()
  syncSystemStoreMock.mockImplementation(() => ({ setting: { webhook: true } }))
})

describe('开关控制', () => {
  it('关闭时所有 hook 返回 false 且不发送不埋点', () => {
    syncSystemStoreMock.mockImplementation(() => ({ setting: { webhook: false } }))

    expect(webhookCollection({}, SUBJECT, USER)).toBe(false)
    expect(webhookEp({}, SUBJECT, USER)).toBe(false)
    expect(webhookSay({}, USER)).toBe(false)
    expect(webhookMono({}, USER)).toBe(false)
    expect(webhookFriend(USER, USER)).toBe(false)
    expect(webhookGroup({}, USER)).toBe(false)
    expect(webhookCatalog({}, USER)).toBe(false)

    expect(webhookMock).not.toHaveBeenCalled()
    expect(tMock).not.toHaveBeenCalled()
  })
})

describe('webhookCollection', () => {
  it('构造收藏 payload 并埋点', () => {
    webhookCollection(
      {
        status: '看过',
        rating: 8,
        comment: '好看',
        privacy: 1,
        tags: '2020 PS4 '
      },
      SUBJECT,
      USER
    )

    expect(webhookMock).toHaveBeenCalledWith(
      'collection',
      expect.objectContaining({
        type: 2,
        rate: 8,
        comment: '好看',
        private: true,
        tags: ['2020', 'PS4'],
        subject: expect.objectContaining({
          id: 339326,
          name_cn: '异世界舅舅',
          eps: 13
        }),
        user: expect.objectContaining({ username: 'sukaretto' }),
        ts: expect.any(Number)
      })
    )
    expect(tMock).toHaveBeenCalledWith('其他.Webhooks', {
      type: 'collection',
      subjectId: 339326,
      username: 'sukaretto'
    })
  })

  it('privacy 非 1 时 private 为 false', () => {
    webhookCollection({ privacy: 0 }, SUBJECT, USER)
    expect(webhookMock.mock.calls[0][1].private).toBe(false)
  })

  it('tags 空字符串过滤后为空数组', () => {
    webhookCollection({ tags: '' }, SUBJECT, USER)
    expect(webhookMock.mock.calls[0][1].tags).toEqual([])
  })

  it('缺省 username 埋点兜底为空串', () => {
    webhookCollection({}, SUBJECT, {})
    expect(tMock).toHaveBeenCalledWith(
      '其他.Webhooks',
      expect.objectContaining({ username: '' })
    )
  })
})

describe('webhookEp', () => {
  it('按 values.id 匹配章节并映射 watched 为 2', () => {
    webhookEp({ id: 1116553, status: 'watched', batch: false, vols: '' }, SUBJECT, USER)

    const data = webhookMock.mock.calls[0][1]
    expect(data).toEqual(
      expect.objectContaining({
        type: 2,
        batch: false,
        eps: 13,
        vols: undefined,
        ep: expect.objectContaining({
          id: 1116553,
          airdate: '2023-03-08',
          name_cn: '感谢大家的一路陪伴'
        })
      })
    )
  })

  it('id 未命中时按 sort 宽松相等回退查找并取回退章节信息', () => {
    // 真实场景: 表单未选中具体章节时 id 为空串
    webhookEp({ id: '', status: 'queue', sort: '13' }, SUBJECT, USER)

    const data = webhookMock.mock.calls[0][1]
    expect(data.type).toBe(1)
    expect(data.ep.id).toBe(1116553)
    expect(data.ep.airdate).toBe('2023-03-08')
    expect(data.eps).toBe(13)
  })

  it('完全未命中时章节为空壳且 eps 取 values.sort', () => {
    webhookEp({ status: 'drop', sort: 99 }, SUBJECT, USER)

    const data = webhookMock.mock.calls[0][1]
    expect(data.type).toBe(3)
    expect(data.eps).toBe(99)
    expect(data.ep).toEqual({
      id: 0,
      airdate: '',
      name: '',
      name_cn: '',
      duration: '',
      comment: 0
    })
  })

  it('未知状态映射为 0', () => {
    webhookEp({ status: 'unknown' }, SUBJECT, USER)
    expect(webhookMock.mock.calls[0][1].type).toBe(0)
  })
})

describe('webhookSay', () => {
  it('缺省 content 兜底为新吐槽', () => {
    webhookSay({}, USER)

    expect(webhookMock).toHaveBeenCalledWith(
      'say',
      expect.objectContaining({
        content: '新吐槽',
        url: ''
      })
    )
    expect(tMock).toHaveBeenCalledWith('其他.Webhooks', {
      type: 'say',
      username: 'sukaretto'
    })
  })
})

describe('webhookMono / webhookFriend / webhookGroup / webhookCatalog', () => {
  it('mono payload 字段转换并埋点 monoId', () => {
    webhookMono(
      { id: 'person/5745', name: '佐倉綾音', nameCn: '佐仓绫音', cover: '//crt/5745.jpg' },
      USER
    )

    expect(webhookMock).toHaveBeenCalledWith(
      'mono',
      expect.objectContaining({
        mono: expect.objectContaining({ id: 'person/5745', name_cn: '佐仓绫音' }),
        user: expect.objectContaining({ username: 'sukaretto' })
      })
    )
    expect(tMock).toHaveBeenCalledWith(
      '其他.Webhooks',
      expect.objectContaining({ monoId: 'person/5745', username: 'sukaretto' })
    )
  })

  it('friend 双方用户信息均归一化', () => {
    webhookFriend(USER, { ...USER, id: 1, username: 'me' })

    const data = webhookMock.mock.calls[0][1]
    expect(data.friend.username).toBe('sukaretto')
    expect(data.user.username).toBe('me')
  })

  it('group payload 截断内容并埋点小组 id', () => {
    webhookGroup({ id: 'genshin', title: '原神', content: '啊'.repeat(50) }, USER)

    const data = webhookMock.mock.calls[0][1]
    expect(data.group.content).toHaveLength(40)
    expect(tMock).toHaveBeenCalledWith(
      '其他.Webhooks',
      expect.objectContaining({ group: 'genshin' })
    )
  })

  it('catalog payload 透传目录 id', () => {
    webhookCatalog({ id: 40304, title: '漫画Ranking100', content: '<p>来源</p>' }, USER)

    const data = webhookMock.mock.calls[0][1]
    expect(data.catalog.id).toBe(40304)
    expect(data.catalog.content).toBe('来源')
    expect(tMock).toHaveBeenCalledWith('其他.Webhooks', expect.objectContaining({ catalog: 40304 }))
  })
})
