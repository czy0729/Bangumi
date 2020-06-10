/*
 * @Author: czy0729
 * @Date: 2019-04-29 14:48:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 11:57:26
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import { StatusBarEvents, UM } from '@components'
import { BlurView, Logo } from '@screens/_'
import { _ } from '@stores'
import { hm as utilsHM } from '@utils/fetch'
import { IOS } from '@constants'
import observer from './observer'

const correctHeightIOS = 14 // @issue iOS端头部高度误差修正值

// (1) 装饰器
const withTabsHeader = ({ screen } = {}, hm) => ComposedComponent =>
  observer(
    class withTabsHeaderComponent extends React.Component {
      /**
       * @notice 把tabbar通过某些手段放进去header里面, 才能实现比较好的毛玻璃效果
       * 安卓没有毛玻璃效果, 不设置
       */
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
              <>
                <BlurView style={styles.headerBackgroundIOS} />
                <View>
                  <Logo />
                  <View style={styles.headerTabsWrapIOS}>
                    <View style={styles.headerTabsIOS}>
                      {navigation.getParam('headerTabs')}
                    </View>
                  </View>
                </View>
              </>
            ),
            headerLeft,
            headerRight,
            headerLeftContainerStyle: {
              paddingLeft: _.sm + 2
            },
            headerRightContainerStyle: {
              marginRight: _._wind + 2
            }

            /**
             * @issue 这个属性在页面切换时会被隐藏掉?
             * 暂使用headerTitle插入BlurView并适应位置代替
             */
            // headerBackground: <BlurView />
          }
        } else {
          const headerBackground = navigation.getParam(
            'headerBackground',
            <View />
          )
          withTabsHeaderOptions = {
            headerStyle: {
              height: _.headerHeight - _.statusBarHeight + _.space,
              paddingTop: _.statusBarHeight,
              backgroundColor: _.select('transparent', _._colorDarkModeLevel1),
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
              paddingLeft: _.xs + 4
            },
            headerRightContainerStyle: {
              marginRight: _._wind - _.sm
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

      componentDidMount() {
        if (Array.isArray(hm)) {
          utilsHM(...hm)
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
      marginTop: -_.sm
    }

// (4) ListView设置参数
const tabsHeaderHeight =
  Constants.statusBarHeight + _.appBarHeight + _.tabsHeight - correctHeightIOS
withTabsHeader.listViewProps = IOS
  ? {
      contentInset: {
        top: tabsHeaderHeight
      },
      contentOffset: {
        y: -tabsHeaderHeight
      }
    }
  : {}

export default withTabsHeader

const styles = StyleSheet.create({
  headerBackgroundIOS: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: _.window.width,
    height: _.tabsHeaderHeight,
    marginTop: -_.tabsHeight - correctHeightIOS,
    marginLeft: -parseInt(_.window.width * 0.5)
  },
  headerTabsWrapIOS: {
    height: _.tabsHeight
  },
  headerTabsIOS: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    width: _.window.width,
    transform: [
      {
        translateX: parseInt(_.window.width * -0.5 + _.logoWidth * 0.5)
      }
    ]
  }
})
