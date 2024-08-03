/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 13:45:19
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_LIKE } from '../../ds'
import { Ctx } from '../../types'
import Like from './like.lazy'
import { COMPONENT } from './ds'

function LikeWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showLike[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_LIKE)} />
      <Like
        navigation={navigation}
        showLike={systemStore.setting.showLike}
        subjectId={$.subjectId}
        like={$.like}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(LikeWrap, COMPONENT)
