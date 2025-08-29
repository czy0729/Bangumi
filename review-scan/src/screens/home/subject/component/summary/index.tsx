/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 17:33:30
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { TITLE_SUMMARY } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Summary from './summary'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SummaryWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showSummary[1]) return null

  return (
    <Component id='screen-subject-summary'>
      <View
        ref={ref => onBlockRef(ref, TITLE_SUMMARY)}
        style={_.container.layout}
        collapsable={false}
      />
      <Summary
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        showSummary={systemStore.setting.showSummary}
        subjectHtmlExpand={systemStore.setting.subjectHtmlExpand}
        translateResult={$.state.translateResult.slice()}
        content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
        name={cnjp($.cn, $.jp)}
        onSwitchBlock={$.onSwitchBlock}
      />
      <Split />
    </Component>
  )
}

export default ob(SummaryWrap, COMPONENT)
