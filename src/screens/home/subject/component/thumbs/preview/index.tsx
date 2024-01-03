/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:27:45
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { systemStore } from '@stores'
import { showImageViewer, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { AnyObject } from '@types'
import { Ctx } from '../../../types'
import { IMAGE_HEIGHT } from '../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Preview(
  {
    item,
    index,
    thumbs,
    epsThumbsHeader
  }: AnyObject<{
    thumbs: {
      url: string
      headers: {
        Referer?: string
      }
    }[]
  }>,
  { $ }: Ctx
) {
  const { showCharacter } = systemStore.setting
  if (!showCharacter) return null

  return (
    <Touchable
      style={stl(styles.image, !index && styles.side)}
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
        src={item.replace('img1.doubanio.com', 'img2.doubanio.com')}
        autoHeight={IMAGE_HEIGHT}
        headers={epsThumbsHeader}
        errorToHide
      />
    </Touchable>
  )
}

export default obc(Preview, COMPONENT)
