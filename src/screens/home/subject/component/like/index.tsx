/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 12:47:12
 */
import React, { Suspense } from 'react'
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
    <Suspense fallback={null}>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_LIKE)} />
      <Like
        navigation={navigation}
        showLike={systemStore.setting.showLike}
        subjectId={$.subjectId}
        like={$.like}
        typeCn={$.type}
        onSwitchBlock={$.onSwitchBlock}
      />
    </Suspense>
  )
}

export default obc(LikeWrap, COMPONENT)
