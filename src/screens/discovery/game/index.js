/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-09 13:10:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const title = '找游戏'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['game', 'Game']
})
@obc
class Game extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <Flex style={_.mr._right}>
          <IconLayout $={$} />
          <IconHeader name='md-vertical-align-top' onPress={$.scrollToTop}>
            <Heatmap id='游戏.到顶' />
          </IconHeader>
        </Flex>
      )
    })
  }

  componentWillUnmount() {
    const { $ } = this.context
    $.scrollToOffset = null
  }

  render() {
    return (
      <View style={_.container.plain}>
        <List />
      </View>
    )
  }
}
