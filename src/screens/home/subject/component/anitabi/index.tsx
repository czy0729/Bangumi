/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 13:37:43
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_ANITABI } from '../../ds'
import { Ctx } from '../../types'
import Anitabi from './anitabi.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AnitabiWrap({ onBlockRef }, { $ }: Ctx) {
  if (!$.showAnitabi[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_ANITABI)} />
      <Anitabi
        styles={memoStyles()}
        showAnitabi={systemStore.setting.showAnitabi}
        subjectId={$.subjectId}
        data={$.state.anitabi}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(AnitabiWrap, COMPONENT)
