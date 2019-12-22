/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-22 17:21:57
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader } from '@utils/decorators'
import { t } from '@utils/fetch'
import { headerStyle } from '../styles'
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
  ...headerStyle
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
          <IconHeader
            name='fen-xi'
            color={_.colorTinygrailText}
            size={18}
            onPress={onPress}
          />
          <Text
            style={{
              marginLeft: -2,
              color: _.colorTinygrailText
            }}
            onPress={onPress}
          >
            分析
          </Text>
        </Flex>
      )
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
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
}
