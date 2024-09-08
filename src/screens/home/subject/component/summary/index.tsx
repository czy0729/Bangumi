/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:43:46
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_SUMMARY } from '../../ds'
import { Ctx } from '../../types'
import Summary from './summary'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SummaryWrap({ onBlockRef }, { $ }: Ctx) {
  if (!$.showSummary[1]) return null

  return (
    <Component id='screen-subject-summary'>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_SUMMARY)} />
      <Summary
        styles={memoStyles()}
        showSummary={systemStore.setting.showSummary}
        translateResult={$.state.translateResult.slice()}
        content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
        onSwitchBlock={$.onSwitchBlock}
      />
    </Component>
  )
}

export default obc(SummaryWrap, COMPONENT)
