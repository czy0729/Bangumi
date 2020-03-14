/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-14 17:21:44
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
import { navigationReference } from '@utils/app'
import { MODEL_INITIAL_PAGE } from '@constants/model'
import Tabs from './tabs'
import List from './list'
import Grid from './grid'
import Store, { tabs } from './store'

const title = '首页'
const forceInset = {
  top: 'never'
}

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

  componentWillMount() {
    const { $, navigation } = this.context
    navigationReference(navigation)

    $.init()

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

    this.updateInitialPage()

    setTimeout(() => {
      const id = userStore.userInfo.username || userStore.myUserId
      t('其他.启动', {
        userId: id
      })
      hm(`?id=${id}`, 'Home')
    }, 8000)
  }

  onWillFocus = () => {
    const { navigation } = this.context
    navigation.navigate('Auth')
  }

  updateInitialPage = () => {
    const { $, navigation } = this.context
    if ($.initialPage === MODEL_INITIAL_PAGE.getValue('进度')) {
      return
    }

    if ($.initialPage === MODEL_INITIAL_PAGE.getValue('小圣杯')) {
      navigation.push('Tinygrail')
      return
    }

    navigation.navigate($.initialPage)
  }

  render() {
    const { $ } = this.context
    if (!$.isLogin) {
      return (
        <>
          <NavigationEvents onWillFocus={this.onWillFocus} />
          <SafeAreaView style={_.container.screen} forceInset={forceInset} />
        </>
      )
    }

    const { grid, visible, subjectId, _loaded } = $.state
    if (!_loaded) {
      return <SafeAreaView style={_.container.screen} forceInset={forceInset} />
    }

    const { name, name_cn: nameCn } = $.subject(subjectId)
    return (
      <SafeAreaView style={_.container.screen} forceInset={forceInset}>
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
