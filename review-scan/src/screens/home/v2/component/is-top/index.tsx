/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:18:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-21 18:17:34
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { useStore } from '@stores'
import { confirm, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { TEXT_UNPIN } from '../../store/ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function IsTop({ style, subjectId }: Props) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if ($.state.top.indexOf(subjectId) === -1) return null

    const styles = memoStyles()
    return (
      <View style={stl(styles.top, style)}>
        <Touchable
          style={styles.touch}
          onPress={() => {
            confirm(`${TEXT_UNPIN}?`, () => $.itemToggleTop(subjectId, false))
          }}
        >
          <View style={styles.angle} />
        </Touchable>
      </View>
    )
  })
}

export default IsTop
