/*
 * @Author: czy0729
 * @Date: 2023-02-15 05:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:00:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { Text } from '../../../text'
import { memoStyles } from './styles'

import type { Props } from './types'

function Rank({ value }: Props) {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()

  return (
    <Text style={styles.rank} size={9} lineHeight={10} bold align='center'>
      {value}
    </Text>
  )
}

export default observer(Rank)
