/*
 * @Author: czy0729
 * @Date: 2021-08-07 07:13:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 17:39:00
 */
import React, { useCallback } from 'react'
import { Eps as EpsComp } from '@_'
import { _, userStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, LAYOUT_WIDTH } from './ds'

import type { Ctx, EpsItem } from '../../../types'

function Eps() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (value: string, item: EpsItem) => {
      $.doEpsSelect(value, item, navigation)
    },
    [$, navigation]
  )

  return useObserver(() => (
    <EpsComp
      layoutWidth={LAYOUT_WIDTH}
      marginRight={_.isLandscape ? 0 : _._wind}
      advance
      pagination
      login={userStore.isLogin}
      subjectId={$.params.subjectId}
      eps={$.toEps}
      userProgress={$.userProgress}
      canPlay={$.onlinePlayActionSheetData.length >= 2}
      flip={$.state.flipEps}
      onFliped={$.afterEpsFlip}
      onSelect={handleSelect}
    />
  ))
}

export default Eps
