/*
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:44:23
 */
import React from 'react'
import { observer } from 'mobx-react'
import { NavigationEvents } from '@components'
import Stores from '@stores'
import { contextTypes } from '@constants/constants'
import { WEB } from '@constants/device'
import { getScreenKey } from './utils'
import { Config, Props, WrapComponentProps } from './types'

/** 封装应用主要功能实现的装饰器 */
const Inject = (Store, config?: Config) => {
  const { cache = true, listenIsFocused = false } = config || {}

  return (WrapComponent: React.ComponentType<WrapComponentProps>) =>
    observer(
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

          // DEV 环境下也需要每次新建, 保证热更新能获取到最新的代码
          // if (!this.$ || DEV) {
          if (!this.$) {
            this.$ = new Store()

            // 把 navigation 的页面参数插入 store 方便使用
            this.$.params = route.params || {}
          }

          if (cache) Stores.add(key, this.$)
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
          if (WEB) {
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
                <NavigationEvents onWillFocus={this.onWillFocus} onWillBlur={this.onWillBlur} />
              )}
            </>
          )
        }
      }
    )
}

export default Inject
