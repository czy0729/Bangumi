/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 16:47:37
 */
import React from 'react'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { IconTabsHeader, IconTabBar, HeaderBackground } from '@screens/_'
import { _ } from '@stores'
import { inject, withTabsHeader, observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

const title = '时间胶囊'

export default
@inject(Store)
@withTabsHeader({
  screen: title,
  hm: ['timeline', 'Timeline']
})
@observer
class Timeline extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconTabBar name='time' color={tintColor} />,
    tabBarLabel: title
  }

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
      headerRight: (
        <IconTabsHeader
          name='add'
          position='right'
          onPress={() => {
            if (!$.isWebLogin) {
              info('请先登录')
              return
            }

            t('时间胶囊.新吐槽')

            navigation.push('Say', {
              onNavigationCallback: $.fetchTimeline
            })
          }}
        />
      ),
      headerBackground: <HeaderBackground />
    })
  }

  render() {
    const { $ } = this.context
    const { scope, _loaded } = $.state
    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        {_loaded && (
          <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
            {tabs.map(item => (
              <List key={item.title} title={item.title} scope={scope} />
            ))}
          </Tabs>
        )}
      </SafeAreaView>
    )
  }
}
