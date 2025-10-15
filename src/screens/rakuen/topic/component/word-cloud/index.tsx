/*
 * @Author: czy0729
 * @Date: 2025-02-07 06:15:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 17:49:37
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { IconWordCloud } from '@_'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
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
  })
}

export default WordCloud
