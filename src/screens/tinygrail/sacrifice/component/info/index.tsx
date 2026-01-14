/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:42:22
 */
import React from 'react'
import { View } from 'react-native'
import { tinygrailStore, useStore } from '@stores'
import { useMount, useObserver } from '@utils/hooks'
import Cover from './cover'
import Detail from './detail'
import Expand from './expand'
import Progress from './progress'
import Starforce from './starforce'
import Title from './title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Info() {
  const { $ } = useStore<Ctx>(COMPONENT)

  useMount(() => {
    $.fetchQueueUnique([
      $.fetchCharacters,
      $.fetchIssuePrice,
      $.fetchValhallChara,
      $.fetchPicTotal,
      $.fetchMono
    ])

    if ($.monoId && $.name) tinygrailStore.setLastPic($.monoId, $.name)
  })

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <Cover />
        <Title />
        <Starforce />
        <Detail />
        <Progress />
        <Expand />
      </View>
    )
  })
}

export default Info
