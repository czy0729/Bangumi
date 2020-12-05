/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-05 21:17:38
 */
import React from 'react'
import PropTypes from 'prop-types'
import { NavigationEvents } from 'react-navigation'
import { observer } from 'mobx-react'
import Stores from '@stores'
import { urlStringify } from '../index'

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

        // 后期对页面跳转传递数据进行了优化, 排除params里面_开头的key, 如_name, _image
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
          this.$ = new Store() // 新建store
          // this.$.setup() // store约定初始化

          // 把navigation的页面参数插入store方便使用
          this.$.params = {
            ...navigation.state.params
          }
        }

        if (cache) {
          Stores.add(screenKey, this.$)
        }
      }

      state = {
        isFocused: true
      }

      $ // 页面独立状态机引用

      getChildContext() {
        const { navigation } = this.props
        return {
          $: this.$,
          navigation
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
