/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 12:37:06
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const Game = (props, { $, navigation }) => {
  useMount(() => {
    $.init()
    navigation.setParams({
      extra: (
        <Flex style={_.mr._right}>
          <IconLayout $={$} />
          <IconHeader name='md-vertical-align-top' onPress={$.scrollToTop}>
            <Heatmap id='Game.到顶' />
          </IconHeader>
        </Flex>
      )
    })

    return () => {
      $.scrollToOffset = null
    }
  })

  return useObserver(() => (
    <View style={_.container.plain}>
      <List />
    </View>
  ))
}

export default injectWithHeader(Store, Game, {
  screen: '找游戏',
  hm: ['game', 'Game']
})
