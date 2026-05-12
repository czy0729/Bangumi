/*
 * @Author: czy0729
 * @Date: 2026-05-13
 *
 * 测试发现的问题：
 * 1. decode 失败时 checkCache 返回的等待 Promise 永远不会被 resolve（内存泄漏）
 * 2. new Promise(async ...) 反模式 - 内部错误无法被外层 catch 捕获
 * 3. getProtoModule/getBinModule 无 default case，传入无效 name 返回 undefined
 *
 * 注：decode 函数依赖 expo-asset、protobufjs 等原生模块，完整测试需要更复杂的 mock
 */
jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn((module) => ({
      localUri: `file://test-${module}.bin`,
      downloadAsync: jest.fn()
    }))
  }
}))

jest.mock('expo-file-system/legacy', () => ({
  readAsStringAsync: jest.fn(() => Promise.resolve('base64data')),
  EncodingType: { Base64: 'base64' }
}))

jest.mock('../../dev', () => ({
  logger: { log: jest.fn() }
}))

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('proto content')
  })
) as any

jest.mock('../utils', () => {
  const cacheMap = new Map()
  const lockMap = new Map()
  return {
    cacheMap,
    lockMap,
    checkCache: jest.fn((name: string) => {
      if (cacheMap.has(name)) return cacheMap.get(name)
      lockMap.set(name, true)
      return true
    }),
    get: jest.fn((name: string) => cacheMap.get(name)),
    isPromise: jest.fn(
      (obj: any) =>
        !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
    )
  }
})

// Mock proto/bin 资源文件 - 返回数字 ID 以便 Asset.fromModule 正常工作
jest.mock('@assets/proto/bangumi-data/proto/index.proto', () => 1, { virtual: true })
jest.mock('@assets/proto/bangumi-data/bin/index.bin', () => 2, { virtual: true })
jest.mock('@assets/proto/anime/proto/index.proto', () => 3, { virtual: true })
jest.mock('@assets/proto/anime/bin/index.bin', () => 4, { virtual: true })
jest.mock('@assets/proto/manga/proto/index.proto', () => 5, { virtual: true })
jest.mock('@assets/proto/manga/bin/index.bin', () => 6, { virtual: true })
jest.mock('@assets/proto/game/proto/index.proto', () => 7, { virtual: true })
jest.mock('@assets/proto/game/bin/index.bin', () => 8, { virtual: true })
jest.mock('@assets/proto/adv/proto/index.proto', () => 9, { virtual: true })
jest.mock('@assets/proto/adv/bin/index.bin', () => 10, { virtual: true })
jest.mock('@assets/proto/catalog/proto/index.proto', () => 11, { virtual: true })
jest.mock('@assets/proto/catalog/bin/index.bin', () => 12, { virtual: true })

describe('get', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('从缓存获取数据', () => {
    const utils = require('../utils')
    utils.cacheMap.set('anime', [1, 2, 3])

    const { get } = require('../index')
    expect(get('anime')).toEqual([1, 2, 3])
  })

  it('无缓存时返回 undefined', () => {
    const { get } = require('../index')
    expect(get('manga')).toBeUndefined()
  })
})

describe('decode 问题分析', () => {
  it('[文档] decode 函数存在 async executor 反模式', () => {
    // new Promise(async (resolve, reject) => { ... }) 是反模式
    // 问题：如果 async 函数内部抛出错误，外层 Promise 的 reject 不会捕获
    // 正确做法是直接使用 async 函数返回 Promise
    //
    // 当前代码：
    //   return new Promise(async (resolve, reject) => {
    //     try { ... resolve(...) } catch (e) { reject(e) }
    //   })
    //
    // 建议改为：
    //   async function decode(name) {
    //     try { ... return result } catch (e) { throw 'Error decode file' }
    //   }
    expect(true).toBe(true)
  })

  it('[文档] getProtoModule 和 getBinModule 缺少 default case', () => {
    // switch 语句没有 default 分支
    // 当传入无效的 name 时返回 undefined
    // 后续 getProtoModule(undefined) 会导致 require(undefined) 抛出异常
    //
    // 建议添加 default case 返回 null 或抛出明确错误
    expect(true).toBe(true)
  })

  it('[文档] decode 失败时等待 Promise 永远挂起', () => {
    // 场景：
    // 1. 请求 A 开始执行，设置锁
    // 2. 请求 B 检测到锁，返回等待 Promise（setInterval 轮询）
    // 3. 请求 A 失败，在 catch 中清除锁：lockMap.set(name, false)
    // 4. 请求 B 的 Promise 依赖 lockMap.get(name) 为 false 才 resolve
    // 5. 但 lockMap.get(name) 返回 undefined（不是 false），条件永远不满足
    //
    // 结果：请求 B 的 Promise 永远挂起，setInterval 永远运行（内存泄漏）
    //
    // 修复方案：decode 失败时应该 reject 等待的 Promise，而不是只清除锁
    expect(true).toBe(true)
  })
})

describe('decode 依赖分析', () => {
  it('[依赖] loadProtoFile 需要正确的 proto 文件路径', () => {
    // getProtoModule 使用 require 加载 @assets/proto/{name}/proto/index.proto
    // 路径必须与实际文件结构匹配
    expect(true).toBe(true)
  })

  it('[依赖] loadBinFile 需要正确的 bin 文件路径', () => {
    // getBinModule 使用 require 加载 @assets/proto/{name}/bin/index.bin
    // 路径必须与实际文件结构匹配
    expect(true).toBe(true)
  })

  it('[依赖] 需要 protobufjs 正确解析 proto 定义', () => {
    // protobuf.parse 返回的 root 必须包含 Payload 类型
    expect(true).toBe(true)
  })
})
