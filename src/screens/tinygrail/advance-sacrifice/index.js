/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:08:31
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import List from './list'
import Store from './store'

const title = '献祭推荐'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/advance-sacrifice', 'TinygrailAdvanceSacrifice'],
  withHeaderParams
})
@obc
class TinygrailAdvanceSacrifice extends React.Component {
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
            t('献祭推荐.提示')

            Alert.alert(
              '当前计算方式',
              '从持仓列表里面查找\n圣殿股息 - 流动股息 = 分数',
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
