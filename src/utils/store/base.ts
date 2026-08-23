/*
 * Store 共享基类 —— 与请求入库策略无关的全部成员
 * 差异成员(fetch / toJS)由 LegacyStore 与 Store 各自实现
 * @Author: czy0729
 * @Date: 2026-08-23 15:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 17:50:39
 */
import { action, extendObservable } from 'mobx'
import isEqual from 'lodash.isequal'
import { DEV } from '@src/config'
import { logger } from '../dev'
import { queue } from '../fetch'
import { setStorage } from '../storage'
import { getItem } from '../storage/utils'
import { omit } from '../utils'
import { applyStateDiff, buildStorageKey } from './utils'

import type { DeepPartial, Fn, LocalState } from '@types'
import type { StoreState, WritableState } from './types'

/** 状态公共基类 —— 承载各版本 Store 的共享成员 */
export default class BaseStore<T extends StoreState> {
  state: T

  constructor(initialState?: T) {
    this.state = initialState
  }

  /**
   * 同步的增量 setState: 新键批量注册、基本类型替换、observable 数组原地替换、对象逐键合并
   * @param state 增量状态
   * @param stateKey 目标容器成员名, 默认 'state'
   */
  setState = action((state: DeepPartial<T>, stateKey: string = 'state') => {
    const observerTarget = (this as unknown as Record<string, WritableState>)[stateKey]
    applyStateDiff(observerTarget, state)
  })

  /**
   * 清除一个 state 为指定置换值
   * @param key 状态键
   * @param data 置换值, 缺省为空对象
   */
  clearState = action((key: string, data: unknown = {}) => {
    if (typeof this.state[key] === 'undefined') {
      extendObservable(this.state, {
        [key]: data
      })
    } else {
      const target = this.state as WritableState
      target[key] = data
    }
  })

  /**
   * 安全读取状态值，自动推导返回类型
   * @param key 状态键
   * @param itemKey 可选，当状态值为 Record 时的子键
   * @param defaultValue 可选，值为空时的默认值
   */
  getState<K extends keyof T>(key: K): T[K]
  getState<K extends keyof T, I extends string | number>(
    key: K,
    itemKey: I,
    defaultValue?: unknown
  ): T[K] extends { [k: string]: infer V } ? V : T[K]
  getState(key: keyof T, itemKey?: string | number, defaultValue?: unknown): unknown {
    if (itemKey === undefined) return this.state[key]
    const value = (this.state[key] as WritableState)?.[itemKey]
    return value ?? defaultValue
  }

  /** 历史遗留: 旧存储方法会回退读取实例上的 namespace 属性 */
  private getNamespace(): string | undefined {
    return (this as { namespace?: string }).namespace
  }

  /**
   * 存入本地缓存
   * @deprecated 请改用 saveStorage / getStorageOnce
   * @param key 状态键
   * @param value 缓存值, 缺省时取当前状态值
   * @param namespace 命名空间
   * @note 历史约定: 仅传 key 一个参数时, 其会被当作命名空间使用
   */
  setStorage = (key?: string, value?: unknown, namespace?: string) => {
    // 只传了一个参数时, 第一个参数作为 namespace
    if (value === undefined && namespace === undefined) {
      return setStorage(buildStorageKey(key || this.getNamespace()), this.state)
    }

    const _key = buildStorageKey(namespace || this.getNamespace(), key)
    const data = key ? value || this.state[key] : this.state
    return setStorage(_key, data)
  }

  /**
   * 将状态写入本地缓存
   * @param namespace 命名空间
   * @param excludeState 需要排除持久化的键集合
   */
  saveStorage = (namespace: string, excludeState?: object) => {
    if (!(namespace || this.getNamespace())) return false

    if (excludeState) {
      const key = buildStorageKey(namespace || this.getNamespace())

      const data = omit(this.state, Object.keys(excludeState))

      return setStorage(key, data)
    }

    return this.setStorage(undefined, undefined, namespace || this.getNamespace())
  }

  /**
   * 读取本地缓存, 返回解析后的 JSON(未定型缓存边界, 见方法内说明)
   * @param key 状态键
   * @param namespace 命名空间
   * @param defaultValue 缓存缺失时的默认值, 缺省为空对象
   */
  getStorage = async (key: string, namespace?: string, defaultValue?: unknown) => {
    try {
      // 只传了一个参数时, 第一个参数作为 namespace
      const _key =
        namespace === undefined && defaultValue === undefined
          ? buildStorageKey(key || this.getNamespace())
          : buildStorageKey(namespace || this.getNamespace(), key)

      const raw = await getItem(_key)

      /*
       * 未定型缓存边界: JSON.parse 返回 any, 与 fetch 网络边界同策略 ——
       * 消费端(227+ 处)依赖返回值的宽松形态, 定型将破坏全部调用点
       */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (raw ? JSON.parse(raw) : null) || (defaultValue === undefined ? {} : defaultValue)
    } catch (error) {
      return defaultValue === undefined ? {} : defaultValue
    }
  }

  /**
   * 读取本地缓存(状态已加载过时直接返回空对象)
   * @param namespace 命名空间
   */
  getStorageOnce = async <State extends object, ExcludeState extends object = {}>(
    namespace: string
  ) => {
    return (this.state._loaded ? {} : await this.getStorage(namespace)) as LocalState<
      State,
      ExcludeState
    >
  }

  /**
   * 批量读取缓存并并入状态
   * @param config 状态键列表
   * @param namespace 命名空间
   */
  readStorage = async (config: string[] = [], namespace: string) => {
    if (!config.length) return true

    // getStorage 为未定型缓存边界(见上), 批量结果保持宽松形态
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await Promise.all(
      config.map(key => this.getStorage(key, namespace, this.state[key]))
    )
    const entries = data as unknown[]

    const state: Record<string, unknown> = {}
    config.forEach((key, index) => {
      state[key] = entries[index]
    })
    this.setState(state as DeepPartial<T>)
    return state
  }

  /** 唯一队列请求 */
  private _memoFetched = new Map<Fn, true>()

  /** 唯一队列请求 */
  fetchQueueUnique = (fetchs: Fn[]) => {
    setTimeout(() => {
      queue(
        fetchs.map(callback => {
          return async () => {
            if (!this._memoFetched.has(callback)) {
              this._memoFetched.set(callback, true)
              await callback()
            }
            return true
          }
        })
      )
    }, 200 * this._memoFetched.size)
  }

  /**
   * 创建带 loading 状态的方法
   * 执行期间将 state[stateKey] 置为 true, 结束后置回 false
   * @param stateKey boolean 类型的状态键
   * @param fn 待包裹的异步方法
   */
  withLoading<K extends keyof T>(
    stateKey: K & (T[K] extends boolean ? K : never),
    fn: Fn
  ): (...args: unknown[]) => Promise<unknown> {
    return async (...args: unknown[]) => {
      try {
        this.setState({
          [stateKey]: true
        } as DeepPartial<T>)
        return await fn(...args)
      } finally {
        this.setState({
          [stateKey]: false
        } as DeepPartial<T>)
      }
    }
  }

  /** 忽略 _loaded 更新时间, 深比较两个状态是否一致 */
  isEqual = (prevState: object, nextState: object): boolean => {
    // 引用相等快速路径
    if (prevState === nextState) return true

    return isEqual(
      {
        ...prevState,
        _loaded: 0
      },
      {
        ...nextState,
        _loaded: 0
      }
    )
  }

  /** 开发调试 */
  log(method: string, ...arg: unknown[]) {
    if (DEV) logger.info(method, ...arg)
  }

  /** 开发打印 */
  error = (method: string, ...arg: unknown[]) => {
    if (DEV) logger.error(method, ...arg)
  }
}
