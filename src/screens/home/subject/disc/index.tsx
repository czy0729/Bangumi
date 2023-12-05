/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 17:12:44
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Disc from './disc'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Disc')

  const { focusOrigin } = systemStore.setting
  return (
    <Disc
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      disc={$.disc}
      discTranslateResult={$.state.discTranslateResult.slice()}
      focusOrigin={focusOrigin}
    />
  )
})
