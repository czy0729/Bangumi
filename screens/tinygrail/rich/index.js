/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 11:49:06
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Tabs from '../_/tabs'
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
@observer
class TinygrailRich extends React.Component {
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
          <Tabs tabs={tabs}>
            {tabs.map((item, index) => (
              <List key={item.key} index={index} />
            ))}
          </Tabs>
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
