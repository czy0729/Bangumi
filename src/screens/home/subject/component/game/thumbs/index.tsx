/*
 * @Author: czy0729
 * @Date: 2024-08-13 11:42:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:45:12
 */
import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Image, ScrollView } from '@components'
import { _, useStore } from '@stores'
import { showImageViewer } from '@utils'
import { t } from '@utils/fetch'
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
      onScroll={handleScroll}
    >
      {thumbs
        .filter((_item, index) => index <= (scrolled ? 12 : 4))
        .map((item, index) => (
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
