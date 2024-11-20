/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:21:43
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
import Starforce from './starforce'
import Title from './title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchCharacters, $.fetchIssuePrice])
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={styles.container}>
        <Cover />
        <Title />
        <Starforce />
        <Detail />
        <Expand />
      </View>
    )
  })
}

export default Info
