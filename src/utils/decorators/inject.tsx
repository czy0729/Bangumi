/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 15:29:49
 */
import React from 'react'
import { NavigationEvents } from '@components'
import Stores from '@stores'
import { DEV } from '@/config'
import { contextTypes } from '@constants/constants'
import { Navigation, StoreType, StoreInstance } from '@types'
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
  (Store: StoreType, { cache = true }: Params = {}) =>
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

        /** 页面独立状态机引用 */
        $?: StoreInstance

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
