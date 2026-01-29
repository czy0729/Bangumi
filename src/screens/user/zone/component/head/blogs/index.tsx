/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:04:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:02:53
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Blogs({ style }: WithViewStyles) {
  const { $, navigation } = useStore<Ctx>()

  const handlePress = useCallback(() => {
    navigation.push('Blogs', {
      userId: $.userId
    })

    t('空间.跳转', {
      userId: $.userId,
      to: 'Blogs'
    })
  }, [$, navigation])

  return useObserver(() => (
    <View style={style}>
      <Touchable animate scale={0.8} onPress={handlePress}>
        <Text type={_.select('plain', 'title')} size={11} bold shadow noWrap>
          日志
        </Text>
      </Touchable>
      <Heatmap right={-74} bottom={-8} id='空间.跳转' to='Blogs' alias='日志' />
    </View>
  ))
}

export default Blogs
