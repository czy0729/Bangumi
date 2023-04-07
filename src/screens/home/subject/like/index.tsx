/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:42:49
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Like from './like'

export default obc((props, { $, navigation }: Ctx) => {
  // global.rerender('Subject.Like')

  const { showLike } = systemStore.setting
  if (showLike === -1 || !$.like.length) return null

  return (
    <Like
      navigation={navigation}
      showLike={showLike}
      subjectId={$.subjectId}
      like={$.like}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
