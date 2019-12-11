/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-04-29 14:48:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 11:25:04
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBarEvents, UM } from '@components'
import { BlurView, Logo } from '@screens/_'
import { _ } from '@stores'
import { IOS, BARE } from '@constants'
import observer from './observer'

const correctHeightIOS = 14 // @issue iOS端头部高度误差修正值

// (1) 装饰器
const withTabsHeader = ({ screen } = {}) => ComposedComponent =>
  observer(
    class withTabsHeaderComponent extends React.Component {
      // @notice 把tabbar通过某些手段放进去header里面, 才能实现比较好的毛玻璃效果
      // 安卓没有毛玻璃效果, 不设置
      static navigationOptions = ({ navigation }) => {
        let withTabsHeaderOptions
        const headerLeft = navigation.getParam('headerLeft')
        const headerRight = navigation.getParam('headerRight')
        if (IOS) {
          withTabsHeaderOptions = {
            headerTransparent: true,
            headerStyle: {
              height: _.headerHeight - correctHeightIOS
            },
            headerTitle: (
              <View>
                <Logo />
                <View style={{ height: _.tabsHeight }}>
                  <View style={styles.headerTabsIOS}>
                    {navigation.getParam('headerTabs')}
                  </View>
                </View>
              </View>
            ),
            headerLeft,
            headerRight,
            headerBackground: <BlurView />
          }
        } else {
          const headerBackground = navigation.getParam(
            'headerBackground',
            <View />
          )
          withTabsHeaderOptions = {
            headerStyle: {
              height: _.headerHeight - (BARE ? 0 : _.statusBarHeight),
              paddingTop: BARE ? _.statusBarHeight : 0,
              backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
              elevation: 0
            },
            headerTitle: (
              <Logo
                forceUpdate={() =>
                  navigation.setParams({
                    headerBackground
                  })
                }
              />
            ),
            headerLeft,
            headerRight,
            headerLeftContainerStyle: {
              paddingLeft: _.xs
            },
            headerRightContainerStyle: {
              marginRight: _.wind - _.sm
            },
            headerBackground
          }
        }

        return {
          ...withTabsHeaderOptions,
          ...(typeof ComposedComponent.navigationOptions === 'function'
            ? ComposedComponent.navigationOptions({ navigation })
            : ComposedComponent.navigationOptions)
        }
      }

      render() {
        const { navigation } = this.props
        let backgroundColor
        if (!IOS && _.isDark) {
          backgroundColor = _._colorDarkModeLevel1Hex
        }
        return (
          <>
            <UM screen={screen} />
            <StatusBarEvents backgroundColor={backgroundColor} />
            <ComposedComponent navigation={navigation} />
          </>
        )
      }
    }
  )

// (2) componentDidMount设置Tabs
withTabsHeader.setTabs = (navigation, headerTabs) => {
  if (!IOS) {
    return
  }
  navigation.setParams({
    headerTabs
  })
}

// (3) render的Tabs设置参数
withTabsHeader.tabBarStyle = IOS
  ? {
      display: 'none'
    }
  : {
      marginTop: -_.sm,
      backgroundColor: _.colorPlain
    }

// (4) ListView设置参数
withTabsHeader.listViewProps = IOS
  ? {
      contentInset: {
        top: _.tabsHeaderHeight - correctHeightIOS
      },
      contentOffset: {
        y: -(_.tabsHeaderHeight - correctHeightIOS)
      }
    }
  : {}

export default withTabsHeader

const styles = StyleSheet.create({
  headerTabsIOS: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: _.window.width,
    transform: [
      {
        translateX: _.window.width * -0.5 + _.logoWidth * 0.5
      }
    ]
  }
})
