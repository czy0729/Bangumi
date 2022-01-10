/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 12:33:45
 */
import React from 'react'
import { Page } from '@components'
import { IconHoriz } from '@_'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Tabs from './tabs'
import Heatmaps from './heatmaps'
import Store from './store'

const Character = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page>
      {!!$.state._loaded && <Tabs />}
      <Heatmaps />
    </Page>
  ))
}

export default injectWithHeader(Store, Character, {
  screen: '用户人物',
  hm: ['character', 'Character'],
  defaultExtra: <IconHoriz />
})
