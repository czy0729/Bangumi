/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 18:21:59
 */
import React from 'react'
import { View } from 'react-native'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { alert } from '@utils/ui'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import List from './list'
import Store from './store'

const title = '卖一推荐'

class TinygrailAdvanceAsk extends React.Component {
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
            t('卖一推荐.提示')

            alert(
              '从活跃列表里面查找\n第一卖单股数 > 10 且 Max(流动股息, 圣殿股息) > 4\nMax(流动股息, 圣殿股息) / 第一卖单价 * 10 = 分数',
              '当前计算方式'
            )
          }}
        />
      )
    })
  }

  render() {
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <List />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(
  withHeader({
    screen: title,
    hm: ['tinygrail/advance-ask', 'TinygrailAdvanceAsk'],
    withHeaderParams
  })(obc(TinygrailAdvanceAsk))
)

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
