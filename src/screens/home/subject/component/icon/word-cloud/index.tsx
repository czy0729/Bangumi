/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:09:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 04:19:17
 */
import React from 'react'
import { Image, Link } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function WordCloud() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Link
        style={styles.wordCloud}
        path='WordCloud'
        params={{
          subjectId: $.subjectId,
          _type: $.type
        }}
        eventId='条目.跳转'
        eventData={{
          to: 'WordCloud',
          subjectId: $.subjectId
        }}
      >
        <Image
          src={_.select(GROUP_THUMB_MAP.wordcloud_0, GROUP_THUMB_MAP.wordcloud)}
          size={19}
          resizeMode='contain'
          placeholder={false}
          skeleton={false}
        />
      </Link>
    )
  })
}

export default WordCloud
