/*
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-13 20:09:46
 */
import { action, configure, extendObservable, isObservableArray, toJS } from 'mobx'
import { LIST_EMPTY } from '@constants/constants'
import { AnyObject, DeepPartial, Loaded } from '@types'
import fetch from '../fetch'
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
  /** 同步的增量 setState 方法 */
  setState = action((state: DeepPartial<T>, stateKey: string = 'state') => {
    Object.entries(state).forEach(([key, item]) => {
      const observerTarget = this[stateKey]

      // 键值不存在时需手动创建观察
      if (!(key in observerTarget)) {
        extendObservable(observerTarget, {
          [key]: item
        })
        return
      }

      if (typeof item !== 'object') {
        observerTarget[key] = item
        return
      }

      // 第一层观察对象整个应用的逻辑都是增量修改
      if (!Array.isArray(item)) {
        observerTarget[key] = {
          ...observerTarget[key],
          ...item
        }
        return
      }

      if (isObservableArray(observerTarget[key])) {
        observerTarget[key].replace(item)
        return
      }

      observerTarget[key] = item
    })
  })

  /**
   * 清除一个 state
   * @param {*} key state 的键值
   * @param {*} data 置换值
   */
  clearState = action((key: string, data: any = {}) => {
    // @ts-expect-error
    if (typeof this.state[key] === 'undefined') {
      // @ts-expect-error
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
    let _fetchConfig: any = {}
    if (typeof fetchConfig === 'object') {
      _fetchConfig = {
        ...fetchConfig
      }
    } else {
      _fetchConfig.url = fetchConfig
    }
    _fetchConfig.retryCb = () => this.fetch(fetchConfig, stateKey, otherConfig)

    const res = fetch(_fetchConfig)
    let data = await res

    /* ===== @todo start 20220216 以下旧 API 不再响应敏感条目, 暂时使用请求网页代替 ===== */
    if (_fetchConfig?.info === '条目信息') {
      switch (_fetchConfig?.info) {
        case '条目信息':
          if (!data?.id) data = await fetchSubjectV0(fetchConfig)
          break

        default:
          break
      }
    }
    /* ===== @todo end ===== */

    let _data
    if (Array.isArray(data)) {
      if (list) {
        _data = {
          ...LIST_EMPTY,
          list: data,
          _loaded: getTimestamp()
        }
      } else {
        _data = data
      }
    } else {
      _data = {
        ...data,
        _loaded: getTimestamp()
      }
    }

    if (Array.isArray(stateKey)) {
      // @ts-expect-error
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: _data
        }
      })
    } else if (stateKey) {
      // @ts-expect-error
      const initState = this.state[stateKey]

      // @ts-expect-error
      this.setState({
        [stateKey]: _data || initState
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey

      // @ts-expect-error
      this.setStorage(key, undefined, namespace)
    }

    return _data
  }

  /**
   * 存入本地缓存
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

      // @ts-expect-error
      const data = this.state
      return setStorage(_key, data)
    }

    // @ts-expect-error
    let _key = namespace || this.namespace
    if (key) _key += `|${key}`
    _key += '|state'

    // @ts-expect-error
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

      // @ts-expect-error
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
      JSON.parse((await getItem(_key)) || null) || (defaultValue === undefined ? {} : defaultValue)
    )
  }

  /**
   * 批量读取缓存并入库
   * @param {*} config 约定的配置
   * @param {*} namespace 命名空间
   */
  readStorage = async (config: string[] = [], namespace: string) => {
    if (!config.length) return true

    const data = await Promise.all(
      // @ts-expect-error
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
  // @ts-expect-error
  toJS = (key: string): object => toJS(this.state[key] || this.state)
}
