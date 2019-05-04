/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-04-29 14:48:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-04 23:21:20
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo'
import { IconMenu, IconSearch, Logo } from '@screens/_'
import { IOS } from '@constants'
import _, {
  window,
  logoWidth,
  headerHeight,
  tabsHeaderHeight,
  tabsHeight,
  colorPlain
} from '@styles'

// (1) 装饰器
const withTabsHeader = () => ComposedComponent =>
  class extends React.Component {
    // @notice 把tabbar通过某些手段放进去header里面, 才能实现比较好的毛玻璃效果
    // 安卓没有毛玻璃效果, 不设置
    static navigationOptions = ({ navigation }) => {
      const withTabsHeaderOptions = {
        headerStyle: {
          height: headerHeight
        },
        headerLeft: () => <IconMenu navigation={navigation} />,
        headerRight: <IconSearch navigation={navigation} />,
        headerTitle: <Logo />
      }

      if (IOS) {
        withTabsHeaderOptions.headerTransparent = true
        withTabsHeaderOptions.headerBackground = (
          <BlurView style={_.container.flex} tint='default' intensity={100} />
        )
        withTabsHeaderOptions.headerTitle = (
          <View>
            <Logo />
            <View style={{ height: tabsHeight }}>
              <View style={styles.headerTabs}>
                {navigation.getParam('headerTabs')}
              </View>
            </View>
          </View>
        )
        withTabsHeaderOptions.headerLeft = () => (
          <IconMenu style={styles.icon} navigation={navigation} />
        )
        withTabsHeaderOptions.headerRight = (
          <IconSearch style={styles.icon} navigation={navigation} />
        )
      }

      return {
        ...withTabsHeaderOptions,
        ...ComposedComponent.navigationOptions
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

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
      backgroundColor: colorPlain
    }

// (4) ListView设置参数
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
  header: {
    flex: 1,
    backgroundColor: colorPlain
  },
  headerTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: window.width,
    transform: [{ translateX: window.width * -0.5 + logoWidth * 0.5 }]
  },
  icon: {
    marginBottom: tabsHeight
  }
})
