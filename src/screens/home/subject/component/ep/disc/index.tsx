/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 19:29:37
 */
import React from 'react'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Disc from './disc'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function DiscWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Disc
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      disc={$.disc}
      discTranslateResult={$.state.discTranslateResult.slice()}
      focusOrigin={systemStore.setting.focusOrigin}
    />
  ))
}

export default DiscWrap
