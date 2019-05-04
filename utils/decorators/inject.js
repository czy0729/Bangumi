/* eslint-disable indent */
/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-04 22:24:22
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { StatusBar } from '@screens/_'
import Stores from '@stores'
import { urlStringify } from '../index'

/**
 * App HOC
 * @param {*} Store 页面状态
 * @param {*} param { cache: 是否缓存 }
 */
const Inject = (Store, { cache = true } = {}) => ComposedComponent =>
  observer(
    class extends React.Component {
      static navigationOptions = ComposedComponent.navigationOptions

      static childContextTypes = {
        $: PropTypes.object,
        navigation: PropTypes.object
      }

      constructor(props) {
        super(props)

        const { navigation } = props
        const { state } = navigation

        // 初始化页面Store
        const screenKey = `${state.routeName}?${urlStringify(state.params)}`
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
            <ComposedComponent {...this.props} />
          </>
        )
      }
    }
  )

export default Inject
