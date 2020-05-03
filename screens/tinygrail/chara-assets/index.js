/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-03 14:25:14
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ToolBar from '../_/tool-bar'
import Tabs from '../_/tabs'
import Right from './right'
import List from './list'
import Store, { tabs, sortDS } from './store'

const title = '我的持仓'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/chara/assets', 'TinygrailCharaAssets'],
  withHeaderParams
})
@observer
class TinygrailCharaAssets extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { userName } = params
    if (userName) {
      return {
        title: `${userName}的持仓`
      }
    }
    return {
      title
    }
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    const { form } = $.params
    if (form === 'lottery') {
      $.initFormLottery()
    } else {
      $.init()
    }

    navigation.setParams({
      extra: <Right $={$} />
    })
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
      <View style={this.styles.container}>
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

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
