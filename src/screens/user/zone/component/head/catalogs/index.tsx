/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:07:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:03:02
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Catalogs({ style }: WithViewStyles) {
  const { $, navigation } = useStore<Ctx>()

  const handlePress = useCallback(() => {
    navigation.push('Catalogs', {
      userId: $.userId
    })

    t('空间.跳转', {
      userId: $.userId,
      to: 'Catalogs'
    })
  }, [$, navigation])

  return useObserver(() => (
    <View style={style}>
      <Touchable animate scale={0.8} onPress={handlePress}>
        <Text type={_.select('plain', 'title')} size={11} bold shadow noWrap>
          目录
        </Text>
      </Touchable>
      <Heatmap right={-76} bottom={-8} id='空间.跳转' to='Catalogs' alias='目录' />
    </View>
  ))
}

export default Catalogs
