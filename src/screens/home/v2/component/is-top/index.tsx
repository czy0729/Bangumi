/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:18:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:30:53
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { useStore } from '@stores'
import { confirm, stl } from '@utils'
import { TEXT_UNPIN } from '../../store/ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function IsTop({ style, subjectId }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    confirm(`${TEXT_UNPIN}?`, () => {
      $.itemToggleTop(subjectId, false)
    })
  }, [$, subjectId])

  if ($.state.top.indexOf(subjectId) === -1) return null

  const styles = memoStyles()

  return (
    <View style={stl(styles.top, style)}>
      <Touchable style={styles.touch} onPress={handlePress}>
        <View style={styles.angle} />
      </Touchable>
    </View>
  )
}

export default observer(IsTop)
