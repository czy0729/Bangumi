/* eslint-disable indent */
/*
 * 封装应用主要功能实现的装饰器
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-12 22:09:28
 */
import React from 'react'
import { Platform, StyleSheet, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Popover, Menu, Icon } from '@components'
import Stores from '@stores'
import { gradientColor } from '@utils'
import {
  headerHeight,
  colorPlainRaw,
  colorTitleRaw,
  colorBorder
} from '@styles'
import { urlStringify } from './index'

// 预先生成colorPlain过渡到colorTitle的所有颜色
const gradientColorSteps = gradientColor(colorPlainRaw, colorTitleRaw, 101)

/**
 * App HOC
 * @param {*} Store 页面状态
 * @param {*} param { cache: 是否缓存, headerTransition: 头部样式渐变过渡距离 }
 */
const Inject = (
  Store,
  { cache = true, headerTransition = 0 } = {}
) => ComposedComponent =>
  observer(
    class extends React.Component {
      static navigationOptions = headerTransition
        ? ({ navigation, navigationOptions }) => {
            const headerStyle = navigation.getParam('headerStyle', {
              backgroundColor: 'rgba(255, 255, 255, 0)'
            })

            // 透明默认颜色是colorPlain, 非透明是colorTitle
            const headerTintColor = navigation.getParam(
              'headerTintColor',
              gradientColorSteps[0]
            )

            // 合并页面navigationOptions
            const screenOptions =
              typeof ComposedComponent.navigationOptions === 'function'
                ? ComposedComponent.navigationOptions({
                    navigation,
                    navigationOptions
                  })
                : ComposedComponent.navigationOptions

            const popover = navigation.getParam('popover', {
              data: [],
              onSelect: () => {}
            })
            let headerRight
            if (popover.data.length) {
              headerRight = (
                <Popover
                  placement='bottom'
                  overlay={
                    <Menu
                      title={popover.title}
                      data={popover.data}
                      onSelect={popover.onSelect}
                    />
                  }
                >
                  <Icon size={32} name='ios-more' color={headerTintColor} />
                </Popover>
              )
            }

            return {
              // @todo headerTitle优先级应比title大
              title: navigation.getParam('title'),
              headerTransparent: true,
              headerStyle,
              headerTintColor,
              headerRight,
              ...screenOptions
            }
          }
        : ComposedComponent.navigationOptions

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

      state = {
        barStyle: headerTransition ? 'light-content' : 'dark-content'
      }

      $
      headerTransitioned = false

      /**
       * 头部样式改变回调函数
       */
      headerTransitionCallback = ({ nativeEvent }) => {
        const { y } = nativeEvent.contentOffset
        if (
          (this.headerTransitioned && y > headerHeight + headerTransition) ||
          (this.headerTransitioned && y < 0)
        ) {
          return
        }

        const { navigation } = this.props
        let title = ''
        let opacity = y / (headerHeight + headerTransition)
        if (opacity < 0) {
          opacity = 0
          this.headerTransitioned = true
          this.setState({
            barStyle: 'light-content'
          })
        } else if (opacity > 1) {
          opacity = 1
          this.headerTransitioned = true
          this.setState({
            barStyle: 'dark-content'
          })
          const headerTransitionTitle = navigation.getParam(
            'headerTransitionTitle'
          )
          if (headerTransitionTitle) {
            title = headerTransitionTitle
          }
        } else {
          this.headerTransitioned = false
        }

        const isTransitioned = opacity === 1 // 是否过渡完成
        navigation.setParams({
          title,
          headerTintColor: gradientColorSteps[parseInt(opacity * 100)],
          headerStyle: {
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            borderBottomWidth: isTransitioned ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: colorBorder
            // ...Platform.select({
            //   ios: {
            //     shadowColor: colorShadow,
            //     shadowOffset: { height: 2 },
            //     shadowOpacity: 0.08,
            //     shadowRadius: isTransitioned ? 4 : 0
            //   },
            //   android: {
            //     elevation: isTransitioned ? 2 : 0
            //   }
            // })
          }
        })
      }

      getChildContext() {
        const { navigation } = this.props
        return {
          $: this.$,
          navigation
        }
      }

      render() {
        const { barStyle } = this.state
        return (
          <>
            {Platform.OS === 'ios' ? (
              <StatusBar animated barStyle={barStyle} />
            ) : (
              <StatusBar animated translucent barStyle='light-content' />
            )}
            <ComposedComponent
              onScroll={this.headerTransitionCallback}
              {...this.props}
            />
          </>
        )
      }
    }
  )

export default Inject
