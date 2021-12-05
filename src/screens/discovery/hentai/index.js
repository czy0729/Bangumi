/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 12:51:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { FilterSwitch, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const Wenku = (props, { $, navigation }) => {
  useMount(() => {
    $.init()
    navigation.setParams({
      extra: (
        <Flex style={_.mr._right}>
          <IconLayout $={$} />
          <IconHeader name='md-vertical-align-top' onPress={$.scrollToTop}>
            <Heatmap id='Hentai.到顶' />
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
      {!$.access ? (
        <>
          <FilterSwitch name='Hentai' />
          <Text style={_.mt.lg} align='center'>
            此功能暂不开放
          </Text>
        </>
      ) : (
        <List />
      )}
    </View>
  ))
}

export default injectWithHeader(Store, Wenku, {
  screen: '找番剧',
  alias: 'Hentai',
  hm: ['hentai', 'Hentai']
})
