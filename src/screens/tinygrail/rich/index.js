/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:19:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Tabs from '../_/tabs-v2'
import List from './list'
import Store, { tabs } from './store'

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
      <View style={this.styles.container}>
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
