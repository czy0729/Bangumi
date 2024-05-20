/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 15:56:27
 */
import React from 'react'
import { View } from 'react-native'
import { c } from '@utils/decorators'
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

function Info(props, { $ }: Ctx) {
  r(COMPONENT)

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

export default c(Info)
