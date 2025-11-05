/*
 * @Author: czy0729
 * @Date: 2021-08-07 07:13:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 19:48:08
 */
import React, { useCallback } from 'react'
import { Eps as EpsComp } from '@_'
import { _, userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { Ctx, EpsItem } from '../../../types'
import { COMPONENT, LAYOUT_WIDTH } from './ds'

function Eps() {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const handleSelect = useCallback((value: string, item: EpsItem) => {
      $.doEpsSelect(value, item, navigation)
    }, [])

    return (
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
    )
  })
}

export default ob(Eps, COMPONENT)
