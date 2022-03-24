/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-24 05:57:03
 */
import React from 'react'
import { NavigationEvents } from '@components'
import Stores from '@stores'
import { DEV, contextTypes } from '@constants'
import { urlStringify } from '../index'
import observer from './observer'

/**
 * App HOC
 * @param {*} Store 页面状态
 * @param {*} param { cache: 是否缓存 }
 */
const Inject =
  (Store, { cache = true } = {}) =>
  ComposedComponent =>
    observer(
      class InjectComponent extends React.Component {
        static navigationOptions = ComposedComponent.navigationOptions

        static childContextTypes = contextTypes

        constructor(props) {
          super(props)

          const { route } = props
          const params = {}
          const paramsWithoutPlaceholder = {}
          Object.keys(route.params || {}).forEach(key => {
            params[key] = route.params[key]

            // 后期对页面跳转传递数据进行了优化, 排除params里面_开头的key, 如_name, _image
            if (key.indexOf('_') !== 0)
              paramsWithoutPlaceholder[key] = route.params[key]
          })

          // 初始化页面Store, storeKey约定为路由名字+参数(排除_开头的key)的序列化
          const screenKey = `${route.name}?${urlStringify(paramsWithoutPlaceholder)}`
          this.$ = Stores.get(screenKey)
          if (!this.$ || DEV) {
            this.$ = new Store() // 新建store
            this.$.params = params // 把navigation的页面参数插入store方便使用
          }

          if (cache) Stores.add(screenKey, this.$)
        }

        state = {
          isFocused: true
        }

        $ // 页面独立状态机引用

        getChildContext() {
          const { navigation } = this.props
          return {
            $: this.$,
            navigation,
            route: this.$.params
          }
        }

        onWillFocus = () => {
          if (!this.state.isFocused) {
            this.setState({
              isFocused: true
            })
          }
        }

        onWillBlur = () => {
          if (this.state.isFocused) {
            this.setState({
              isFocused: false
            })
          }
        }

        render() {
          const { isFocused } = this.state
          return (
            <>
              <ComposedComponent isFocused={isFocused} />
              <NavigationEvents
                onWillFocus={this.onWillFocus}
                onWillBlur={this.onWillBlur}
              />
            </>
          )
        }
      }
    )

export default Inject
