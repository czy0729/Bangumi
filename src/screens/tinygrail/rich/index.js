/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-05 14:55:04
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import List from './list'
import Store from './store'
import { tabs } from './ds'

const title = '番市首富'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/rich', 'TinygrailRich'],
  withHeaderParams
})
@obc
class TinygrailRich extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const onPress = () => {
      t('番市首富.跳转', {
        to: 'TinygrailTreeRich'
      })

      navigation.push('TinygrailTreeRich')
    }
    navigation.setParams({
      title,
      extra: (
        <Flex>
          <Text type='tinygrailPlain' onPress={onPress}>
            [分析]
          </Text>
        </Flex>
      )
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs
            routes={tabs}
            renderItem={item => (
              <List key={item.key} id={item.key} title={item.title} />
            )}
          />
        )}
      </View>
    )
  }
}
