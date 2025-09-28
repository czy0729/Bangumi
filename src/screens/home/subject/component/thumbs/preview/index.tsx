/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-28 17:56:17
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { showImageViewer, stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import { IMAGE_HEIGHT } from '../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Preview({ item, index, thumbs, epsThumbsHeader }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Preview
