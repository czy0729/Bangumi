/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 07:31:46
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_LIKE } from '../ds'
import { Ctx } from '../types'
import Like from './like'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Like')

  const { showLike } = systemStore.setting
  if (showLike === -1 || !$.like.length) return null

  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_LIKE)} />
      <Like
        navigation={navigation}
        showLike={showLike}
        subjectId={$.subjectId}
        like={$.like}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
