/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:09:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-29 06:28:23
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function WordCloud() {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Touchable
        style={styles.wordCloud}
        onPress={() => {
          navigation.push('WordCloud', {
            subjectId: $.subjectId,
            _type: $.type
          })

          t('条目.跳转', {
            to: 'WordCloud',
            subjectId: $.subjectId
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
  })
}

export default WordCloud
