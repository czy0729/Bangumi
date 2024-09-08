/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 17:46:40
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { showImageViewer, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import { IMAGE_HEIGHT } from '../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Preview({ item, index, thumbs, epsThumbsHeader }: Props, { $ }: Ctx) {
  if (!systemStore.setting.showCharacter) return null

  return (
    <Touchable
      style={stl(styles.image, !index && styles.side)}
      animate
      withoutFeedback
      onPress={() => {
        showImageViewer(
          thumbs.filter((_item, index) => index < 12),
          index
        )

        t('条目.预览', {
          subjectId: $.subjectId
        })
      }}
    >
      <Image
        key={item}
        src={item}
        autoHeight={IMAGE_HEIGHT}
        headers={epsThumbsHeader}
        radius={_.radiusSm}
        errorToHide={!WEB}
      />
    </Touchable>
  )
}

export default obc(Preview, COMPONENT)
