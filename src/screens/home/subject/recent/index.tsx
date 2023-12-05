/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 09:22:56
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { URL_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../types'
import Recent from './recent'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Recent')

  const { showRecent } = systemStore.setting
  if (showRecent === -1) return null

  const { who } = $.subjectFormHTML
  let _who = who || []
  if ($.filterDefault || $.isLimit) {
    _who = _who.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
  }
  if (!_who.length) return null

  return (
    <Recent
      navigation={navigation}
      showRecent={showRecent}
      subjectId={$.subjectId}
      who={_who}
      hideScore={$.hideScore}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
