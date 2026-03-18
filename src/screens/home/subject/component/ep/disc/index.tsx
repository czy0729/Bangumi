/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:10:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore, useStore } from '@stores'
import Disc from './disc'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function DiscWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <Disc
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      disc={$.disc}
      discTranslateResult={$.state.discTranslateResult.slice()}
      focusOrigin={systemStore.setting.focusOrigin}
    />
  )
}

export default observer(DiscWrap)
