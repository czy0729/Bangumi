/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 20:51:14
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconHeader } from '@screens/_'
import { inject, withHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { headerStyle, colorContainer, colorText } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Tabs from '../_/tabs'
import List from './list'
import Store, { tabs } from './store'

const title = '番市首富'

export default
@inject(Store)
@withHeader({
  screen: title,
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

    const onPress = () => navigation.push('TinygrailTreeRich')
    navigation.setParams({
      title,
      extra: (
        <Flex>
          <IconHeader
            name='fen-xi'
            color={colorText}
            size={18}
            onPress={onPress}
          />
          <Text
            style={{
              marginLeft: -2,
              color: colorText
            }}
            onPress={onPress}
          >
            分析
          </Text>
        </Flex>
      )
    })

    hm('tinygrail/rich', 'TinygrailRich')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: colorContainer
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
