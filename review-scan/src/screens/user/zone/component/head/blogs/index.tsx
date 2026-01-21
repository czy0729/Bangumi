/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:04:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:02:53
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'

function Blogs({ style }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <View style={style}>
      <Touchable
        animate
        scale={0.8}
        onPress={() => {
          t('空间.跳转', {
            userId: $.userId,
            to: 'Blogs'
          })

          navigation.push('Blogs', {
            userId: $.userId
          })
        }}
      >
        <Text type={_.select('plain', 'title')} size={11} bold shadow noWrap>
          日志
        </Text>
      </Touchable>
      <Heatmap right={-74} bottom={-8} id='空间.跳转' to='Blogs' alias='日志' />
    </View>
  )
}

export default ob(Blogs)
