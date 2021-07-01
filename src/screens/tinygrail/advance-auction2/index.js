/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-02 07:19:13
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from '@tinygrail/_/tool-bar'
import List from './list'
import Store, { sortDS } from './store'

const title = '拍卖推荐 B'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/advance-auction2', 'TinygrailAdvanceAuction2'],
  withHeaderParams
})
@obc
class TinygrailAdvanceAuction2 extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <IconHeader
          style={_.mr._right}
          name='md-info-outline'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('竞拍推荐.提示', {
              type: 2
            })

            Alert.alert(
              '当前计算方式',
              '从英灵殿里面查找前 2000 条\n数量 > 80\n若当前 rank > 500 按 500 时的实际股息 / 竞拍底价 * 100 = 分数',
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
