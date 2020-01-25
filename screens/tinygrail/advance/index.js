/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-24 17:41:39
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { withHeader } from '@utils/decorators'
import { t } from '@utils/fetch'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Menus from './menus'

const title = '高级分析'

export default
@withHeader({
  screen: title,
  hm: ['tinygrail/advance', 'TinygrailAdvance'],
  ...headerStyle
})
class TinygrailAdvance extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({
      extra: (
        <IconHeader
          name='information'
          color={_.__colorPlain__}
          onPress={() => {
            t('高级分析.提示')

            Alert.alert(
              '提示',
              '本栏目功能建立于作者自身想法, 核心基于角色股息, 仅供参考\n普通用户每个功能4小时内只能刷新1次\n高级用户为防止误刷新对服务器造成不必要的压力也有1分钟限制\n高级用户的定义为付过费的用户, 人工维护\n功能算法有更好的可以反馈',
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
    const { navigation } = this.props
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
        <Menus navigation={navigation} />
      </View>
    )
  }
}
