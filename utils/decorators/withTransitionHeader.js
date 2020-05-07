/*
 * @Author: czy0729
 * @Date: 2019-05-01 16:57:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-06 10:47:50
 */
import React from 'react'
import { View } from 'react-native'
import { computed } from 'mobx'
import PropTypes from 'prop-types'
import { StatusBarEvents, Popover, Menu, Flex, Iconfont, UM } from '@components'
import { IconBack } from '@screens/_'
import { _ } from '@stores'
import { gradientColor } from '@utils'
import { IOS, BARE } from '@constants'
import observer from './observer'

const defaultHeaderStyle = {
  backgroundColor: 'transparent'
}
if (!IOS && BARE) {
  defaultHeaderStyle.height = _.statusBarHeight + 52
  defaultHeaderStyle.paddingTop = _.statusBarHeight
}

/**
 * @param {*} headerTransition 过渡头高度
 */
const withTransitionHeader = ({
  screen,
  headerTransition = 48,
  colorStart,
  colorEnd = _.colorTitleRaw, // 黑暗模式, end也是白色
  transparent = false,
  barStyle
} = {}) => ComposedComponent =>
  observer(
    class withTransitionHeaderComponent extends React.Component {
      static navigationOptions = ({ navigation }) => {
        const headerStyle = navigation.getParam('headerStyle')

        // 透明默认颜色是colorPlain, 非透明是colorTitle
        const headerTintColor = navigation.getParam(
          'headerTintColor',
          `rgba(${(colorStart || _.colorTitleRaw).join()}, 1)`
        )

        let headerRight
        const extra = navigation.getParam('extra')
        const popover = navigation.getParam('popover', {
          data: [],
          onSelect: Function.prototype
        })
        if (popover.data.length) {
          const popoverProps = IOS
            ? {
                overlay: (
                  <Menu
                    title={popover.title}
                    data={popover.data}
                    onSelect={popover.onSelect}
                  />
                )
              }
            : {
                data: popover.data,
                onSelect: popover.onSelect
              }
          headerRight = (
            <Flex>
              {extra}
              <Popover
                style={{
                  padding: _.sm,
                  marginRight: -_.sm
                }}
                placement='bottom'
                {...popoverProps}
              >
                <Iconfont size={24} name='more' color={headerTintColor} />
              </Popover>
            </Flex>
          )
        } else {
          headerRight = (
            <Flex>
              {extra}
              <View
                style={{
                  padding: _.sm,
                  marginRight: -_.sm
                }}
              >
                <Iconfont size={24} name='more' color={headerTintColor} />
              </View>
            </Flex>
          )
        }

        return {
          // @todo headerTitle优先级应比title大
          title: navigation.getParam('title'),
          headerTransparent: true,
          headerStyle: {
            ...defaultHeaderStyle,
            ...headerStyle
          },
          headerTintColor,
          headerLeft: (
            <IconBack navigation={navigation} color={headerTintColor} />
          ),
          headerRight,
          headerRightContainerStyle: {
            marginRight: _._wind
          },
          ...ComposedComponent.navigationOptions
        }
      }

      static contextTypes = {
        navigation: PropTypes.object
      }

      state = {
        barStyle:
          barStyle || (headerTransition ? 'light-content' : 'dark-content')
      }

      headerTransitioned = false

      /**
       * 头部样式改变回调函数
       */
      headerTransitionCallback = ({ nativeEvent }) => {
        const { y } = nativeEvent.contentOffset
        if (
          (this.headerTransitioned && y > _.headerHeight + headerTransition) ||
          (this.headerTransitioned && y < 0)
        ) {
          return
        }

        const { navigation } = this.context
        let title = ''
        let opacity = y / (_.headerHeight + headerTransition)
        if (opacity < 0) {
          opacity = 0
          this.headerTransitioned = true
          if (!barStyle) {
            this.setState({
              barStyle: 'light-content'
            })
          }
        } else if (opacity > 1) {
          opacity = 1
          this.headerTransitioned = true
          if (!barStyle) {
            this.setState({
              barStyle: 'dark-content'
            })
          }
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

        // 透明模式
        if (transparent) {
          navigation.setParams({
            title,
            headerTintColor: this.gradientColorSteps[parseInt(opacity * 100)],
            headerStyle: {
              ...defaultHeaderStyle,
              backgroundColor: 'transparent',
              borderBottomWidth: 0
            }
          })
        } else {
          let shadowStyle = {}
          if (isTransitioned) {
            if (IOS) {
              shadowStyle = _.shadow
            } else {
              shadowStyle = {
                overflow: 'hidden',
                elevation: 2
              }
            }
          }

          navigation.setParams({
            title,
            headerTintColor: this.gradientColorSteps[parseInt(opacity * 100)],
            headerStyle: {
              ...defaultHeaderStyle,
              backgroundColor: `rgba(${_.select(
                _.colorPlainRaw,
                _._colorDarkModeLevel1Raw
              ).join()}, ${opacity})`,
              borderBottomWidth: 0,
              ...shadowStyle
            }
          })
        }
      }

      // 生成colorPlain过渡到colorTitle的所有颜色
      @computed get gradientColorSteps() {
        return gradientColor(
          colorStart || _.colorTitleRaw,
          _.select(colorEnd, colorStart || _.colorTitleRaw),
          101
        )
      }

      render() {
        const { navigation } = this.props
        const { barStyle } = this.state
        return (
          <>
            <UM screen={screen} />
            <StatusBarEvents
              barStyle={barStyle}
              backgroundColor='transparent'
              action='onWillFocus'
            />
            <ComposedComponent
              navigation={navigation}
              onScroll={this.headerTransitionCallback}
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
        top: _.headerHeight
      },
      contentOffset: {
        y: -_.headerHeight
      }
    }
  : {
      progressViewOffset: _.headerHeight
    }

export default withTransitionHeader
