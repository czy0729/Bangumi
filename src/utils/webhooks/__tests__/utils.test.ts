/*
 * @Author: czy0729
 * @Date: 2026-08-24 05:39:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-24 05:39:59
 *
 * 归一化纯函数测试, mock 封面处理与 HTML 工具
 */

jest.mock('../../app', () => ({
  getSubjectCoverCommon: jest.fn((url?: string) => `subject:${url || ''}`),
  getMonoCoverSmall: jest.fn((url?: string) => `mono:${url || ''}`)
}))

jest.mock('../../html', () => ({
  removeHTMLTag: jest.fn((html: string) => String(html || '').replace(/<[^>]+>/g, ''))
}))

import { getCatalog, getGroup, getMono, getSubject, getUserInfo } from '../utils'

describe('getSubject', () => {
  it('完整字段映射并包装封面', () => {
    const result = getSubject({
      id: 313864,
      images: { common: '//lain.bgm.tv/pic/cover/313864.jpg' },
      name: 'KINGDOM HEARTS Melody of Memory',
      name_cn: '王国之心：记忆旋律',
      type: '4',
      rank: 0,
      rating: { rank: 0, total: 12, score: 6.6 },
      eps_count: ''
    })

    expect(result).toEqual({
      id: 313864,
      image: 'subject://lain.bgm.tv/pic/cover/313864.jpg',
      name: 'KINGDOM HEARTS Melody of Memory',
      name_cn: '王国之心：记忆旋律',
      type: 4,
      rating: { rank: 0, total: 12, score: 6.6 },
      eps: 0
    })
  })

  it('空对象兜底为默认值', () => {
    expect(getSubject({})).toEqual({
      id: 0,
      image: 'subject:',
      name: '',
      name_cn: '',
      type: 0,
      rating: { rank: 0, total: 0, score: 0 },
      eps: 0
    })
  })

  it('undefined 入参不抛错', () => {
    const result = getSubject(undefined as any)
    expect(result.id).toBe(0)
    expect(result.name).toBe('')
    expect(result.eps).toBe(0)
  })
})

describe('getUserInfo', () => {
  it('提取 avatar.large 并映射字段', () => {
    expect(
      getUserInfo({
        id: 456208,
        username: 'sukaretto',
        avatar: { large: 'http://lain.bgm.tv/pic/user/l/456208.jpg' },
        nickname: '咕咕子❶',
        sign: 'sign'
      })
    ).toEqual({
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/456208.jpg',
      nickname: '咕咕子❶',
      sign: 'sign'
    })
  })

  it('avatar 缺少 large 时兜底空串', () => {
    const result = getUserInfo({ avatar: {} })
    expect(result.avatar).toBe('')
    expect(result.id).toBe(0)
    expect(result.username).toBe('')
  })
})

describe('getMono', () => {
  it('nameCn 映射为 name_cn 并包装封面', () => {
    expect(
      getMono({
        id: 'person/5745',
        name: '佐倉綾音',
        nameCn: '佐仓绫音',
        cover: '//lain.bgm.tv/pic/crt/s/5745.jpg'
      })
    ).toEqual({
      id: 'person/5745',
      name: '佐倉綾音',
      name_cn: '佐仓绫音',
      cover: 'mono://lain.bgm.tv/pic/crt/s/5745.jpg'
    })
  })

  it('字段原样透传可为 undefined', () => {
    const result = getMono({})
    expect(result).toEqual({
      id: undefined,
      name: undefined,
      name_cn: undefined,
      cover: 'mono:'
    })
  })
})

describe('getGroup', () => {
  it('完整字段映射', () => {
    expect(
      getGroup({
        id: 'genshin',
        title: '原神',
        content: '速溶咖啡天下第一',
        cover: '//lain.bgm.tv/pic/icon/l/4663.jpg',
        create: '创建于 2022-8-31'
      })
    ).toEqual({
      id: 'genshin',
      title: '原神',
      content: '速溶咖啡天下第一',
      cover: '//lain.bgm.tv/pic/icon/l/4663.jpg',
      create: '创建于 2022-8-31'
    })
  })

  it('content 截断到 40 字符', () => {
    const result = getGroup({ content: '啊'.repeat(50) })
    expect(result.content).toHaveLength(40)
  })

  it('缺省字段兜底空串', () => {
    expect(getGroup({})).toEqual({
      id: '',
      title: '',
      content: '',
      cover: '',
      create: ''
    })
  })
})

describe('getCatalog', () => {
  it('剥离 HTML 标签后截断到 64 字符', () => {
    const result = getCatalog({
      id: 40304,
      title: '漫画Ranking100',
      content: `<a href="http://blog.livedoor.jp">来源</a>：${'啊'.repeat(80)}`
    })
    expect(result.id).toBe(40304)
    expect(result.title).toBe('漫画Ranking100')
    expect(result.content).toHaveLength(64)
    expect(result.content.startsWith('来源：')).toBe(true)
  })

  it('字符串 id 原样保留', () => {
    expect(getCatalog({ id: '40304', title: '', content: '' }).id).toBe('40304')
  })

  it('缺省字段兜底空串', () => {
    expect(getCatalog({})).toEqual({ id: '', title: '', content: '' })
  })
})
