/*
 * @Author: czy0729
 * @Date: 2026-05-12
 */
jest.mock('../../ui', () => ({
  info: jest.fn()
}))

jest.mock('../utils', () => ({
  log: jest.fn()
}))

import {
  arrayBufferToBase64,
  arrGroup,
  asc,
  calculateMedian,
  cleanQ,
  compare,
  debounce,
  decimal,
  deepClone,
  desc,
  factory,
  findLastIndex,
  formatNumber,
  getRandomItems,
  getRecentTimestamp,
  gradientColor,
  interceptor,
  isChineseParagraph,
  isObject,
  keepBasicChars,
  lastDate,
  omit,
  open,
  pad,
  parseIOS8601,
  pick,
  queue,
  random,
  randomn,
  runAfter,
  safeObject,
  setDefaultProps,
  similar,
  simpleTime,
  sleep,
  stl,
  throttle,
  titleCase,
  toFixed,
  toLocalTimeStr,
  trim,
  truncateMiddle,
  urlStringify,
  wait
} from '../'

describe('deepClone', () => {
  it('克隆基本类型', () => {
    expect(deepClone(1)).toBe(1)
    expect(deepClone('str')).toBe('str')
    expect(deepClone(null)).toBe(null)
  })

  it('深拷贝对象', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).not.toBe(obj.b)
  })

  it('深拷贝数组', () => {
    const arr = [1, [2, 3], { a: 4 }]
    const cloned = deepClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
  })
})

describe('isObject', () => {
  it('对象返回 true', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject([])).toBe(true)
  })

  it('非对象返回 false', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject('str')).toBe(false)
  })
})

describe('stl', () => {
  it('单个样式直接返回', () => {
    const style = { color: 'red' }
    expect(stl(style)).toBe(style)
  })

  it('多个样式返回数组', () => {
    const s1 = { color: 'red' }
    const s2 = { fontSize: 14 }
    expect(stl(s1, s2)).toEqual([s1, s2])
  })

  it('过滤 falsy 值', () => {
    const style = { color: 'red' }
    expect(stl(null, undefined, false, style)).toBe(style)
  })
})

describe('compare', () => {
  it('相等字符串返回 0', () => {
    expect(compare('abc', 'abc')).toBe(0)
  })

  it('a < b 返回 -1', () => {
    expect(compare('abc', 'abd')).toBe(-1)
  })

  it('a > b 返回 1', () => {
    expect(compare('abd', 'abc')).toBe(1)
  })

  it('比较不同长度', () => {
    expect(compare('ab', 'abc')).toBe(-1)
    expect(compare('abc', 'ab')).toBe(1)
  })
})

describe('asc', () => {
  it('数字升序排列', () => {
    expect(asc(1, 2)).toBe(-1)
    expect(asc(2, 1)).toBe(1)
    expect(asc(1, 1)).toBe(0)
  })

  it('字符串反向比较', () => {
    expect(asc('a', 'b')).toBe(1)
    expect(asc('b', 'a')).toBe(-1)
  })

  it('支持 mapper 函数', () => {
    const items = [{ v: 2 }, { v: 1 }]
    expect(asc(items[0], items[1], x => x.v)).toBe(1)
  })
})

describe('desc', () => {
  it('数字降序排列', () => {
    expect(desc(1, 2)).toBe(1)
    expect(desc(2, 1)).toBe(-1)
    expect(desc(1, 1)).toBe(0)
  })

  it('字符串正常比较', () => {
    expect(desc('a', 'b')).toBe(-1)
    expect(desc('b', 'a')).toBe(1)
  })
})

describe('pick', () => {
  it('选取指定键', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  it('忽略不存在的键', () => {
    const obj = { a: 1 }
    expect(pick(obj, ['a', 'b' as any])).toEqual({ a: 1 })
  })
})

describe('omit', () => {
  it('排除指定键', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
  })
})

describe('toFixed', () => {
  it('格式化数字', () => {
    expect(toFixed(1.234)).toBe('1.23')
    expect(toFixed(1.234, 1)).toBe('1.2')
  })

  it('处理 falsy 值', () => {
    expect(toFixed(null)).toBe('0.00')
    expect(toFixed(undefined)).toBe('0.00')
    expect(toFixed('')).toBe('0.00')
  })
})

describe('safeObject', () => {
  it('null 替换为 undefined', () => {
    expect(safeObject({ a: 1, b: null, c: 'str' })).toEqual({
      a: 1,
      b: undefined,
      c: 'str'
    })
  })

  it('无参数返回空对象', () => {
    expect(safeObject()).toEqual({})
  })
})

describe('urlStringify', () => {
  it('序列化对象', () => {
    expect(urlStringify({ a: 1, b: 'hello' })).toBe('a=1&b=hello')
  })

  it('默认编码', () => {
    expect(urlStringify({ q: 'hello world' })).toBe('q=hello%20world')
  })

  it('禁用编码', () => {
    expect(urlStringify({ q: 'hello world' }, false)).toBe('q=hello world')
  })

  it('启用键排序', () => {
    expect(urlStringify({ b: 2, a: 1 }, false, true)).toBe('b=2&a=1')
  })

  it('无数据返回空字符串', () => {
    expect(urlStringify()).toBe('')
  })
})

describe('pad', () => {
  it('单位数补零', () => {
    expect(pad(5)).toBe('05')
    expect(pad('5')).toBe('05')
  })

  it('双位数不补零', () => {
    expect(pad(10)).toBe('10')
    expect(pad('10')).toBe('10')
  })
})

describe('similar', () => {
  it('相同字符串返回 1', () => {
    expect(similar('abc', 'abc')).toBe(1)
  })

  it('空字符串返回 0', () => {
    expect(similar('', 'abc')).toBe(0)
    expect(similar('abc', '')).toBe(0)
  })

  it('计算相似度', () => {
    expect(similar('abc', 'abd')).toBeGreaterThan(0)
    expect(similar('abc', 'xyz')).toBeLessThan(1)
  })

  it('保留小数位数', () => {
    const result = similar('abc', 'abd', 2)
    expect(result.toString().split('.')[1]?.length).toBeLessThanOrEqual(2)
  })

  it('默认忽略空格', () => {
    expect(similar('a b c', 'abc')).toBe(1)
  })
})

describe('formatNumber', () => {
  it('添加千分位', () => {
    expect(formatNumber(1234)).toBe('1,234.00')
    expect(formatNumber(1234567)).toBe('1,234,567.00')
  })

  it('处理小数', () => {
    expect(formatNumber(123)).toBe('123.00')
  })

  it('处理空字符串', () => {
    expect(formatNumber('')).toBe('0.00')
  })

  it('处理 xsb 模式', () => {
    expect(formatNumber(15000, 2, true)).toBe('1.5万')
    expect(formatNumber(150000000, 2, true)).toBe('1.5亿')
  })
})

describe('decimal', () => {
  it('格式化带单位', () => {
    expect(decimal(15000)).toBe('1.5万')
    expect(decimal(150000000)).toBe('1.5亿')
  })

  it('处理负数', () => {
    expect(decimal(-15000)).toBe('-1.5万')
  })

  it('处理小数', () => {
    expect(decimal(999)).toBe('999')
  })
})

describe('cleanQ', () => {
  it('移除特殊字符', () => {
    expect(cleanQ('hello!@#world')).toBe('hello   world')
  })

  it('保留普通字符', () => {
    expect(cleanQ('hello world 123')).toBe('hello world 123')
  })
})

describe('trim', () => {
  it('去除空白', () => {
    expect(trim('  hello  ')).toBe('hello')
    expect(trim('\nhello\n')).toBe('hello')
  })

  it('处理空字符串', () => {
    expect(trim()).toBe('')
    expect(trim('')).toBe('')
  })
})

describe('randomn', () => {
  it('生成 n 位数', () => {
    const result = randomn(3)
    expect(result).toBeGreaterThanOrEqual(100)
    expect(result).toBeLessThan(1000)
  })

  it('n > 21 返回 null', () => {
    expect(randomn(22)).toBeNull()
  })
})

describe('random', () => {
  it('生成范围内数字', () => {
    for (let i = 0; i < 100; i++) {
      const result = random(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
    }
  })
})

describe('titleCase', () => {
  it('首字母大写', () => {
    expect(titleCase('hello')).toBe('Hello')
    expect(titleCase('HELLO')).toBe('HELLO')
  })

  it('处理空字符串', () => {
    expect(titleCase('')).toBe('')
  })
})

describe('arrGroup', () => {
  it('分割数组为组', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(arrGroup(arr, 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('默认大小 40', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i)
    const groups = arrGroup(arr)
    expect(groups).toHaveLength(3)
    expect(groups[0]).toHaveLength(40)
    expect(groups[1]).toHaveLength(40)
    expect(groups[2]).toHaveLength(20)
  })
})

describe('isChineseParagraph', () => {
  it('检测中文', () => {
    expect(isChineseParagraph('这是一段中文')).toBe(true)
  })

  it('检测非中文', () => {
    expect(isChineseParagraph('This is English')).toBe(false)
  })

  it('处理混合文本阈值', () => {
    expect(isChineseParagraph('这是中文and some English', 0.8)).toBe(false)
    expect(isChineseParagraph('这是中文and some English', 0.2)).toBe(true)
  })
})

describe('keepBasicChars', () => {
  it('保留中日英数字', () => {
    expect(keepBasicChars('hello你好こんにちは123')).toBe('hello你好こんにちは123')
  })

  it('移除特殊字符', () => {
    expect(keepBasicChars('hello!@#world')).toBe('helloworld')
  })

  it('处理空字符串', () => {
    expect(keepBasicChars('')).toBe('')
  })
})

describe('truncateMiddle', () => {
  it('截断长文本', () => {
    const text = 'abcdefghijklmnopqrstuvwxyz'
    expect(truncateMiddle(text, 10)).toBe('abc...xyz')
  })

  it('短文本不截断', () => {
    expect(truncateMiddle('hello', 10)).toBe('hello')
  })

  it('保留显示字符数', () => {
    const text = 'abcdefghijklmnopqrstuvwxyz'
    expect(truncateMiddle(text, 10, 2)).toBe('abcd...wxyz')
  })
})

describe('getRecentTimestamp', () => {
  it('解析天数', () => {
    expect(getRecentTimestamp('3d')).toBe(3 * 24 * 60 * 60)
  })

  it('解析小时', () => {
    expect(getRecentTimestamp('2h')).toBe(2 * 60 * 60)
  })

  it('解析组合时间', () => {
    expect(getRecentTimestamp('1d2h3m4s')).toBe(86400 + 7200 + 180 + 4)
  })

  it('无效输入返回 0', () => {
    expect(getRecentTimestamp('')).toBe(0)
    expect(getRecentTimestamp('abc')).toBe(0)
  })
})

describe('findLastIndex', () => {
  it('查找最后一个匹配索引', () => {
    const arr = [1, 2, 3, 2, 1]
    expect(findLastIndex(arr, x => x === 2)).toBe(3)
  })

  it('未找到返回 -1', () => {
    const arr = [1, 2, 3]
    expect(findLastIndex(arr, x => x === 4)).toBe(-1)
  })
})

describe('calculateMedian', () => {
  it('计算奇数中位数', () => {
    const data: [number, number][] = [
      [10, 1],
      [20, 1],
      [30, 1]
    ]
    expect(calculateMedian(data)).toBe(20)
  })

  it('计算偶数中位数', () => {
    const data: [number, number][] = [
      [10, 1],
      [20, 1]
    ]
    expect(calculateMedian(data)).toBe(15)
  })

  it('处理加权计数', () => {
    const data: [number, number][] = [
      [10, 2],
      [20, 1],
      [30, 1]
    ]
    expect(calculateMedian(data)).toBe(15)
  })
})

describe('lastDate', () => {
  it('时间戳为 0 返回"刚刚"', () => {
    expect(lastDate(0)).toBe('刚刚')
  })

  it('返回相对时间', () => {
    const now = Math.floor(Date.now() / 1000)
    expect(lastDate(now - 3600)).toBe('1时前')
    expect(lastDate(now - 86400)).toBe('1天前')
  })
})

// ============================================================
// 新增测试：发现隐藏问题
// ============================================================

describe('setDefaultProps', () => {
  it('处理 null 组件', () => {
    expect(() => setDefaultProps(null as any)).toThrow()
  })

  it('处理 undefined 默认属性', () => {
    const Component = () => null
    const result = setDefaultProps(Component, undefined)
    expect(result).toBe(Component)
  })

  it('设置简单组件默认属性', () => {
    const Component = () => null
    const result = setDefaultProps(Component, { test: true })
    expect((result as any).defaultProps).toEqual({ test: true })
  })

  it('处理带 render 方法的组件', () => {
    const originalRender = jest.fn((props: any, ref: any) => ({ props, ref }))
    const Component = {
      render: originalRender
    }
    const result = setDefaultProps(Component as any, { style: { color: 'red' } })
    expect(result.render).toBeDefined()
    expect(result.render).not.toBe(originalRender)
  })

  it('正确合并样式数组', () => {
    const originalRender = jest.fn((props: any) => props)
    const Component = {
      render: originalRender
    }
    const WrappedComponent = setDefaultProps(Component as any, { style: { color: 'red' } })
    const result = WrappedComponent.render({ style: { fontSize: 14 } }, null)
    expect(result.style).toEqual([{ color: 'red' }, { fontSize: 14 }])
  })
})

describe('runAfter', () => {
  const originalRAF = global.requestAnimationFrame

  beforeEach(() => {
    jest.useFakeTimers()
    global.requestAnimationFrame = jest.fn((cb: any) => {
      return setTimeout(() => cb(0), 16) as unknown as number
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    global.requestAnimationFrame = originalRAF
  })

  it('默认使用 requestAnimationFrame 调用', () => {
    const fn = jest.fn()
    runAfter(fn)
    expect(requestAnimationFrame).toHaveBeenCalled()
  })

  it('postTask=true 时使用 setTimeout + rAF', () => {
    const fn = jest.fn()
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout')
    runAfter(fn, true)
    expect(setTimeoutSpy).toHaveBeenCalled()
    setTimeoutSpy.mockRestore()
  })

  it('优雅处理 null 函数', () => {
    expect(() => runAfter(null as any)).not.toThrow()
  })
})

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('首次调用立即执行', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('后续调用节流', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 100)
    throttled()
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('保持 this 上下文', () => {
    const context = { value: 42 }
    const fn = jest.fn(function (this: any) {
      return this.value
    })
    const throttled = throttle(fn, 100)
    throttled.call(context)
    expect(fn).toHaveBeenCalledWith()
  })

  it('处理 delay=0', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 0)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('处理负数 delay', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, -100)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('延迟执行', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 100)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('后续调用重置定时器', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 100)
    debounced()
    jest.advanceTimersByTime(50)
    debounced()
    jest.advanceTimersByTime(50)
    expect(fn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('保持 this 上下文', () => {
    const context = { value: 42 }
    const fn = jest.fn(function (this: any) {
      return this.value
    })
    const debounced = debounce(fn, 100)
    debounced.call(context)
    jest.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalled()
  })

  it('正确传递参数', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 100)
    debounced('arg1', 'arg2')
    jest.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('处理 ms=0', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 0)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(0)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('queue', () => {
  it('空数组返回 false', async () => {
    const result = await queue([])
    expect(result).toBe(false)
  })

  it('undefined 返回 false', async () => {
    const result = await queue(undefined)
    expect(result).toBe(false)
  })

  it('并发限制执行', async () => {
    const results: number[] = []
    const fetchs = [
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            results.push(1)
            resolve(1)
          }, 100)
        ),
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            results.push(2)
            resolve(2)
          }, 50)
        ),
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            results.push(3)
            resolve(3)
          }, 10)
        )
    ]
    await queue(fetchs, 2)
    expect(results).toHaveLength(3)
  })

  it('处理 num=0', async () => {
    const fetchs = [() => Promise.resolve(1)]
    const result = await queue(fetchs, 0)
    expect(result).toEqual([1])
  })

  it('处理负数 num', async () => {
    const fetchs = [() => Promise.resolve(1)]
    const result = await queue(fetchs, -1)
    expect(result).toEqual([1])
  })

  it('传播 fetch 错误', async () => {
    const fetchs = [() => Promise.resolve(1), () => Promise.reject(new Error('test error'))]
    await expect(queue(fetchs)).rejects.toThrow('test error')
  })
})

describe('interceptor', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('首次调用返回 false', () => {
    expect(interceptor('test', {}, 1000)).toBe(false)
  })

  it('距离内重复调用返回 true', () => {
    interceptor('test', {}, 1000)
    expect(interceptor('test', {}, 1000)).toBe(true)
  })

  it('距离过期后允许调用', () => {
    interceptor('test', {}, 1000)
    jest.advanceTimersByTime(1000)
    expect(interceptor('test', {}, 1000)).toBe(true)
  })

  it('处理空键', () => {
    expect(interceptor('', {}, 1000)).toBe(false)
    expect(interceptor('', {}, 1000)).toBe(true)
  })

  it('处理 distance=0', () => {
    interceptor('test', {}, 0)
    expect(interceptor('test', {}, 0)).toBe(true)
  })

  it('处理循环引用', () => {
    const obj: any = {}
    obj.self = obj
    expect(() => interceptor('test', obj, 1000)).toThrow()
  })
})

describe('open', () => {
  it('空 URL 返回 false', () => {
    expect(open('')).toBe(false)
  })

  it('非字符串 URL 返回 false', () => {
    expect(open(null as any)).toBe(false)
    expect(open(undefined as any)).toBe(false)
    expect(open(123 as any)).toBe(false)
  })

  it('为 // URL 添加 https:', () => {
    const result = open('//example.com')
    expect(result).toBe(true)
  })

  it('encode=true 时编码 URL', () => {
    const result = open('https://example.com/path with spaces', true)
    expect(result).toBe(true)
  })

  it('无效 URL 调用 info', () => {
    const { info } = require('../../ui')
    open('')
    expect(info).toHaveBeenCalledWith('地址不合法')
  })
})

describe('sleep', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('指定时间后 resolve', async () => {
    const promise = sleep(100)
    jest.advanceTimersByTime(100)
    await promise
  })

  it('处理 ms=0', async () => {
    const promise = sleep(0)
    jest.advanceTimersByTime(0)
    await promise
  })

  it('处理负数 ms', async () => {
    const promise = sleep(-100)
    jest.advanceTimersByTime(0)
    await promise
  })

  it('wait 是 sleep 的别名', () => {
    expect(wait).toBe(sleep)
  })
})

describe('toLocalTimeStr', () => {
  it('GMT8 时区返回原字符串', () => {
    const result = toLocalTimeStr('2024-01-15 12:00:00')
    expect(result).toBe('2024-01-15 12:00:00')
  })

  it('空输入返回空字符串', () => {
    expect(toLocalTimeStr('')).toBe('')
  })

  it('处理无效日期格式', () => {
    const result = toLocalTimeStr('invalid-date')
    expect(result).toBeDefined()
  })
})

describe('parseIOS8601', () => {
  it('空输入返回空字符串', () => {
    expect(parseIOS8601('')).toBe('')
  })

  it('解析完整 ISO8601 格式', () => {
    const result = parseIOS8601('2024-01-15T12:30:45')
    expect(result).toBeDefined()
  })

  it('解析纯日期格式', () => {
    const result = parseIOS8601('2024-01-15')
    expect(result).toBeDefined()
  })

  it('处理无效格式', () => {
    const result = parseIOS8601('invalid')
    expect(result).toBeDefined()
  })
})

describe('simpleTime', () => {
  it('空字符串返回 "-"', () => {
    expect(simpleTime('')).toBe('-')
  })

  it('undefined 返回 "-"', () => {
    expect(simpleTime()).toBe('-')
  })

  it('正确格式化时间', () => {
    const result = simpleTime('2024-01-15 12:30:00')
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })
})

describe('factory', () => {
  it('创建类实例', () => {
    class TestClass {
      value = 42
    }
    const instance = factory(TestClass)
    expect(instance).toBeInstanceOf(TestClass)
    expect(instance.value).toBe(42)
  })

  it('处理带参数的构造函数', () => {
    class TestClass {
      value: number
      constructor(value?: number) {
        this.value = value ?? 0
      }
    }
    const instance = factory(TestClass)
    expect(instance.value).toBe(0)
  })
})

describe('gradientColor', () => {
  it('生成渐变颜色', () => {
    const result = gradientColor([0, 0, 0], [255, 255, 255], 3)
    expect(result).toHaveLength(3)
    expect(result[0]).toContain('rgb(')
  })

  it('处理 step=0', () => {
    // 除零错误风险
    const result = gradientColor([0, 0, 0], [255, 255, 255], 0)
    expect(result).toHaveLength(0)
  })

  it('处理负数 step', () => {
    const result = gradientColor([0, 0, 0], [255, 255, 255], -1)
    expect(result).toHaveLength(0)
  })

  it('处理超出范围的 RGB 值', () => {
    const result = gradientColor([-10, 300, 0], [255, 255, 255], 3)
    expect(result).toHaveLength(3)
  })
})

describe('getRandomItems', () => {
  it('返回随机项', () => {
    const array = [1, 2, 3, 4, 5]
    const result = getRandomItems(array, 3)
    expect(result).toHaveLength(3)
    result.forEach(item => {
      expect(array).toContain(item)
    })
  })

  it('count >= 数组长度返回所有项', () => {
    const array = [1, 2, 3]
    const result = getRandomItems(array, 5)
    expect(result).toHaveLength(3)
  })

  it('count=0 返回空数组', () => {
    const array = [1, 2, 3]
    const result = getRandomItems(array, 0)
    expect(result).toEqual([])
  })

  it('空数组返回空数组', () => {
    const result = getRandomItems([], 5)
    expect(result).toEqual([])
  })

  it('处理负数 count', () => {
    const array = [1, 2, 3]
    const result = getRandomItems(array, -1)
    expect(result).toEqual([])
  })
})

describe('arrayBufferToBase64', () => {
  it('转换 buffer 为 base64', () => {
    const buffer = new ArrayBuffer(3)
    const view = new Uint8Array(buffer)
    view[0] = 72 // 'H'
    view[1] = 105 // 'i'
    view[2] = 33 // '!'
    const result = arrayBufferToBase64(buffer)
    expect(result).toBe('SGkh')
  })

  it('处理空 buffer', () => {
    const buffer = new ArrayBuffer(0)
    const result = arrayBufferToBase64(buffer)
    expect(result).toBe('')
  })

  it('处理包含 null 字节的 buffer', () => {
    const buffer = new ArrayBuffer(3)
    const view = new Uint8Array(buffer)
    view[0] = 0
    view[1] = 0
    view[2] = 0
    const result = arrayBufferToBase64(buffer)
    expect(result).toBe('AAAA')
  })
})
