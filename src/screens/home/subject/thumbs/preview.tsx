/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 18:47:23
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { systemStore } from '@stores'
import { showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'
import { styles } from './styles'

function Preview({ item, index, thumbs, epsThumbsHeader }, { $ }: Ctx) {
  const { showCharacter } = systemStore.setting
  if (!showCharacter) return null

  return (
    <Touchable
      style={index ? styles.image : styles.imageSide}
      animate
      onPress={() => {
        t('条目.预览', {
          subjectId: $.subjectId
        })

        showImageViewer(
          thumbs.filter((item, index) => index < 12),
          index
        )
      }}
    >
      <Image
        key={item}
        src={item}
        size={THUMB_WIDTH}
        height={THUMB_HEIGHT}
        radius
        headers={epsThumbsHeader}
      />
    </Touchable>
  )
}

export default obc(Preview)
