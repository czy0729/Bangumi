/*
 * @Author: czy0729
 * @Date: 2025-02-07 06:15:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-07 06:42:28
 */
import React from 'react'
import { View } from 'react-native'
import { IconWordCloud } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function WordCloud() {
  const { $, navigation } = useStore<Ctx>()
  if ($.isEp) return null

  return (
    <View
      style={{
        opacity: 0.64
      }}
    >
      <IconWordCloud
        onPress={() => {
          navigation.push('WordCloud', {
            topicId: $.topicId
          })

          t('帖子.跳转', {
            to: 'WordCloud',
            topicId: $.topicId
          })
        }}
      />
    </View>
  )
}

export default ob(WordCloud, COMPONENT)
