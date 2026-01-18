/*
 * @Author: czy0729
 * @Date: 2025-02-07 06:15:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 17:49:37
 */
import React from 'react'
import { View } from 'react-native'
import { IconAssets } from '@_'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function WordCloud() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if ($.isEp) return null

    return (
      <View
        style={{
          opacity: 0.64
        }}
      >
        <IconAssets
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
  })
}

export default WordCloud
