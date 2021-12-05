/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 17:40:45
 */
import React from 'react'
import { Loading } from '@components'
import { _ } from '@stores'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Type from './type'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const Calendar = (props, { $, navigation }) => {
  useMount(() => {
    $.init()

    navigation.setParams({
      extra: (
        <>
          <Type $={$} />
          <IconLayout $={$} />
        </>
      )
    })
  })

  return useObserver(() => {
    if (!$.calendar._loaded) return <Loading style={_.container.plain} />
    return <List />
  })
}

export default injectWithHeader(Store, Calendar, {
  screen: '找番剧',
  hm: ['calendar', 'Calendar']
})
