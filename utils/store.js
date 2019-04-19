/*
 * 状态公共继承
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 01:05:07
 */
import { AsyncStorage } from 'react-native'
import { configure, extendObservable, action, toJS } from 'mobx'
import fetch from './fetch'

configure({ enforceActions: 'observed' })

export default class Store {
  /**
   * 统一setState方法
   * @version 190226 v1.0
   */
  setState = action(state => {
    Object.keys(state).forEach(key => {
      const data = state[key]
      if (!(key in this.state)) {
        // 键值不存在时需手动创建观察
        extendObservable(this.state, {
          [key]: data
        })
      } else if (typeof data === 'object' && !Array.isArray(data)) {
        this.state[key] = {
          ...this.state[key],
          ...data
        }
      } else {
        this.state[key] = data
      }
    })
  })

  /**
   * 请求并入库, 请求失败后会在1秒后递归重试
   * @version 190227 v1.0
   * @param {*} urlConfig
   * @param {*} stateKey
   * @return {Promise}
   */
  async fetch(urlConfig, stateKey, config = {}) {
    const { storage } = config
    let fetchConfig = {}
    if (typeof urlConfig === 'object') {
      fetchConfig = {
        ...urlConfig
      }
    } else {
      fetchConfig.url = urlConfig
    }
    fetchConfig.retryCb = () => this.fetch(urlConfig, stateKey)

    const res = fetch(fetchConfig)
    const data = await res
    if (Array.isArray(stateKey)) {
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: data
        }
      })
    } else {
      const defaultState = this.state[stateKey]
      this.setState({
        [stateKey]: data || defaultState
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey
      this.setStorage(key)
    }

    return res
  }

  /**
   * AsyncStorage.setItem
   * @param {*} *key
   * @param {*} value
   */
  setStorage(key, value) {
    if (!key) {
      return AsyncStorage.setItem(
        `${this.getName()}|state`,
        JSON.stringify(this.state)
      )
    }

    return AsyncStorage.setItem(
      `${this.getName()}|${key}|state`,
      JSON.stringify(value || this.state[key])
    )
  }

  /**
   * AsyncStorage.getItem
   * @param {*} key
   */
  async getStorage(key) {
    if (!key) {
      return JSON.parse(await AsyncStorage.getItem(`${this.getName()}|state`))
    }

    return JSON.parse(
      await AsyncStorage.getItem(`${this.getName()}|${key}|state`)
    )
  }

  /**
   * 将一个observableObject转化为javascript原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS(key) {
    return toJS(this.state[key] || this.state)
  }

  /**
   * 取类名
   */
  getName() {
    let s = this.constructor.toString()
    if (s.indexOf('function') == -1) {
      return null
    }

    s = s.replace('function', '')
    const idx = s.indexOf('(')
    s = s.substring(0, idx)
    s = s.replace(' ', '')
    return s
  }
}

/**
 * h5测试
 * 190228 v1.0
 * @param {*} config
 * @param {*} stateKey
 * @return {Promise}
 */
export function dev() {
  // if (!window.Stores) {
  //   window.Stores = {
  //     toJS: () => {
  //       const stores = {}
  //       Object.keys(window.Stores).forEach(storeKey => {
  //         if (window.Stores[storeKey].toJS) {
  //           stores[storeKey] = window.Stores[storeKey].toJS()
  //         }
  //       })
  //     }
  //   }
  // }
  // window.Stores[key] = store
}
