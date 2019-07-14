/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 11:22:28
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar } from '@screens/_'
import Stores from '@stores'
import { urlStringify } from '../index'
import observer from './observer'

/**
 * App HOC
 * @param {*} Store 页面状态
 * @param {*} param { cache: 是否缓存 }
 */
const Inject = (Store, { cache = true } = {}) => ComposedComponent =>
  observer(
    class InjectComponent extends React.Component {
      static navigationOptions = ComposedComponent.navigationOptions

      static childContextTypes = {
        $: PropTypes.object,
        navigation: PropTypes.object
      }

      constructor(props) {
        super(props)

        const { navigation } = props
        const { state } = navigation

        // 后期对页面跳转传递数据进行了优化, 排除_开头的key
        const params = {}
        Object.keys(state.params || {}).forEach(key => {
          if (key.indexOf('_') === 0) {
            return
          }
          params[key] = state.params[key]
        })

        // 初始化页面Store
        // storeKey约定为路由名字 + 参数(排除_开头的key)的序列化
        const screenKey = `${state.routeName}?${urlStringify(params)}`
        this.$ = Stores.get(screenKey)
        if (!this.$) {
          this.$ = new Store()
          this.$.params = {
            ...navigation.state.params
          }
        }
        if (cache) {
          Stores.add(screenKey, this.$)
        }
      }

      $

      getChildContext() {
        const { navigation } = this.props
        return {
          $: this.$,
          navigation
        }
      }

      render() {
        return (
          <>
            <StatusBar />
            <ComposedComponent />
          </>
        )
      }
    }
  )

export default Inject
