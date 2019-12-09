/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 16:41:27
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { inject, withHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Tabs from '../_/tabs'
import List from './list'
import Store, { tabs } from './store'

const title = '资金日志'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
})
@observer
class TinygrailLogs extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail/logs', 'TinygrailLogs')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: _.colorTinygrailContainer
          }
        ]}
      >
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs tabs={tabs}>
            {tabs.map((item, index) => (
              <List key={item.key} index={index} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
