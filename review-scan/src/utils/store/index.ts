/*
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 21:36:16
 */
import { action, configure, extendObservable, isObservableArray, toJS } from 'mobx'
import { LIST_EMPTY } from '@constants/constants'
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'
import { AnyObject, DeepPartial, Fn, Loaded, LocalState } from '@types'
import fetch, { queue } from '../fetch'
import { fetchSubjectV0 } from '../fetch.v0'
import { setStorage } from '../storage'
import { getItem } from '../storage/utils'
import { getTimestamp, omit } from '../utils'

configure({
  enforceActions: 'observed',
  useProxies: 'always'
})

/** 状态公共继承 */
export default class Store<
  T extends AnyObject<{
    _loaded?: Loaded
  }>
> {
  state: T

  constructor(initialState?: T) {
    this.state = initialState
  }

  /**
   * 同步的增量 setState 方法
   * @date 20190226
   * */
  // setState = action((state: DeepPartial<T>, stateKey: string = 'state') => {
  //   Object.entries(state).forEach(([key, item]) => {
  //     const observerTarget = this[stateKey]

  //     // 键值不存在时需手动创建观察
  //     if (!(key in observerTarget)) {
  //       extendObservable(observerTarget, {
  //         [key]: item
  //       })
  //       return
  //     }

  //     if (typeof item !== 'object') {
  //       observerTarget[key] = item
  //       return
  //     }

  //     // 第一层观察对象整个应用的逻辑都是增量修改
  //     if (!Array.isArray(item)) {
  //       observerTarget[key] = {
  //         ...observerTarget[key],
  //         ...item
  //       }
  //       return
  //     }

  //     if (isObservableArray(observerTarget[key])) {
  //       observerTarget[key].replace(item)
  //       return
  //     }

  //     observerTarget[key] = item
  //   })
  // })

  /**
   * 同步的增量 setState 方法（优化版）
   * @date 20250418
   * */
  setState = action((state: DeepPartial<T>, stateKey: string = 'state') => {
    const observerTarget = this[stateKey]
    const newProps: Record<string, any> = {}
    const updates: Array<{ key: string; item: any }> = []

    // 第一次遍历：收集新属性和待更新项
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const item = state[key]
        if (!(key in observerTarget)) {
          newProps[key] = item
        } else {
          updates.push({ key, item })
        }
      }
    }

    // 批量添加新属性
    if (Object.keys(newProps).length > 0) {
      extendObservable(observerTarget, newProps)
    }

    // 第二次遍历：处理更新
    for (const { key, item } of updates) {
      const current = observerTarget[key]

      // 基本类型或 null：直接比较并赋值
      if (item === null || typeof item !== 'object') {
        if (current === item) continue

        observerTarget[key] = item
        continue
      }

      // 数组处理
      if (Array.isArray(item)) {
        if (current === item) continue
        if (isObservableArray(current)) {
          current.replace(item)
        } else {
          observerTarget[key] = item
        }
        continue
      }

      // 对象处理
      if (current === item) continue

      if (current !== null && typeof current === 'object' && !Array.isArray(current)) {
        // 增量合并属性，仅更新变化的属性
        for (const subKey in item) {
          if (Object.prototype.hasOwnProperty.call(item, subKey)) {
            const nextVal = item[subKey]
            if (current[subKey] !== nextVal) current[subKey] = nextVal
          }
        }
      } else {
        // 当前值非对象，直接替换
        observerTarget[key] = item
      }
    }
  })

  /**
   * 清除一个 state
   * @param {*} key state 的键值
   * @param {*} data 置换值
   */
  clearState = action((key: string, data: any = {}) => {
    if (typeof this.state[key] === 'undefined') {
      extendObservable(this.state, {
        [key]: data
      })
    } else {
      // @ts-expect-error
      this.state[key] = data
    }
  })

  /**
   * 请求并入 Store, 入 Store 成功会设置标志位 _loaded=date()
   * 请求失败后会在 1 秒后递归重试
   * @version 190420 v1.2
   * @param {*} fetchConfig
   * @param {*} stateKey     入Store的key (['a', 'b'] 表示 this.state.a.b)
   * @param {*} otherConfig
   */
  fetch = async (
    fetchConfig: any,
    stateKey?: keyof T | [keyof T, string | number],
    otherConfig: {
      /** 本地化空间 */
      namespace?: string

      /** 是否本地化 */
      storage?: boolean

      /** 是否把响应的数组转化为 LIST_EMPTY 结构 */
      list?: boolean
    } = {}
  ) => {
    const { list, storage, namespace } = otherConfig
    let mergeConfig: any = {}
    if (typeof fetchConfig === 'object') {
      mergeConfig = {
        ...fetchConfig
      }
    } else {
      mergeConfig.url = fetchConfig
    }
    mergeConfig.retryCb = () => this.fetch(fetchConfig, stateKey, otherConfig)

    let data = await fetch(mergeConfig)

    // 20220216 以下旧 API 不再响应 NSFW 条目, 暂时使用请求网页代替
    if (mergeConfig?.info === '条目信息') {
      switch (mergeConfig?.info) {
        case '条目信息':
          if (!data?.id) data = await fetchSubjectV0(fetchConfig)
          break

        default:
          break
      }
    }

    let mergeData: any
    if (Array.isArray(data)) {
      if (list) {
        mergeData = {
          ...LIST_EMPTY,
          list: data,
          _loaded: getTimestamp()
        }
      } else {
        mergeData = data
      }
    } else {
      mergeData = {
        ...data,
        _loaded: getTimestamp()
      }
    }

    const error: string = data?.error || ''
    if (Array.isArray(stateKey)) {
      // 若之前已缓存过数据, 若出现 token 过期等情况, 不把缓存覆盖以尽可能显示既有数据
      if (error && this.state?.[stateKey[0]]?.[stateKey[1]]?._loaded) return mergeData

      // @ts-expect-error
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: mergeData
        }
      })
    } else if (stateKey) {
      // 同上
      if (error && this.state?.[stateKey]?._loaded) return mergeData

      // @ts-expect-error
      this.setState({
        [stateKey]: mergeData || this.state[stateKey]
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey

      // @ts-expect-error
      this.setStorage(key, undefined, namespace)
    }

    return mergeData
  }

  /**
   * 存入本地缓存
   * @deprecated
   * @param {*} key
   * @param {*} value
   * @param {*} namespace 空间名其实一定要传递的
   */
  setStorage = (key: string, value?: any, namespace?: any) => {
    // 只传了一个参数时, 第一个参数作为 namespace
    if (value === undefined && namespace === undefined) {
      // @ts-expect-error
      let _key = key || this.namespace
      _key += '|state'

      const data = this.state
      return setStorage(_key, data)
    }

    // @ts-expect-error
    let _key = namespace || this.namespace
    if (key) _key += `|${key}`
    _key += '|state'

    const data = key ? value || this.state[key] : this.state
    return setStorage(_key, data)
  }

  /**
   * 代替 this.setStorage(undefined, undefined, namespace)
   * 若传递了 excludeState, 还会排除不本地化的 key
   * */
  saveStorage = (namespace: string, excludeState?: AnyObject) => {
    // @ts-expect-error
    if (!(namespace || this.namespace)) return false

    if (excludeState) {
      // @ts-expect-error
      const key = `${namespace || this.namespace}|state`

      const data = omit(this.state, Object.keys(excludeState))

      // if (DEV) {
      //   const a = JSON.stringify(this.state).length
      //   const b = JSON.stringify(data).length
      //   console.info('saveStorage', a, b, `${((b / a) * 100).toFixed(1)}%`)
      // }

      return setStorage(key, data)
    }

    // @ts-expect-error
    return this.setStorage(undefined, undefined, namespace || this.namespace)
  }

  /**
   * 读取本地缓存
   * @param {*} key
   * @param {*} namespace 空间名其实一定要传递的
   * @param {*} defaultValue
   */
  getStorage = async (key: string, namespace?: string, defaultValue?: any): Promise<any> => {
    try {
      // 只传了一个参数时, 第一个参数作为 namespace
      if (namespace === undefined && defaultValue === undefined) {
        // @ts-expect-error
        let _key = key || this.namespace
        _key += '|state'
        return (
          JSON.parse((await getItem(_key)) || null) ||
          (defaultValue === undefined ? {} : defaultValue)
        )
      }

      // @ts-expect-error
      let _key = namespace || this.namespace
      if (key) _key += `|${key}`
      _key += '|state'
      return (
        JSON.parse((await getItem(_key)) || null) ||
        (defaultValue === undefined ? {} : defaultValue)
      )
    } catch (error) {
      return defaultValue === undefined ? {} : defaultValue
    }
  }

  /**
   * 读取本地缓存 (若已读取则不再次读取)
   * @param {*} namespace 空间名
   * */
  getStorageOnce = async <State extends object, ExcludeState extends object = {}>(
    namespace: string
  ) => {
    return (this.state._loaded ? {} : await this.getStorage(namespace)) as LocalState<
      State,
      ExcludeState
    >
  }

  /**
   * 批量读取缓存并入库
   * @param {*} config 约定的配置
   * @param {*} namespace 命名空间
   */
  readStorage = async (config: string[] = [], namespace: string) => {
    if (!config.length) return true

    const data = await Promise.all(
      config.map(key => this.getStorage(key, namespace, this.state[key]))
    )
    const state = Object.assign(
      {},
      ...config.map((key, index) => ({
        [key]: data[index]
      }))
    )
    this.setState(state)
    return state
  }

  /**
   * 将一个 observableObject 转化为 javascript 原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS = <State extends object>(key: string): State => toJS(this.state[key] || this.state)

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

  /** 创建带 loading 状态的方法 */
  withLoading<K extends keyof T>(
    stateKey: K & (T[K] extends boolean ? K : never),
    fn: (...args: any[]) => Promise<any>
  ) {
    return async (...args: any[]) => {
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

  /** 开发调试 */
  log(...arg: any) {
    if (DEV) console.info(TEXT_BADGES.primary, ...arg)
  }

  /** 开发打印 */
  error = (...arg: any) => {
    if (DEV) console.info(TEXT_BADGES.danger, ...arg)
  }
}
