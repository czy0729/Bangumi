/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-02 08:49:13
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

const Anime = (props, { $, navigation }) => {
  useMount(() => {
    $.init()
    navigation.setParams({
      extra: (
        <Flex style={_.mr._right}>
          <IconLayout $={$} />
          <IconHeader name='md-vertical-align-top' onPress={$.scrollToTop}>
            <Heatmap id='Anime.到顶' />
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

export default injectWithHeader(Store, Anime, {
  screen: '找番剧',
  alias: 'Anime',
  hm: ['anime', 'Anime']
})
