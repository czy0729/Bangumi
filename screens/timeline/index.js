/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 17:54:41
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs } from '@components'
import inject from '@utils/inject'
import _ from '@styles'
import TabBarLeft from './tab-bar-left'
import List from './list'
import Store, { tabs } from './store'

class Timeline extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { scope, page } = $.state
    return (
      <View style={_.container.screen}>
        <Tabs
          tabs={tabs}
          initialPage={page}
          renderTabBarLeft={<TabBarLeft $={$} />}
          onChange={$.tabsChange}
        >
          {tabs.map(item => (
            <List key={item.title} title={item.title} scope={scope} />
          ))}
        </Tabs>
      </View>
    )
  }
}

export default inject(Store)(observer(Timeline))
