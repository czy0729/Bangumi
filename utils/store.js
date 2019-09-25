/*
 * 状态公共继承
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-25 21:16:58
 */
import { AsyncStorage } from 'react-native'
import { configure, extendObservable, computed, action, toJS } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { getTimestamp } from '@utils'
import fetch from './fetch'

configure({
  enforceActions: 'observed'
})

export default class Store {
  setup = () => {
    this.generateComputed()
  }

  /**
   * 根据配置[this.computed]自动生成get
   * @param {*} config
   * computed = [
   *   'key', // case 1
   *   ['key', defaultValue], // case 2
   *   ['key', defaultValue, stringArg], // case 3
   *   ['key', defaultValue, funcArg] // case 4
   */
  generateComputed = () => {
    if (!Array.isArray(this.computed)) {
      return
    }

    this.computed.forEach(item => {
      // case 1
      if (typeof item === 'string') {
        Object.defineProperty(this, item, {
          get() {
            return computed(() => this.state[item]).get()
          }
        })
        return
      }

      const [key, defaultValue, defaultArg] = item

      // case 4
      if (typeof defaultArg === 'function') {
        this[key] = (...arg) =>
          computed(() => this.state[key][defaultArg(...arg)]).get() ||
          defaultValue
      } else {
        // case 2, 3
        this[key] = () =>
          computed(() => this.state[key][defaultArg]).get() || defaultValue
      }
    })
  }

  /**
   * MobX计算
   * @param {*} *key         state的键值
   * @param {*} arg          第一个参数
   * @param {*} defaultValue 默认值
   */
  computed = (key, arg, defaultValue = '') =>
    computed(() => (arg ? this.state[key][arg] : this.state[key])).get() ||
    defaultValue

  /**
   * 统一setState方法
   * @version 190226 v1.0
   * @param {*} *state
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
   * 清除一个state
   * @param {*} *key state的键值
   * @param {*} data 置换值
   */
  clearState = action((key, data = {}) => {
    if (typeof this.state[key] === 'undefined') {
      extendObservable(this.state, {
        [key]: data
      })
    } else {
      this.state[key] = data
    }
  })

  /**
   * 请求并入Store, 入Store成功会设置标志位_loaded=date()
   * 请求失败后会在1秒后递归重试
   * @version 190420 v1.2
   * @param {String|Object} *fetchConfig
   * @param {String|Array}  *stateKey           入Store的key (['a', 'b']表示this.state.a.b)
   * @param {*}             otherConfig.list    是否把响应的数组转化为LIST_EMPTY结构
   * @param {*}             otherConfig.storage 是否本地化
   * @return {Promise}
   */
  async fetch(fetchConfig, stateKey, otherConfig = {}) {
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
    const data = await res

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
    } else {
      const initState = this.state[stateKey]
      this.setState({
        [stateKey]: _data || initState
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey
      this.setStorage(key, undefined, namespace)
    }

    return res
  }

  /**
   * 存入本地缓存
   * @param {*} *key
   * @param {*} value
   * @param {*} namesapce 空间名其实一定要传递的, 不能依赖this.getName, 打包后会丢失
   */
  setStorage(key, value, namesapce) {
    let _key = namesapce || this.getName()
    if (key) {
      _key += `|${key}`
    }
    _key += '|state'

    return AsyncStorage.setItem(
      _key,
      JSON.stringify(key ? value || this.state[key] : this.state)
    )
  }

  /**
   * 读取本地缓存
   * @param {*} *key
   * @param {*} value
   * @param {*} namesapce 空间名其实一定要传递的, 不能依赖this.getName, 打包后会丢失
   */
  async getStorage(key, namesapce, defaultValue) {
    let _key = namesapce || this.getName()
    if (key) {
      _key += `|${key}`
    }
    _key += '|state'

    return JSON.parse(await AsyncStorage.getItem(_key)) || defaultValue
  }

  /**
   * 批量读取缓存并入库
   * @param {*} *config    约定的配置
   * @param {*} *namespace 命名空间
   */
  async readStorageThenSetState(config, namespace) {
    const keys = Object.keys(config)
    const data = await Promise.all(
      keys.map(key => this.getStorage(key, namespace, config[key]))
    )

    const state = Object.assign(
      {},
      ...keys.map((key, index) => ({
        [key]: data[index]
      }))
    )
    this.setState(state)

    return state
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
   * [已废弃]取类名
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
