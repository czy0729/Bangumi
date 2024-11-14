/*
 * @Author: czy0729
 * @Date: 2021-08-07 07:13:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:39:18
 */
import React from 'react'
import { Eps as EpsComp } from '@_'
import { _, userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { InferArray } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, LAYOUT_WIDTH } from './ds'

function Eps() {
  const { $, navigation } = useStore<Ctx>()
  const showPlay = $.onlinePlayActionSheetData.length >= 2
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
      canPlay={showPlay}
      flip={$.state.flipEps}
      onFliped={$.afterEpsFlip}
      onSelect={(value, item: InferArray<typeof $.toEps>) => {
        $.doEpsSelect(value, item, navigation)
      }}
    />
  )
}

export default ob(Eps, COMPONENT)
