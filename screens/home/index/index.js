/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 22:56:18
 */
import React from 'react'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  IconTabBar,
  IconTabsHeader,
  IconTinygrail,
  IconNotify,
  ManageModal,
  NavigationBarEvents,
  HeaderBackground
} from '@screens/_'
import { _, userStore } from '@stores'
import { inject, withTabsHeader } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import Tabs from './tabs'
import List from './list'
import Grid from './grid'
import Store, { tabs } from './store'

const title = '首页'

export default
@inject(Store)
@withTabsHeader({
  screen: title
})
@observer
class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <>
        <IconTinygrail
          navigation={navigation}
          event={{
            id: '首页.跳转'
          }}
        />
        <IconTabsHeader
          name='search'
          position='right'
          onPress={() => {
            t('首页.跳转', {
              to: 'Search'
            })
            navigation.push('Search')
          }}
        />
      </>
    ),
    tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
    tabBarLabel: '进度'
  })

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    // $不能通过contextType传递进去navigation里面, 只能通过下面的方法传递
    withTabsHeader.setTabs(navigation, <Tabs $={$} />)
    navigation.setParams({
      headerLeft: (
        <IconNotify
          navigation={navigation}
          event={{
            id: '首页.跳转'
          }}
        />
      ),
      headerBackground: <HeaderBackground />
    })

    setTimeout(() => {
      const id = userStore.userInfo.username || userStore.myUserId
      t('其他.启动', {
        userId: id
      })
      hm(`?id=${id}`, 'Home')
    }, 2000)
  }

  render() {
    const { $, navigation } = this.context
    if (!$.isLogin) {
      return (
        <NavigationEvents
          onWillFocus={() => {
            navigation.navigate('Auth')
          }}
        />
      )
    }

    const { grid, visible, subjectId, _loaded } = $.state
    if (!_loaded) {
      return (
        <SafeAreaView
          style={_.container.screen}
          forceInset={{ top: 'never' }}
        />
      )
    }

    const { name, name_cn: nameCn } = $.subject(subjectId)
    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        <NavigationBarEvents />
        <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
          {tabs.map(({ title }) =>
            grid ? (
              <Grid key={title} title={title} />
            ) : (
              <List key={title} title={title} />
            )
          )}
        </Tabs>
        <ManageModal
          visible={visible}
          subjectId={subjectId}
          title={nameCn || name}
          desc={name}
          onSubmit={$.doUpdateCollection}
          onClose={$.closeManageModal}
        />
      </SafeAreaView>
    )
  }
}
