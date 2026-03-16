/*
 * @Author: czy0729
 * @Date: 2025-02-07 06:15:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 18:34:43
 */
import React from 'react'
import { IconAssets } from '@_'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function WordCloud() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if ($.isEp) return null

    return (
      <IconAssets
        style={styles.icon}
        size={17}
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
    )
  })
}

export default WordCloud
