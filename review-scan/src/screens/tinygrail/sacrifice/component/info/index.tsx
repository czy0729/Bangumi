/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 15:46:00
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useMount, useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Cover from './cover'
import Detail from './detail'
import Expand from './expand'
import Progress from './progress'
import Starforce from './starforce'
import Title from './title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([
      $.fetchCharacters,
      $.fetchIssuePrice,
      $.fetchValhallChara,
      $.fetchPicTotal,
      $.fetchMono
    ])
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
