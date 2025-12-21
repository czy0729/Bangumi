/*
 * @Author: czy0729
 * @Date: 2019-05-01 16:57:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 11:49:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { computed } from 'mobx'
import { Popover, Menu, Flex, Iconfont, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { gradientColor } from '@utils'
import { s2t } from '@utils/thirdParty/open-cc'
import { IOS } from '@constants/constants'
import IconBack from './cycles/back'
import ob from './ob'

const hitSlop = {
  top: 4,
  right: 4,
  bottom: 4,
  left: 4
}
const defaultHeaderStyle = {
  fontSize: 14,
  backgroundColor: 'transparent'
}

/**
 * @param {*} headerTransition 过渡头高度
 */
const withTransitionHeader =
  ({
    screen,
    headerTransition = 48,
    HeaderTitle,
    colorStart,
    colorEnd = _.colorTitleRaw, // 黑暗模式, end也是白色
    transparent = false,
    defaultExtra,
    barStyle,
    hm
  } = {}) =>
  ComposedComponent =>
    ob(
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
          const heatmap = navigation.getParam('heatmap')
          const popover = navigation.getParam('popover', {
            data: [],
            onSelect: Function.prototype
          })
          if (popover.data.length) {
            const popoverProps = IOS
              ? {
                  overlay: (
                    <Menu title={popover.title} data={popover.data} onSelect={popover.onSelect} />
                  )
                }
              : {
                  data: popover.data,
                  onSelect: popover.onSelect
                }
            headerRight = (
              <Flex>
                {extra || defaultExtra}
                <Popover style={styles.icon} placement='bottom' hitSlop={hitSlop} {...popoverProps}>
                  <Iconfont name='md-more-horiz' color={headerTintColor} />
                  {!!heatmap && <Heatmap id={heatmap} />}
                </Popover>
              </Flex>
            )
          } else {
            headerRight = (
              <Flex>
                {extra || defaultExtra}
                <View
                  style={{
                    padding: _.sm,
                    marginRight: -_.sm
                  }}
                >
                  <Iconfont name='md-more-horiz' color={headerTintColor} />
                </View>
              </Flex>
            )
          }

          const options = {
            title: this._s2t ? s2t(navigation.getParam('title')) : navigation.getParam('title'),
            headerTitleStyle: {
              width: '100%',
              textAlign: 'left',
              fontSize: 14
            },
            headerTransparent: true,
            headerStyle: {
              ...defaultHeaderStyle,
              ...headerStyle
            },
            headerTintColor,
            headerLeft: <IconBack navigation={navigation} color={headerTintColor} />,
            headerRight,
            headerRightContainerStyle: {
              marginRight: _._wind
            },
            ...ComposedComponent.navigationOptions
          }
          if (HeaderTitle) {
            options.headerTitle = <HeaderTitle navigation={navigation} />
          }
          return options
        }

        static contextTypes = {
          navigation: PropTypes.object,
          route: PropTypes.object
        }

        state = {
          barStyle: barStyle || (headerTransition ? 'light-content' : 'dark-content')
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

            const headerTransitionTitle = navigation.getParam('headerTransitionTitle')
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
              title: this._s2t ? s2t(title) : title,
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
              shadowStyle = {
                borderBottomWidth: _.flat ? 0 : _.select(_.hairlineWidth, 0),
                borderBottomColor: _.colorBorder
              }
            }

            navigation.setParams({
              title: this._s2t ? s2t(title) : title,
              headerTintColor: this.gradientColorSteps[parseInt(opacity * 100)],
              headerStyle: {
                ...defaultHeaderStyle,
                backgroundColor: `rgba(${_.select(
                  _.colorPlainRaw,
                  _.deepDark ? _._colorPlainRaw : _._colorDarkModeLevel1Raw
                ).join()}, ${opacity})`,
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

        @computed get _s2t() {
          const { s2t: _s2t } = systemStore.setting
          return _s2t
        }

        render() {
          const { navigation } = this.props
          const { barStyle } = this.state
          return (
            <>
              <ComposedComponent navigation={navigation} onScroll={this.headerTransitionCallback} />
              {!!hm?.[1] && <Heatmap bottom={_.bottom + _.sm} id={screen} screen={hm[1]} />}
            </>
          )
        }
      }
    )

withTransitionHeader.setTitle = (navigation, title) => {
  const { s2t: _s2t } = systemStore.setting
  return navigation.setParams({
    headerTransitionTitle: _s2t ? s2t(title) : title
  })
}

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

const styles = _.create({
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
})
