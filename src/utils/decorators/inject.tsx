/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-04 15:26:22
 */
import React from 'react'
import { NavigationEvents } from '@components'
import Stores from '@stores'
import { DEV } from '@/config'
import { contextTypes } from '@constants/constants'
import { Navigation } from '@types'
import { urlStringify } from '../index'
import observer from './observer'

type Params = {
  /** 页面 store 是否缓存 */
  cache?: boolean
}

type Props = {
  /** 路由对象 */
  navigation: Navigation
}

type State = {
  /** 页面是否在最顶 */
  isFocused?: boolean
}

/**
 * App HOC
 * @param {*} Store 页面状态
 * @param {*} param { cache: 是否缓存 }
 */
const Inject =
  (Store, { cache = true }: Params = {}) =>
  ComposedComponent =>
    observer(
      class InjectComponent extends React.Component<Props, State> {
        /** @deprecated */
        static navigationOptions =
          /** @ts-ignore */
          ComposedComponent.navigationOptions

        static childContextTypes = contextTypes

        constructor(props) {
          super(props)

          const { route } = props
          const key = getScreenKey(route)
          this.$ = Stores.get(key)
          if (!this.$ || DEV) {
            this.$ = new Store()
            this.$.params = route.params || {} // 把navigation的页面参数插入store方便使用
          }
          if (cache) Stores.add(key, this.$)
        }

        state = {
          isFocused: true
        }

        /** 页面独立状态机引用 */
        $

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

function getScreenKey(route) {
  const params = {}

  // 后期对页面跳转传递数据进行了优化, 排除 params 里面 _ 开头的 key, 如 _name, _image
  Object.keys(route.params || {}).forEach(key => {
    if (key.indexOf('_') !== 0) params[key] = route.params[key]
  })

  return `${route.name}?${urlStringify(params)}`
}
