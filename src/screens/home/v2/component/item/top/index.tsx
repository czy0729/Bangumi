/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:18:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 09:34:58
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Top(
  {
    subjectId
  }: {
    subjectId: SubjectId
  },
  { $ }: Ctx
) {
  if ($.state.top.indexOf(subjectId) === -1) return null

  const styles = memoStyles()
  return <View style={styles.top} />
}

export default obc(Top, COMPONENT)
