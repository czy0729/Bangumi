/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:58:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-02 01:26:35
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'

function Recent({ style }, { $ }: Ctx) {
  let activeText = '历史'
  if ($.usersTimeline.list.length && $.usersTimeline.list?.[0]?.time) {
    activeText = `${String($.usersTimeline.list[0]?.time.split(' ·')?.[0]).replace('·', '')}活跃`
  }
  return (
    <View style={style}>
      <Touchable
        animate
        scale={0.9}
        onPress={() => {
          t('空间.历史', {
            userId: $.userId
          })

          $.openUsedModal()
        }}
      >
        <Text type={_.select('plain', 'title')} size={11} bold noWrap>
          {activeText}
        </Text>
      </Touchable>
      <Heatmap id='空间.历史' />
    </View>
  )
}

export default obc(Recent)
