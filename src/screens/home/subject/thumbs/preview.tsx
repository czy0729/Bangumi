/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:38:42
 */
import React from 'react'
import { Image } from '@components'
import { _, systemStore } from '@stores'
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
    <Image
      key={item}
      style={[styles.image, !!index && _.ml.sm]}
      src={item}
      size={THUMB_WIDTH}
      height={THUMB_HEIGHT}
      radius
      headers={epsThumbsHeader}
      onPress={() => {
        t('条目.预览', {
          subjectId: $.subjectId
        })

        showImageViewer(
          thumbs.filter((item, index) => index < 12),
          index
        )
      }}
    />
  )
}

export default obc(Preview)
