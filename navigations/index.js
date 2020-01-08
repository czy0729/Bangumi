/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-08 11:46:43
 */
import React from 'react'
import { View } from 'react-native'
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { observer } from 'mobx-react'
import BottomTabBar from '@components/@/react-navigation-tabs/BottomTabBar'
import {
  Anitama,
  Award,
  Browser,
  Calendar,
  Catalog,
  CatalogDetail,
  Character,
  Discovery,
  Friends,
  Group,
  Login,
  LoginAssist,
  LoginV2,
  Mono,
  Notify,
  Qiafan,
  Rakuen,
  RakuenHistory,
  RakuenSetting,
  Random,
  Rank,
  Say,
  Search,
  Setting,
  Subject,
  Tag,
  Tags,
  Timeline,
  Tinygrail,
  TinygrailBid,
  TinygrailCharaAssets,
  TinygrailDeal,
  TinygrailICO,
  TinygrailICODeal,
  TinygrailLogs,
  TinygrailNew,
  TinygrailSacrifice,
  TinygrailOverview,
  TinygrailOverviewAdvance,
  TinygrailRich,
  TinygrailSearch,
  TinygrailTemples,
  TinygrailTrade,
  TinygrailTree,
  TinygrailTreeRich,
  TinygrailValhall,
  Topic,
  UGCAgree,
  User,
  WebView,
  Zone
} from '@screens'
import { BlurView } from '@screens/_'
import { IOS } from '@constants'
import { _ } from '@stores'
import navigationsParams, { initialHomeTabName } from '../navigations'
import HomeScreen from './screens/home'
import config from './stacks/config'

const TarBarComponent = observer(props => {
  const styles = memoStyles()
  if (IOS) {
    return (
      <BlurView style={styles.blurView}>
        <BottomTabBar {...props} style={styles.tabBarComponent} />
      </BlurView>
    )
  }

  return (
    <View style={styles.tarBarView}>
      <BottomTabBar {...props} style={styles.tabBarComponent} />
    </View>
  )
})

const HomeTab = observer(
  createBottomTabNavigator(
    {
      Discovery,
      Timeline,
      Home: HomeScreen,
      Rakuen,
      User
    },
    {
      initialRouteName: initialHomeTabName,
      tabBarComponent: props => <TarBarComponent {...props} />,
      navigationOptions: ({ navigation, screenProps }) =>
        getActiveChildNavigationOptions(navigation, screenProps)
    }
  )
)

const HomeStack = createStackNavigator(
  {
    Anitama,
    Award,
    Browser,
    Calendar,
    Catalog,
    CatalogDetail,
    Character,
    Discovery,
    Friends,
    Group,
    HomeTab,
    Login,
    LoginAssist,
    LoginV2,
    Mono,
    Notify,
    Qiafan,
    Rakuen,
    RakuenHistory,
    RakuenSetting,
    Random,
    Rank,
    Say,
    Search,
    Setting,
    Subject,
    Tag,
    Tags,
    Timeline,
    Tinygrail,
    TinygrailBid,
    TinygrailCharaAssets,
    TinygrailDeal,
    TinygrailICO,
    TinygrailICODeal,
    TinygrailLogs,
    TinygrailNew,
    TinygrailOverview,
    TinygrailOverviewAdvance,
    TinygrailRich,
    TinygrailSacrifice,
    TinygrailSearch,
    TinygrailTemples,
    TinygrailTrade,
    TinygrailTree,
    TinygrailTreeRich,
    TinygrailValhall,
    Topic,
    UGCAgree,
    User,
    WebView,
    Zone
  },
  {
    ...navigationsParams,
    ...config
  }
)

export default createAppContainer(HomeStack)

const memoStyles = _.memoStyles(_ => ({
  blurView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },
  tarBarView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorPlain
  },
  tabBarComponent: IOS
    ? {
        borderTopWidth: 0,
        backgroundColor: 'transparent'
      }
    : {
        backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
        borderTopWidth: _.hairlineWidth,
        borderTopColor: _.colorBorder
      }
}))
