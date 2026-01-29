/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 17:36:54
 */
import React, { useCallback } from 'react'
import { Image, Touchable } from '@components'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function WordCloud() {
  const { $, navigation } = useStore<Ctx>()

  const handlePress = useCallback(() => {
    const { id, username } = $.usersInfo
    const userId = username || id
    navigation.push('WordCloud', {
      userId
    })

    t('空间.跳转', {
      to: 'WordCloud',
      userId
    })
  }, [$, navigation])

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Touchable style={styles.touch} onPress={handlePress}>
        <Image
          src={GROUP_THUMB_MAP.wordcloud}
          size={19}
          resizeMode='contain'
          placeholder={false}
          skeleton={false}
        />
      </Touchable>
    )
  })
}

export default WordCloud
