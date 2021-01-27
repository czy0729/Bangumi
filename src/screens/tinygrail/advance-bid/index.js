/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:16:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:07:16
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ToolBar from '../_/tool-bar'
import List from './list'
import Store from './store'

const title = '买一推荐'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/advance-bid', 'TinygrailAdvanceBid'],
  withHeaderParams
})
@obc
class TinygrailAdvanceBid extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <IconHeader
          name='information'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('买一推荐.提示')

            Alert.alert(
              '当前计算方式',
              '从持仓列表里面查找\n第一买单股数 > 0\n第一买单价 / Max(流动股息, 圣殿股息) = 分数',
              [
                {
                  text: '知道了'
                }
              ]
            )
          }}
        />
      )
    })
  }

  render() {
    const { $ } = this.context
    const { level } = $.state
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ToolBar
          level={level}
          levelMap={$.levelMap}
          onLevelSelect={$.onLevelSelect}
        />
        <List />
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
