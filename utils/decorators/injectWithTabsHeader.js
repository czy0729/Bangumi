/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-04-29 14:48:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 16:27:54
 */
import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { BlurView } from 'expo'
import { IconMenu, IconSearch, Logo } from '@screens/_'
import Stores from '@stores'
import { IOS } from '@constants'
import _, {
  window,
  logoWidth,
  headerHeight,
  tabsHeight,
  colorPlain
} from '@styles'
import { urlStringify } from '../index'

/**
 * @param {*} Store 页面状态
 * @param {*} param { cache: 是否缓存 }
 */
const InjectWithTabsHeader = (
  Store,
  { cache = true } = {}
) => ComposedComponent =>
  observer(
    class extends React.Component {
      // @notice 把tabbar通过某些手段放进去header里面, 才能实现比较好的毛玻璃效果
      static navigationOptions = ({ navigation }) => ({
        headerStyle: {
          height: headerHeight
        },
        headerTransparent: true,
        headerLeft: () => (
          <IconMenu style={styles.icon} navigation={navigation} />
        ),
        headerRight: <IconSearch style={styles.icon} navigation={navigation} />,
        headerBackground: IOS ? (
          <BlurView style={_.container.flex} tint='default' intensity={100} />
        ) : (
          <View style={styles.header} />
        ),
        headerTitle: (
          <View>
            <Logo />
            <View style={{ height: tabsHeight }}>
              <View style={styles.headerTabs}>
                {navigation.getParam('headerTabs')}
              </View>
            </View>
          </View>
        ),
        ...ComposedComponent.navigationOptions
      })

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
        barStyle: 'dark-content'
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
        const { barStyle } = this.state
        return (
          <>
            {IOS ? (
              <StatusBar animated barStyle={barStyle} />
            ) : (
              <StatusBar animated translucent barStyle='light-content' />
            )}
            <ComposedComponent {...this.props} />
          </>
        )
      }
    }
  )

export default InjectWithTabsHeader

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
