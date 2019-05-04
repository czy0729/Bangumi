/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-05-01 16:57:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 00:10:08
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Popover, Menu, Icon } from '@components'
import { StatusBar } from '@screens/_'
import { gradientColor } from '@utils'
import { IOS } from '@constants'
import {
  headerHeight,
  colorPlainRaw,
  colorTitleRaw,
  colorBorder
} from '@styles'

// 预先生成colorPlain过渡到colorTitle的所有颜色
const gradientColorSteps = gradientColor(colorPlainRaw, colorTitleRaw, 101)

/**
 * @param {*} headerTransition 过渡头高度
 */
const withTransitionHeader = ({
  headerTransition = 48
} = {}) => ComposedComponent =>
  observer(
    class extends React.Component {
      static navigationOptions = ({ navigation }) => {
        const headerStyle = navigation.getParam('headerStyle', {
          backgroundColor: 'rgba(255, 255, 255, 0)'
        })

        // 透明默认颜色是colorPlain, 非透明是colorTitle
        const headerTintColor = navigation.getParam(
          'headerTintColor',
          gradientColorSteps[0]
        )

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
          ...ComposedComponent.navigationOptions
        }
      }

      state = {
        barStyle: headerTransition ? 'light-content' : 'dark-content'
      }

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
          }
        })
      }

      render() {
        const { barStyle } = this.state
        return (
          <>
            <StatusBar barStyle={barStyle} />
            <ComposedComponent
              onScroll={this.headerTransitionCallback}
              {...this.props}
            />
          </>
        )
      }
    }
  )

withTransitionHeader.setTitle = (navigation, title) =>
  navigation.setParams({
    headerTransitionTitle: title
  })

withTransitionHeader.listViewProps = IOS
  ? {
      contentInset: {
        top: headerHeight
      },
      contentOffset: {
        y: -headerHeight
      }
    }
  : {
      progressViewOffset: headerHeight
    }

export default withTransitionHeader
