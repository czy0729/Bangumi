/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 21:49:32
 */
import React from 'react'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconTabBar, ManageModal } from '@screens/_'
import { inject, withTabsHeader } from '@utils/decorators'
import _ from '@styles'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

export default
@inject(Store)
@withTabsHeader()
@observer
class Home extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='heart' tintColor={tintColor} />
    ),
    tabBarLabel: '进度'
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

    const { visible, subjectId, _loaded } = $.state
    if (!_loaded) {
      return null
    }

    const { name, name_cn: nameCn } = $.subject(subjectId)
    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
          {tabs.map(item => (
            <List key={item.title} title={item.title} />
          ))}
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
