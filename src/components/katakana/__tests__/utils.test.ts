/*
 * @Author: czy0729
 * @Date: 2026-08-15 07:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:42:50
 */
import React from 'react'
import { getStorage, setStorage } from '@utils'
import { baiduTranslate } from '@utils/fetch'
import { decode } from '@utils/thirdParty/protobuf'
import { getCache, getKatakanaText, matchKatakanas, translate, translateAll } from '../utils'

jest.mock('@utils/thirdParty/protobuf', () => ({ decode: jest.fn() }))

const decodeMock = decode as jest.Mock
const getStorageMock = getStorage as jest.Mock
const setStorageMock = setStorage as jest.Mock
const baiduTranslateMock = baiduTranslate as jest.Mock

/** 默认百度 mock: 逐行翻译为 EN: 前缀 */
const defaultBaidu = async (text: string) =>
  JSON.stringify({
    trans_result: text.split('\n').map(line => ({ src: line, dst: 'EN:' + line }))
  })

describe('matchKatakanas', () => {
  it('整段匹配含 ・ 的片假名片段', () => {
    expect(matchKatakanas('ソードアート・オンライン')).toEqual(['ソードアート・オンライン'])
  })

  it('过滤纯标点片段', () => {
    expect(matchKatakanas('僕の・彼女')).toEqual([])
  })

  it('单个标点不匹配', () => {
    expect(matchKatakanas('・')).toEqual([])
  })

  it('半角片假名不匹配', () => {
    expect(matchKatakanas('ｱﾆﾒ')).toEqual([])
  })

  it('多个片段全部返回', () => {
    expect(matchKatakanas('アニメとゲーム')).toEqual(['アニメ', 'ゲーム'])
  })

  it('无片假名返回空数组', () => {
    expect(matchKatakanas('Hello World')).toEqual([])
  })
})

describe('getKatakanaText', () => {
  it('字符串子节点原样拼接', () => {
    expect(getKatakanaText(['アニメ', 'と', 'ゲーム'])).toBe('アニメとゲーム')
  })

  it('数字子节点转为字符串', () => {
    expect(getKatakanaText([2026])).toBe('2026')
  })

  it('递归提取嵌套元素文本', () => {
    const el = React.createElement('span', {
      children: React.createElement('b', { children: 'アニメ' })
    })
    expect(getKatakanaText(el)).toBe('アニメ')
  })

  it('空内容返回空字符串', () => {
    expect(getKatakanaText(null)).toBe('')
  })

  it('函数组件内部文本无法提取 (撑高决策不依赖文本提取)', () => {
    const Func = () => React.createElement('b', null, 'カトゥン')
    expect(getKatakanaText(React.createElement(Func))).toBe('')
  })
})

describe('getCache', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    decodeMock.mockResolvedValue({ アニメ: 'Anime' })
    getStorageMock.mockResolvedValue({ テスト: 'Test' })
    baiduTranslateMock.mockImplementation(defaultBaidu)
    await getCache()
  })

  it('合并字典与持久化覆盖', async () => {
    const cb = jest.fn()
    await translate('アニメ', cb)
    expect(cb).toHaveBeenCalledWith({ jp: 'アニメ', en: 'Anime' })

    cb.mockClear()
    await translate('テスト', cb)
    expect(cb).toHaveBeenCalledWith({ jp: 'テスト', en: 'Test' })
  })

  it('字典加载失败时优雅降级, 不抛错', async () => {
    decodeMock.mockRejectedValue(new Error('load fail'))
    await expect(getCache()).resolves.toBe(true)
  })

  it('持久化读取失败仍使用字典', async () => {
    getStorageMock.mockRejectedValue(new Error('storage fail'))
    await getCache()
    const cb = jest.fn()
    await translate('アニメ', cb)
    expect(cb).toHaveBeenCalledWith({ jp: 'アニメ', en: 'Anime' })
  })
})

describe('translate', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    getStorageMock.mockResolvedValue({})
    baiduTranslateMock.mockImplementation(defaultBaidu)
    await getCache()
  })

  afterEach(() => jest.useRealTimers())

  it('整词命中字典立即回调', async () => {
    decodeMock.mockResolvedValue({ アニメ: 'Anime' })
    await getCache()
    const cb = jest.fn()
    await translate('アニメ', cb)
    expect(baiduTranslateMock).not.toHaveBeenCalled()
    expect(cb).toHaveBeenCalledWith({ jp: 'アニメ', en: 'Anime' })
  })

  it('整词未命中时拆分命中子片段', async () => {
    decodeMock.mockResolvedValue({ オンライン: 'On-line', テスト: 'Test' })
    await getCache()
    const cb = jest.fn()
    await translate('オンライン・テスト', cb)
    expect(baiduTranslateMock).not.toHaveBeenCalled()
    expect(cb).toHaveBeenCalledTimes(2)
    expect(cb).toHaveBeenCalledWith({ jp: 'オンライン', en: 'On-line' })
    expect(cb).toHaveBeenCalledWith({ jp: 'テスト', en: 'Test' })
  })

  it('未命中片段走防抖队列, 到点统一翻译', async () => {
    jest.useFakeTimers()
    decodeMock.mockResolvedValue({})
    await getCache()
    const cb = jest.fn()
    translate('ミス', cb)
    expect(baiduTranslateMock).not.toHaveBeenCalled()
    await jest.runAllTimersAsync()
    expect(baiduTranslateMock).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith({ jp: 'ミス', en: 'EN:ミス' })
    jest.useRealTimers()
  })
})

describe('translateAll 与全局队列', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    decodeMock.mockResolvedValue({})
    getStorageMock.mockResolvedValue({})
    baiduTranslateMock.mockImplementation(defaultBaidu)
    await getCache()
  })

  it('同一未命中词多次请求只发一次百度', async () => {
    await translateAll('ミス・ワード')
    await translateAll('ミス・ワード')
    expect(baiduTranslateMock).toHaveBeenCalledTimes(1)
  })

  it('命中字典不请求百度', async () => {
    decodeMock.mockResolvedValue({ アニメ: 'Anime' })
    await getCache()
    await translateAll('アニメ')
    expect(baiduTranslateMock).not.toHaveBeenCalled()
  })

  it('返回整词到英文映射', async () => {
    decodeMock.mockResolvedValue({ アニメ: 'Anime' })
    await getCache()
    const result = await translateAll('アニメとゲーム')
    expect(result).toMatchObject({ アニメ: 'Anime', ゲーム: 'EN:ゲーム' })
  })

  it('并发翻译串行执行, 结果全局一致', async () => {
    let inFlight = 0
    let maxInFlight = 0
    baiduTranslateMock.mockImplementation(async (text: string) => {
      inFlight++
      maxInFlight = Math.max(maxInFlight, inFlight)
      await new Promise(resolve => setTimeout(resolve, 5))
      inFlight--
      return JSON.stringify({
        trans_result: text.split('\n').map(line => ({ src: line, dst: 'EN:' + line }))
      })
    })

    const inputs = ['ワード', 'ゲーム', 'アニメ', 'サッカー', 'ラジオ']
    await Promise.all(inputs.map(word => translateAll(word)))
    expect(maxInFlight).toBe(1)

    const results = await Promise.all(inputs.map(word => translateAll(word)))
    results.forEach((result, index) => {
      expect(result).toMatchObject({ [inputs[index]]: 'EN:' + inputs[index] })
    })
  })

  it('save 只持久化新增翻译', async () => {
    decodeMock.mockResolvedValue({ アニメ: 'Anime' })
    await getCache()
    await translateAll('ミス')
    expect(setStorageMock).toHaveBeenCalled()
    expect(setStorageMock.mock.calls[0][1]).toEqual({ ミス: 'EN:ミス' })
  })

  it('多次翻译累积持久化, 后一次不覆盖前一次', async () => {
    decodeMock.mockResolvedValue({})
    await getCache()
    await translateAll('ミス')
    await translateAll('ワード')
    const lastCall = setStorageMock.mock.calls[setStorageMock.mock.calls.length - 1]
    expect(lastCall[1]).toEqual({ ミス: 'EN:ミス', ワード: 'EN:ワード' })
  })

  it('持久化内容合并读取, 跨会话不丢之前翻译的词', async () => {
    getStorageMock.mockResolvedValue({ ミス: 'EN:ミス' })
    await getCache()
    const result = await translateAll('ミス')
    expect(result).toEqual({ ミス: 'EN:ミス' })
    expect(baiduTranslateMock).not.toHaveBeenCalled()
  })

  it('单片段超过批量上限不会死循环, 强制入批翻译', async () => {
    decodeMock.mockResolvedValue({})
    await getCache()
    const long = 'ア'.repeat(2000)
    const result = await translateAll(long)
    expect(baiduTranslateMock).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ [long]: 'EN:' + long })
  })
})
