/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-02 08:38:05
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const Rank = (props, { $, navigation }) => {
  useMount(() => {
    $.init()
    $.setParams(navigation)
  })

  return useObserver(() => (
    <View style={_.container.plain}>
      <ToolBar />
      {$.state._loaded && <List />}
    </View>
  ))
}

export default injectWithHeader(Store, Rank, {
  screen: '排行榜',
  hm: ['rank', 'Rank']
})
