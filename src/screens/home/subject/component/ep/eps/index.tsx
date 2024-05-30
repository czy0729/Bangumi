/*
 * @Author: czy0729
 * @Date: 2021-08-07 07:13:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 10:26:27
 */
import React from 'react'
import { Eps as EpsComp } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { InferArray } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, LAYOUT_WIDTH } from './ds'

function Eps(props, { $, navigation }: Ctx) {
  const showPlay = !$.isLimit && $.onlinePlayActionSheetData.length >= 2
  return (
    <EpsComp
      layoutWidth={LAYOUT_WIDTH}
      marginRight={_.isLandscape ? 0 : _._wind}
      advance
      pagination
      login={$.isLogin}
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

export default obc(Eps, COMPONENT)
