/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 07:15:50
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Summary from './summary'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  rerender('Subject.Summary')

  const { showSummary } = systemStore.setting
  if (showSummary === -1 || ($.subject._loaded && !$.summary)) return null

  return (
    <Summary
      styles={memoStyles()}
      showSummary={showSummary}
      translateResult={$.state.translateResult.slice()}
      content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
