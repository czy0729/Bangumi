/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 08:32:05
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_SUMMARY } from '../ds'
import { Ctx } from '../types'
import Summary from './summary'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $ }: Ctx) => {
  rerender('Subject.Summary')

  if (!$.showSummary[1]) return null

  const { showSummary } = systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_SUMMARY)} />
      <Summary
        styles={memoStyles()}
        showSummary={showSummary}
        translateResult={$.state.translateResult.slice()}
        content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
