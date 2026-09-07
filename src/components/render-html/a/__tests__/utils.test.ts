/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * a 标签解析函数测试: 文字提取 + 条目 / 帖子 / 人物媒体块构造
 */
import React from 'react'
import { logger } from '@utils/dev'
import { IGNORE_TOPIC_ID, MAX_MEDIA_RETRY, MEDIA_QUEUE_DELAY, TOGGLE_IMAGE_NAME } from '../ds'
import { fetchMediaQueue } from '../../utils/media-queue'
import {
  filterChildren,
  getACSearch,
  getMediaType,
  getMono,
  getRawChildrenText,
  getSubject,
  getTopic,
  isToggleImage
} from '../utils'

import type { PassProps } from '../types'

let mockIOS = false
let mockNavigation: unknown = undefined
let mockTask: { fn: () => void; delay: number } | null = null
let mockTaskCount = 0

const mockStore: {
  subject: Record<string, unknown> | undefined
  topic: Record<string, unknown> | undefined
  mono: Record<string, unknown> | undefined
  monoError: boolean
  getSubjectSnapshot: ((subjectId: string) => Promise<unknown>) | undefined
  init: ((key: string) => Promise<unknown>) | undefined
} = {
  subject: undefined,
  topic: undefined,
  mono: undefined,
  monoError: false,
  getSubjectSnapshot: undefined,
  init: undefined
}

// 子组件 mock 成空组件, 断言只看 element.type / props, 不进入真实渲染链
jest.mock('../ac-text', () => {
  function ACText() {
    return null
  }
  return { __esModule: true, default: ACText }
})

jest.mock('../mono', () => {
  function Mono() {
    return null
  }
  return { __esModule: true, default: Mono }
})

jest.mock('../subject', () => {
  function Subject() {
    return null
  }
  return { __esModule: true, default: Subject }
})

jest.mock('../topic', () => {
  function Topic() {
    return null
  }
  return { __esModule: true, default: Topic }
})

jest.mock(
  '@stores',
  () => ({
    __esModule: true,
    rakuenStore: {
      setting: {},
      init: (key: string) =>
        typeof mockStore.init === 'function' ? mockStore.init(key) : Promise.resolve(),
      topic: () => mockStore.topic
    },
    subjectStore: {
      getSubjectSnapshot: (subjectId: string) =>
        typeof mockStore.getSubjectSnapshot === 'function'
          ? mockStore.getSubjectSnapshot(subjectId)
          : Promise.resolve(mockStore.subject),
      mono: () => {
        if (mockStore.monoError) throw new Error('读取失败')
        return mockStore.mono
      }
    }
  }),
  { virtual: true }
)

jest.mock(
  '@utils',
  () => ({
    __esModule: true,
    navigationReference: () => mockNavigation,
    postTask: (fn: () => void, delay: number = 0) => {
      mockTaskCount += 1
      mockTask = { fn, delay }
    }
  }),
  { virtual: true }
)

jest.mock(
  '@constants',
  () => ({
    __esModule: true,
    get IOS() {
      return mockIOS
    },
    WEB: false
  }),
  { virtual: true }
)

jest.mock('../../utils/media-queue', () => ({
  __esModule: true,
  fetchMediaQueue: jest.fn()
}))

const ACText = require('../ac-text').default
const Mono = require('../mono').default
const Subject = require('../subject').default
const Topic = require('../topic').default
const queueMock = fetchMediaQueue as unknown as jest.Mock

/** 构造带 displayName 的占位元素 */
function textElement(key: string, displayName: string) {
  function Item() {
    return null
  }
  Item.displayName = displayName
  return React.createElement(Item, { key }, key)
}

/** 构造 forwardRef 包装的占位元素 (RN 的 Text 就是这种形态) */
function forwardRefElement(key: string, displayName: string) {
  const Item = React.forwardRef<unknown, unknown>(() => null)
  Item.displayName = displayName
  return React.createElement(Item, { key }, key)
}

/** 构造 memo 包装的占位元素 (observer 包装后就是这种形态) */
function memoElement(key: string, displayName: string) {
  function Item() {
    return null
  }
  Item.displayName = displayName

  const MemoItem = React.memo(Item)
  MemoItem.displayName = displayName
  return React.createElement(MemoItem, { key }, key)
}

const PASS_PROPS: PassProps = {
  rawChildren: [
    {
      data: '链接文字'
    }
  ]
}

beforeEach(() => {
  jest.useFakeTimers()
  mockIOS = false
  mockNavigation = undefined
  mockTask = null
  mockTaskCount = 0
  mockStore.subject = undefined
  mockStore.topic = undefined
  mockStore.mono = undefined
  mockStore.monoError = false
  mockStore.getSubjectSnapshot = undefined
  mockStore.init = undefined
  queueMock.mockReset()
  ;(logger.error as jest.Mock).mockClear()
})

afterEach(() => {
  jest.useRealTimers()
})

describe('filterChildren', () => {
  it('IOS 下原样返回', () => {
    mockIOS = true
    const childrens = ['文字', textElement('a', 'Other')]

    expect(filterChildren(childrens)).toBe(childrens)
  })

  it('安卓下只保留 Text 元素', () => {
    const text = textElement('text', 'Text')
    const childrens = ['文字', textElement('img', 'Image'), text]

    expect(filterChildren(childrens)).toEqual([text])
  })

  it('安卓下保留 forwardRef 包装的 Text 元素', () => {
    const text = forwardRefElement('text', 'Text')
    const childrens = ['文字', forwardRefElement('img', 'Image'), text]

    expect(filterChildren(childrens)).toEqual([text])
  })

  it('安卓下保留 memo 包装的 Text 元素', () => {
    const text = memoElement('text', 'Text')
    const childrens = ['文字', memoElement('img', 'Image'), text]

    expect(filterChildren(childrens)).toEqual([text])
  })

  it('安卓下无 Text 元素时回退取图片地址', () => {
    const childrens = ['文字', React.createElement('Image', { key: 'img', src: '//img/1.jpg' })]

    expect(filterChildren(childrens)).toEqual(['//img/1.jpg'])
  })

  it('入参非数组时返回空数组', () => {
    expect(filterChildren(undefined as unknown as [])).toEqual([])
    expect(filterChildren(null as unknown as [])).toEqual([])
  })
})

describe('getRawChildrenText', () => {
  it('取第一项 data', () => {
    expect(getRawChildrenText(PASS_PROPS)).toBe('链接文字')
  })

  it('无 data 时拼接子项文字', () => {
    expect(
      getRawChildrenText({
        rawChildren: [
          {
            children: [{ data: '前' }, { data: '后' }]
          }
        ]
      })
    ).toBe('前后')
  })

  it('忽略非字符串内容', () => {
    expect(
      getRawChildrenText({
        rawChildren: [
          {
            children: [{ data: '前' }, {}, { data: 123 as unknown as string }]
          }
        ]
      })
    ).toBe('前')
  })

  it('空参数返回空字符串', () => {
    expect(getRawChildrenText(undefined)).toBe('')
    expect(getRawChildrenText({})).toBe('')
    expect(getRawChildrenText({ rawChildren: [] })).toBe('')
  })

  it('读取异常时返回空字符串并记录日志', () => {
    const passProps = {
      get rawChildren() {
        throw new Error('rawChildren 读取失败')
      }
    }

    expect(getRawChildrenText(passProps as unknown as PassProps)).toBe('')
    expect(logger.error).toHaveBeenCalled()
  })
})

describe('isToggleImage', () => {
  it('只有一个折叠图片子节点时为 true', () => {
    expect(isToggleImage([textElement('img', 'ToggleImage')])).toBe(true)
  })

  it('多个子节点时为 false', () => {
    expect(isToggleImage([textElement('img', 'ToggleImage'), '文字'])).toBe(false)
  })

  it('包装后的折叠图片子节点同样识别', () => {
    expect(isToggleImage([forwardRefElement('img', TOGGLE_IMAGE_NAME)])).toBe(true)
    expect(isToggleImage([memoElement('img', TOGGLE_IMAGE_NAME)])).toBe(true)
  })

  it('非元素子节点时为 false', () => {
    expect(isToggleImage(['文字'])).toBe(false)
    expect(isToggleImage([])).toBe(false)
    expect(isToggleImage(undefined as unknown as [])).toBe(false)
  })
})

describe('getMediaType', () => {
  it('无路由时按文字链接渲染', () => {
    expect(getMediaType({})).toBe('')
  })

  it('条目链接返回条目媒体块', () => {
    expect(getMediaType({ route: 'Subject', matchLink: true })).toBe('subject')
  })

  it('关闭匹配链接设置时不渲染媒体块', () => {
    expect(getMediaType({ route: 'Subject', matchLink: false })).toBe('')
  })

  it('客户端内链仅在开启 AC 搜索时走 AC 搜索', () => {
    expect(getMediaType({ route: 'Subject', app: true, acSearchV2: true })).toBe('ac')
    expect(getMediaType({ route: 'Subject', app: true, acSearchV2: false })).toBe('')
  })

  it('帖子链接返回帖子媒体块', () => {
    expect(getMediaType({ route: 'Topic', topicId: '1', matchLink: true })).toBe('topic')
  })

  it('无帖子 Id 或推广帖不渲染媒体块', () => {
    expect(getMediaType({ route: 'Topic', matchLink: true })).toBe('')
    expect(getMediaType({ route: 'Topic', topicId: IGNORE_TOPIC_ID, matchLink: true })).toBe('')
  })

  it('人物链接返回人物媒体块', () => {
    expect(getMediaType({ route: 'Mono', matchLink: true })).toBe('mono')
  })

  it('未知路由按文字链接渲染', () => {
    expect(getMediaType({ route: 'Zone', matchLink: true })).toBe('')
  })
})

describe('getACSearch', () => {
  it('有文字时返回 AC 文字组件', () => {
    const onPress = jest.fn()
    const el = getACSearch({
      passProps: PASS_PROPS,
      params: { subjectId: '1' },
      onPress
    })

    expect(el?.type).toBe(ACText)
    expect(el?.props).toMatchObject({
      subjectId: '1',
      text: '链接文字',
      onPress
    })
  })

  it('无文字或无条目 Id 时返回 null', () => {
    expect(
      getACSearch({
        passProps: { rawChildren: [{}] },
        params: { subjectId: '1' }
      })
    ).toBeNull()

    expect(
      getACSearch({
        passProps: PASS_PROPS,
        params: {}
      })
    ).toBeNull()
  })
})

describe('getSubject', () => {
  const args = {
    passProps: PASS_PROPS,
    params: { subjectId: '1' },
    href: 'https://bgm.tv/subject/1'
  }

  it('已加载时返回条目媒体块', async () => {
    mockStore.subject = {
      _loaded: true,
      images: { common: '//img/1.jpg' },
      name: '原名',
      name_cn: '中文名',
      rating: { score: 8, total: 100 },
      rank: 12,
      air_date: '2020-01-01'
    }

    const el = await getSubject(args)

    expect(el?.type).toBe(Subject)
    expect(el?.props).toMatchObject({
      text: '链接文字',
      image: '//img/1.jpg',
      name: '原名',
      name_cn: '中文名',
      rank: 12
    })
  })

  it('无文字或无条目 Id 时不请求', async () => {
    expect(await getSubject({ ...args, passProps: { rawChildren: [{}] } })).toBeNull()
    expect(await getSubject({ ...args, params: {} })).toBeNull()
    expect(queueMock).not.toHaveBeenCalled()
  })

  it('无封面时返回 null', async () => {
    mockStore.subject = {
      _loaded: true,
      images: {}
    }

    expect(await getSubject(args)).toBeNull()
  })

  it('未加载时延迟进入请求列队', async () => {
    mockStore.subject = { _loaded: false }

    expect(await getSubject(args)).toBeNull()
    expect(queueMock).not.toHaveBeenCalled()

    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY - 1)
    expect(queueMock).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(queueMock).toHaveBeenCalledTimes(1)
    expect(queueMock.mock.calls[0][0]).toBe('subject')
    expect(queueMock.mock.calls[0][1]).toBe('1')
  })

  it('列队取回数据后主动渲染', async () => {
    mockStore.subject = { _loaded: false }
    const onRender = jest.fn()

    await getSubject({ ...args, onRender })
    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)

    mockStore.subject = {
      _loaded: true,
      images: { common: '//img/1.jpg' }
    }

    await queueMock.mock.calls[0][2](true)

    expect(onRender).toHaveBeenCalledTimes(1)
    expect(onRender.mock.calls[0][0]?.type).toBe(Subject)
  })

  it('列队取回失败时不渲染', async () => {
    mockStore.subject = { _loaded: false }
    const onRender = jest.fn()

    await getSubject({ ...args, onRender })
    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    await queueMock.mock.calls[0][2](false)

    expect(onRender).not.toHaveBeenCalled()
  })

  it('重试达上限后不再排队', async () => {
    mockStore.subject = { _loaded: false }
    const onRender = jest.fn()

    await getSubject({ ...args, onRender })
    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    expect(queueMock).toHaveBeenCalledTimes(1)

    // 前两次重入数据仍未加载, 继续排队
    for (let i = 0; i < MAX_MEDIA_RETRY - 1; i++) {
      await Promise.resolve()
      await queueMock.mock.calls[i][2](true)
      await Promise.resolve()
      await Promise.resolve()
      jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    }
    expect(queueMock).toHaveBeenCalledTimes(MAX_MEDIA_RETRY)

    // 达到上限后不再排队
    await Promise.resolve()
    await queueMock.mock.calls[MAX_MEDIA_RETRY - 1][2](true)
    await Promise.resolve()
    await Promise.resolve()
    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    expect(queueMock).toHaveBeenCalledTimes(MAX_MEDIA_RETRY)
    expect(onRender).not.toHaveBeenCalled()
  })

  it('请求异常时返回 null 并记录日志', async () => {
    mockStore.getSubjectSnapshot = () => Promise.reject(new Error('请求失败'))

    expect(await getSubject(args)).toBeNull()
    expect(logger.error).toHaveBeenCalled()
  })
})

describe('getTopic', () => {
  const args = {
    passProps: PASS_PROPS,
    params: { topicId: '1' }
  }

  it('已加载时返回帖子媒体块', async () => {
    mockStore.topic = {
      _loaded: true,
      userId: '1',
      group: '小组',
      userName: '用户'
    }

    const el = await getTopic(args)

    expect(el?.type).toBe(Topic)
    expect(el?.props).toMatchObject({
      topicId: '1',
      text: '链接文字'
    })
  })

  it('缺失必要字段时返回 null', async () => {
    mockStore.topic = {
      _loaded: true,
      userId: '1',
      group: '小组'
    }

    expect(await getTopic(args)).toBeNull()
  })

  it('未加载时延迟进入请求列队', async () => {
    mockStore.topic = { _loaded: false }

    expect(await getTopic(args)).toBeNull()

    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    expect(queueMock).toHaveBeenCalledTimes(1)
    expect(queueMock.mock.calls[0][0]).toBe('topic')
    expect(queueMock.mock.calls[0][1]).toBe('1')
  })

  it('初始化异常时返回 null 并记录日志', async () => {
    mockStore.init = () => Promise.reject(new Error('读取失败'))

    expect(await getTopic(args)).toBeNull()
    expect(logger.error).toHaveBeenCalled()
  })

  it('重试达上限后不再排队', async () => {
    mockStore.topic = { _loaded: false }
    const onRender = jest.fn()

    await getTopic({ ...args, onRender })
    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    expect(queueMock).toHaveBeenCalledTimes(1)

    // 前两次重入数据仍未加载, 继续排队
    for (let i = 0; i < MAX_MEDIA_RETRY - 1; i++) {
      await queueMock.mock.calls[i][2](true)
      await Promise.resolve()
      await Promise.resolve()
      jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    }
    expect(queueMock).toHaveBeenCalledTimes(MAX_MEDIA_RETRY)

    // 达到上限后不再排队
    await queueMock.mock.calls[MAX_MEDIA_RETRY - 1][2](true)
    await Promise.resolve()
    await Promise.resolve()
    jest.advanceTimersByTime(MEDIA_QUEUE_DELAY)
    expect(queueMock).toHaveBeenCalledTimes(MAX_MEDIA_RETRY)
    expect(onRender).not.toHaveBeenCalled()
  })
})

describe('getMono', () => {
  const args = {
    passProps: PASS_PROPS,
    params: { monoId: '1' }
  }

  it('已加载时返回人物媒体块', () => {
    mockStore.mono = {
      _loaded: true,
      cover: '//img/crt/1.jpg',
      name: '原名',
      nameCn: '中文名'
    }

    const el = getMono(args)

    expect(el?.type).toBe(Mono)
    expect(el?.props).toMatchObject({
      text: '链接文字',
      cover: '//img/crt/1.jpg',
      name: '原名',
      nameCn: '中文名'
    })
  })

  it('未加载时延迟进入请求列队', () => {
    mockStore.mono = { _loaded: false }

    expect(getMono(args)).toBeNull()
    expect(mockTask?.delay).toBe(MEDIA_QUEUE_DELAY)

    mockTask?.fn()
    expect(queueMock).toHaveBeenCalledTimes(1)
    expect(queueMock.mock.calls[0][0]).toBe('mono')
    expect(queueMock.mock.calls[0][1]).toBe('1')
  })

  it('列队取回数据后主动渲染', () => {
    mockStore.mono = { _loaded: false }
    const onRender = jest.fn()

    getMono({ ...args, onRender })
    mockTask?.fn()
    expect(onRender).not.toHaveBeenCalled()

    mockStore.mono = {
      _loaded: true,
      cover: '//img/crt/1.jpg',
      name: '原名',
      nameCn: '中文名'
    }

    queueMock.mock.calls[0][2](true)

    expect(onRender).toHaveBeenCalledTimes(1)
    expect(onRender.mock.calls[0][0]?.type).toBe(Mono)
  })

  it('列队取回失败时不渲染', () => {
    mockStore.mono = { _loaded: false }
    const onRender = jest.fn()

    getMono({ ...args, onRender })
    mockTask?.fn()
    queueMock.mock.calls[0][2](false)

    expect(onRender).not.toHaveBeenCalled()
  })

  it('重试达上限后不再排队', () => {
    mockStore.mono = { _loaded: false }
    const onRender = jest.fn()

    getMono({ ...args, onRender })
    expect(mockTaskCount).toBe(1)

    // 前两次重入数据仍未加载, 继续排队
    for (let i = 0; i < MAX_MEDIA_RETRY - 1; i++) {
      mockTask?.fn()
      queueMock.mock.calls[i][2](true)
    }
    expect(mockTaskCount).toBe(MAX_MEDIA_RETRY)

    // 达到上限后不再排队
    mockTask?.fn()
    queueMock.mock.calls[MAX_MEDIA_RETRY - 1][2](true)
    expect(mockTaskCount).toBe(MAX_MEDIA_RETRY)
    expect(onRender).not.toHaveBeenCalled()
  })

  it('无封面时返回 null', () => {
    mockStore.mono = {
      _loaded: true,
      cover: ''
    }

    expect(getMono(args)).toBeNull()
  })

  it('无人物 Id 时返回 null', () => {
    mockStore.mono = { _loaded: true, cover: '//img/crt/1.jpg' }

    expect(
      getMono({
        ...args,
        params: {}
      })
    ).toBeNull()
    expect(queueMock).not.toHaveBeenCalled()
  })

  it('读取异常时返回 null 并记录日志', () => {
    mockStore.monoError = true

    expect(getMono(args)).toBeNull()
    expect(logger.error).toHaveBeenCalled()
  })
})
