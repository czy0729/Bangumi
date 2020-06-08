/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 11:15:17
 */
import React from 'react'
import { Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import List from './list'
import Store from './store'

const title = '卖一推荐'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/advance-ask', 'TinygrailAdvanceAsk'],
  withHeaderParams
})
@observer
class TinygrailAdvanceAsk extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
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
            t('卖一推荐.提示')

            Alert.alert(
              '当前计算方式',
              '从活跃列表里面查找\n第一卖单股数 > 10 且 Max(流动股息, 圣殿股息) > 4\nMax(流动股息, 圣殿股息) / 第一卖单价 * 10 = 分数',
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
