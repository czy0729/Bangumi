/*
 * @Author: czy0729
 * @Date: 2024-08-13 11:42:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:16:17
 */
import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { _, useStore } from '@stores'
import { showImageViewer } from '@utils'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { getThumbs } from './utils'
import { COMPONENT, THUMB_HEIGHT, THUMB_WIDTH } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Thumbs() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    if (!scrolled) setScrolled(true)
  }, [scrolled])

  const thumbs = getThumbs($.subjectId, $.gameInfo?.isADV)
  if (!thumbs?.length) return null

  return (
    <ScrollView
      style={_.mt.md}
      contentContainerStyle={_.container.wind}
      horizontal
      {...SCROLL_VIEW_RESET_PROPS}
      scrollEventThrottle={16}
      onScroll={handleScroll}
    >
      {thumbs.map((item, index) => (
        <Image
          key={item}
          style={index ? styles.image : styles.side}
          src={item}
          size={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          radius={_.radiusSm}
          errorToHide
          onPress={() => {
            const previews = getThumbs($.subjectId, $.gameInfo?.isADV, false).map(item => ({
              url: item
            }))
            if (!previews.length) return

            showImageViewer(previews, index)

            t('条目.游戏截图', {
              subjectId: $.subjectId
            })
          }}
        />
      ))}
    </ScrollView>
  )
}

export default observer(Thumbs)
