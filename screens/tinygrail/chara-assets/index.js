/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-03 22:08:47
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { inject, withHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { headerStyle, colorContainer } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Tabs from '../_/tabs'
import ToolBar from './tool-bar'
import List from './list'
import Store, { tabs } from './store'

export default
@inject(Store)
@withHeader(headerStyle)
@observer
class TinygrailCharaAssets extends React.Component {
  static navigationOptions = {
    title: '我的持仓'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail/chara/assets')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: colorContainer
          }
        ]}
      >
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs tabs={tabs} renderContentHeaderComponent={<ToolBar />}>
            {tabs.map((item, index) => (
              <List key={item.key} index={index} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
