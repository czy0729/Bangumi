/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:41:13
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { TITLE_SUMMARY } from '../../ds'
import { Ctx } from '../../types'
import Summary from './summary'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SummaryWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showSummary[1]) return null

  return (
    <Component id='screen-subject-summary'>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_SUMMARY)} />
      <Summary
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        showSummary={systemStore.setting.showSummary}
        translateResult={$.state.translateResult.slice()}
        content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
        name={cnjp($.cn, $.jp)}
        onSwitchBlock={$.onSwitchBlock}
      />
    </Component>
  )
}

export default obc(SummaryWrap, COMPONENT)
