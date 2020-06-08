/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-01 22:41:00
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

const title = '拍卖推荐 (按固定)'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/advance-auction2', 'TinygrailAdvanceAuction2'],
  withHeaderParams
})
@observer
class TinygrailAdvanceAuction2 extends React.Component {
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
            t('竞拍推荐.提示', {
              type: 2
            })

            Alert.alert(
              '当前计算方式',
              '从英灵殿里面查找前2000条\n圣殿股息 > 2 且 数量 > 100\n圣殿股息 / 竞拍底价 * 10 = 分数',
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
