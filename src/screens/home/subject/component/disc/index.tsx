/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:25:02
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Disc from './disc'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function DiscWrap(_props, { $, navigation }: Ctx) {
  return (
    <Disc
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      disc={$.disc}
      discTranslateResult={$.state.discTranslateResult}
      focusOrigin={systemStore.setting.focusOrigin}
    />
  )
}

export default obc(DiscWrap, COMPONENT)
