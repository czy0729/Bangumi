/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:09:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:31:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image, Link } from '@components'
import { _, useStore } from '@stores'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function WordCloud() {
  const { $ } = useStore<Ctx>()

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
}

export default observer(WordCloud)
