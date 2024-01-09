/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:26:31
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_INFO } from '../../ds'
import { Ctx } from '../../types'
import Info from './info'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function InfoWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showInfo[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_INFO)} />
      <Info
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        showInfo={systemStore.setting.showInfo}
        info={$.info}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(InfoWrap, COMPONENT)
