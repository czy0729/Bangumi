/*
 * 状态公共继承
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-13 15:12:17
 */
import AsyncStorage from '@react-native-community/async-storage'
import { configure, extendObservable, computed, action, toJS } from 'mobx'
import { getTimestamp } from '@utils'
import { LIST_EMPTY } from '@constants'
import fetch from './fetch'

configure({
  enforceActions: 'observed'
})

export default class Store {
  /**
   * Store new后调用的方法
   */
  setup = () => {
    // console.info('\n')
    // console.info(`========== ${this.getName()} store setup start ==========`)
    this.initComputed()
    // console.info(`========== ${this.getName()} store setup end ==========`)
  }

  /**
   * 自动使用Store.state来遍历配置初始MobX的computed
   * 所有state里的键值, 都可以通过this.key的方式调用而不需要this.state.key
   */
  initComputed = () => {
    Object.keys(this.state).forEach(key => {
      /**
       * 已有computed跳过
       */
      if (this[key] !== undefined) {
        // console.info(`skip [computed] ${key}`)
        return
      }

      /**
       * 情况1
       * @computed get userInfo() {
       *   return this.state.userInfo
       * }
       */
      if (this.state[key][0] === undefined) {
        Object.defineProperty(this, key, {
          get() {
            return computed(() => this.state[key]).get()
          }
        })
        // console.info(`[computed] ${key}`)
        return
      }

      /**
       * 情况3
       * userCollections(scope = DEFAULT_SCOPE, userId = this.myUserId) {
       *   return computed(
       *     () => this.state.userCollections[`${scope}|${userId}`] || LIST_EMPTY
       *   ).get()
       * }
       */
      if (
        typeof this.state[key] === 'object' &&
        typeof this.state[key]._ === 'function'
      ) {
        this[key] = (...arg) => {
          const id = this.state[key]._(...arg)
          return computed(() => this.state[key][id] || this.state[key][0]).get()
        }
        // console.info(`[computed] ${key}(...arg)`)
        return
      }

      /**
       * 情况2
       * subject(subjectId) {
       *   return computed(
       *     () => this.state.subject[subjectId] || INIT_SUBJECT
       *   ).get()
       * }
       */
      this[key] = (id = 0) =>
        computed(() => this.state[key][id] || this.state[key][0]).get()
      // console.info(`[computed] ${key}(id)`)
    })
  }

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
  fetch = async (fetchConfig, stateKey, otherConfig = {}) => {
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
  setStorage = (key, value, namesapce) => {
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
  getStorage = async (key, namesapce, defaultValue = {}) => {
    let _key = namesapce || this.getName()
    if (key) {
      _key += `|${key}`
    }
    _key += '|state'

    return JSON.parse(await AsyncStorage.getItem(_key)) || defaultValue
  }

  /**
   * 批量读取缓存并入库V2
   * @param {*} *config    约定的配置
   * @param {*} *namespace 命名空间
   */
  readStorage = async (config = [], namespace) => {
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
   * 将一个observableObject转化为javascript原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS = key => toJS(this.state[key] || this.state)

  /**
   * 取类名
   * @notice apk打包后类名会丢失, 请勿在非dev情况下调用
   */
  getName = () => {
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
