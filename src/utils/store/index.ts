// @ts-nocheck
/*
 * 状态公共继承
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 15:57:42
 */
import { action, configure, extendObservable, isObservableArray, toJS } from 'mobx'
import AsyncStorage from '@components/@/react-native-async-storage'
import { LIST_EMPTY } from '@constants/constants'
import { getTimestamp } from '../utils'
import { setStorage } from '../storage'
import fetch from '../fetch'
import { fetchSubjectV0 } from '../fetch.v0'

configure({
  enforceActions: 'observed',
  useProxies: 'never'
})

export default class Store {
  /**
   * 统一 setState 方法
   * @version 190226 v1.0
   * @param {*} state
   */
  setState = action((state: any, stateKey: string = 'state') => {
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
   * @param {*} key state的键值
   * @param {*} data 置换值
   */
  clearState = action((key: string, data: any = {}) => {
    if (typeof this.state[key] === 'undefined') {
      extendObservable(this.state, {
        [key]: data
      })
    } else {
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
    stateKey?: string | number | (string | number)[],
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
    let _fetchConfig = {}
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
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: _data
        }
      })
    } else if (stateKey) {
      const initState = this.state[stateKey]
      this.setState({
        [stateKey]: _data || initState
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey
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
      let _key = key || this.namespace
      _key += '|state'
      const data = this.state
      return setStorage(_key, data)
    }

    let _key = namespace || this.namespace
    if (key) _key += `|${key}`
    _key += '|state'

    const data = key ? value || this.state[key] : this.state
    return setStorage(_key, data)
  }

  /**
   * 读取本地缓存
   * @param {*} key
   * @param {*} namespace 空间名其实一定要传递的
   * @param {*} defaultValue
   */
  getStorage = async (
    key: string,
    namespace?: string,
    defaultValue?: any
  ): Promise<any> => {
    // 只传了一个参数时, 第一个参数作为 namespace
    if (namespace === undefined && defaultValue === undefined) {
      let _key = key || this.namespace
      _key += '|state'
      return (
        JSON.parse(await AsyncStorage.getItem(_key)) ||
        (defaultValue === undefined ? {} : defaultValue)
      )
    }

    let _key = namespace || this.namespace
    if (key) _key += `|${key}`
    _key += '|state'

    return (
      JSON.parse(await AsyncStorage.getItem(_key)) ||
      (defaultValue === undefined ? {} : defaultValue)
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

  /** 代替 this.setStorage(undefined, undefined, namespace) */
  saveStorage = (namespace: string) => {
    if (!(namespace || this.namespace)) return false
    this.setStorage(undefined, undefined, namespace || this.namespace)
  }

  /**
   * 将一个 observableObject 转化为 javascript 原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS = (key: string): object => toJS(this.state[key] || this.state)
}
