/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 05:12:46
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { showImageViewer, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import { IMAGE_HEIGHT } from '../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Preview({ item, index, thumbs, epsThumbsHeader }: Props) {
  const { $ } = useStore<Ctx>()
  if (!systemStore.setting.showCharacter) return null

  return (
    <Touchable
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
        style={stl(styles.image, !index && styles.side)}
        src={item}
        headers={epsThumbsHeader}
        autoHeight={IMAGE_HEIGHT}
        skeleton={false}
        errorToHide={!WEB}
      />
    </Touchable>
  )
}

export default ob(Preview, COMPONENT)
