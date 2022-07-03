/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 18:27:25
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

const title = '献祭推荐'

class TinygrailAdvanceSacrifice extends React.Component {
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
            t('献祭推荐.提示')

            alert('从持仓列表里面查找\n圣殿股息 - 流动股息 = 分数', '当前计算方式')
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
    hm: ['tinygrail/advance-sacrifice', 'TinygrailAdvanceSacrifice'],
    withHeaderParams
  })(obc(TinygrailAdvanceSacrifice))
)

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
