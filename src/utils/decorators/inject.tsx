/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 17:37:49
 */
import React from 'react'
import { NavigationEvents } from '@components'
import Stores from '@stores'
import { DEV } from '@/config'
import { contextTypes, STORYBOOK } from '@constants/constants'
import { AnyObject, Fn, Navigation } from '@types'
import { urlStringify } from '../index'
import observer from './observer'

type Config = {
  /** 页面 store 是否缓存 */
  cache?: boolean

  /** 页面是否监听聚焦 */
  listenIsFocused?: boolean
}

type WrapComponentProps = {
  /** 页面是否在最顶 */
  isFocused?: boolean
}

type Props = {
  navigation: Navigation

  route?: {
    params?: any
    name?: any
  }

  /** Storybook */
  onMounted?: Fn
}

/** App inject store HOC */
const Inject = (Store, config?: Config) => {
  const { cache = true, listenIsFocused = false } = config || {}
  return (WrapComponent: React.ComponentType<WrapComponentProps>) => {
    return observer(
      class InjectComponent extends React.Component<Props> {
        /** @deprecated */
        static navigationOptions =
          /** @ts-ignore */
          WrapComponent.navigationOptions

        static childContextTypes = contextTypes

        constructor(props) {
          super(props)

          const { route } = props
          const key = getScreenKey(route)
          this.$ = Stores.get(key)

          // DEV 环境下也需要每次新建, 保证热更新能获取到最新的 store 代码
          if (!this.$ || DEV) {
            this.$ = new Store()

            // 把 navigation 的页面参数插入 store 方便使用
            this.$.params = route.params || {}
          }

          if (cache) {
            Stores.add(key, this.$)
          }
        }

        state: WrapComponentProps = {
          isFocused: true
        }

        /** 页面独立状态机引用 */
        $: any

        getChildContext() {
          const { navigation } = this.props
          return {
            $: this.$,
            navigation,
            route: this.$.params
          }
        }

        onWillFocus = () => {
          if (listenIsFocused && !this.state.isFocused) {
            this.setState({
              isFocused: true
            })
          }
        }

        onWillBlur = () => {
          if (listenIsFocused && this.state.isFocused) {
            this.setState({
              isFocused: false
            })
          }
        }

        get passProps() {
          if (STORYBOOK) {
            return {
              onMounted: this.props.onMounted
            }
          }

          if (!listenIsFocused) return {}

          return {
            isFocused: this.state.isFocused
          }
        }

        render() {
          return (
            <>
              <WrapComponent {...this.passProps} />
              {listenIsFocused && (
                <NavigationEvents
                  onWillFocus={this.onWillFocus}
                  onWillBlur={this.onWillBlur}
                />
              )}
            </>
          )
        }
      }
    )
  }
}

export default Inject

function getScreenKey(
  route: {
    params?: AnyObject
    routeName?: string
    name?: string
  } = {}
) {
  const params = Object.entries(route?.params || {})
    // 后期对页面跳转传递数据进行了优化, 排除 params 里面 _ 开头的 key, 如 _name, _image
    .filter(([key]) => !key.startsWith('_'))
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})

  return `${route.routeName || route.name}?${urlStringify(params, false)}`
}
