/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:06:50
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
import Store, { sortDS } from './store'

const title = '拍卖推荐 (按固定)'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/advance-auction2', 'TinygrailAdvanceAuction2'],
  withHeaderParams
})
@obc
class TinygrailAdvanceAuction2 extends React.Component {
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
            t('竞拍推荐.提示', {
              type: 2
            })

            Alert.alert(
              '当前计算方式',
              '从英灵殿里面查找前2000条\n圣殿股息 > 2 且 数量 > 80\n圣殿股息 / 竞拍底价 * 10 = 分数',
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
    const { level, sort } = $.state
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ToolBar
          level={level}
          levelMap={$.levelMap}
          data={sortDS}
          sort={sort}
          direction={sort ? 'down' : undefined}
          onLevelSelect={$.onLevelSelect}
          onSortPress={$.onSortPress}
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
