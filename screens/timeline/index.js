/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-18 20:02:35
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, Tabs } from '@components'
import inject from '@utils/inject'
import _, { colorBg } from '@styles'
import TabBarLeft from './tab-bar-left'
import List from './list'
import Store, { tabs } from './store'

class Timeline extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.initFetch()
  }

  render() {
    const { $ } = this.context
    const { loading, page } = $.state
    if (loading) {
      return <Loading />
    }

    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: colorBg
          }
        ]}
      >
        <Tabs
          tabs={tabs}
          initialPage={page}
          renderTabBarLeft={<TabBarLeft $={$} />}
          onChange={$.tabsChange}
        >
          {tabs.map(item => (
            <List key={item.title} title={item.title} />
          ))}
        </Tabs>
      </View>
    )
  }
}

export default inject(Store)(observer(Timeline))
