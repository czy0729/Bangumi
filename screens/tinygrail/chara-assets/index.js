/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 16:40:15
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
import ToolBar from '../_/tool-bar'
import Tabs from '../_/tabs'
import List from './list'
import Store, { tabs, sortDS } from './store'

const title = '我的持仓'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
})
@observer
class TinygrailCharaAssets extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    const { form } = $.params
    if (form === 'lottery') {
      $.initFormLottery()
    } else {
      $.init()
    }

    hm('tinygrail/chara/assets', 'TinygrailCharaAssets')
  }

  renderContentHeaderComponent() {
    const { $ } = this.context
    const { page, sort, direction } = $.state
    if (page !== 0) {
      return undefined
    }

    return (
      <ToolBar
        data={sortDS}
        sort={sort}
        direction={direction}
        onSortPress={$.onSortPress}
      />
    )
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
          <Tabs
            tabs={tabs}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
          >
            {tabs.map((item, index) => (
              <List key={item.key} index={index} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
