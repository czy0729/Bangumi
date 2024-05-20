/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 20:11:46
 */
import React from 'react'
import { View } from 'react-native'
import { c } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Expand from './expand'
import Head from './head'
import List from './list'

import { styles } from './styles'

function Temples(props, { $ }: Ctx) {
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

export default c(Temples)
