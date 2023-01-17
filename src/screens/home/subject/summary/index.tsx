/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 02:25:07
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Summary from './summary'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  global.rerender('Subject.Summary')

  const { showSummary } = systemStore.setting
  if (showSummary === -1 || ($.subject._loaded && !$.summary)) return null

  return (
    <Summary
      styles={memoStyles()}
      showSummary={showSummary}
      translateResult={$.state.translateResult}
      content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
