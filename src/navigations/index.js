/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 11:57:04
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
  Blog,
  Blogs,
  Browser,
  Calendar,
  Catalog,
  CatalogDetail,
  Catalogs,
  Channel,
  Character,
  Characters,
  Comic,
  DEV,
  Discovery,
  DiscoveryBlog,
  Friends,
  Group,
  Login,
  LoginAssist,
  LoginV2,
  Mine,
  Mono,
  Netabare,
  Notify,
  PM,
  Persons,
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
  TinygrailAdvance,
  TinygrailAdvanceAsk,
  TinygrailAdvanceAuction,
  TinygrailAdvanceAuction2,
  TinygrailAdvanceBid,
  TinygrailAdvanceSacrifice,
  TinygrailBid,
  TinygrailCharaAssets,
  TinygrailDeal,
  TinygrailICO,
  TinygrailICODeal,
  TinygrailItems,
  TinygrailLogs,
  TinygrailNew,
  TinygrailOverview,
  TinygrailRich,
  TinygrailSacrifice,
  TinygrailSearch,
  TinygrailTemples,
  TinygrailTopWeek,
  TinygrailTrade,
  TinygrailTree,
  TinygrailTreeRich,
  TinygrailValhall,
  Topic,
  UGCAgree,
  User,
  Voices,
  WebView,
  Works,
  Zone
} from '@screens'
import { BlurView } from '@screens/_'
import { IOS } from '@constants'
import { _ } from '@stores'
import navigationsParams, { initialHomeTabName } from '../../navigations'
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
        getActiveChildNavigationOptions(navigation, screenProps),
      animationEnabled: false
      // lazy: false
    }
  )
)

const HomeStack = createStackNavigator(
  {
    Anitama,
    Award,
    Blog,
    Blogs,
    Browser,
    Calendar,
    Catalog,
    CatalogDetail,
    Catalogs,
    Channel,
    Comic,
    Character,
    Characters,
    DEV,
    Discovery,
    DiscoveryBlog,
    Friends,
    Group,
    HomeTab,
    Login,
    LoginAssist,
    LoginV2,
    Mine,
    Mono,
    Netabare,
    Notify,
    PM,
    Persons,
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
    TinygrailAdvance,
    TinygrailAdvanceAsk,
    TinygrailAdvanceAuction,
    TinygrailAdvanceAuction2,
    TinygrailAdvanceBid,
    TinygrailAdvanceSacrifice,
    TinygrailBid,
    TinygrailCharaAssets,
    TinygrailDeal,
    TinygrailICO,
    TinygrailICODeal,
    TinygrailItems,
    TinygrailLogs,
    TinygrailNew,
    TinygrailOverview,
    TinygrailRich,
    TinygrailSacrifice,
    TinygrailSearch,
    TinygrailTemples,
    TinygrailTopWeek,
    TinygrailTrade,
    TinygrailTree,
    TinygrailTreeRich,
    TinygrailValhall,
    Topic,
    UGCAgree,
    User,
    Voices,
    WebView,
    Works,
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
    backgroundColor: IOS
      ? _.select(_.colorPlain, _._colorDarkModeLevel1)
      : _.select('transparent', _._colorDarkModeLevel1),
    borderTopWidth: IOS ? 0 : _.select(_.hairlineWidth, 0),
    borderTopColor: _.colorBorder
  },
  tabBarComponent: {
    borderTopWidth: 0,
    backgroundColor: 'transparent'
  }
}))
