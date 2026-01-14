/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:20:41
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { useMount, useObserver } from '@utils/hooks'
import Expand from './expand'
import Head from './head'
import List from './list'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Temples() {
  const { $ } = useStore<Ctx>(COMPONENT)

  useMount(() => {
    $.fetchQueueUnique([$.fetchCharaTemple])
  })

  return useObserver(() => (
    <View style={styles.container}>
      <Head />
      {$.state.showTemples && <List />}
      <Expand />
    </View>
  ))
}

export default Temples
