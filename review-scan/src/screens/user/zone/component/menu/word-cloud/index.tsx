/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 17:36:54
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { GROUP_THUMB_MAP } from '@assets/images'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Milestone() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        const { id, username } = $.usersInfo
        const userId = username || id
        navigation.push('WordCloud', {
          userId
        })

        t('空间.跳转', {
          to: 'WordCloud',
          userId
        })
      }}
    >
      <Image
        src={GROUP_THUMB_MAP.wordcloud}
        size={19}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  )
}

export default ob(Milestone)
