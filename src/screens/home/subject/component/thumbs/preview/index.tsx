/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:37:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { showImageViewer, stl } from '@utils'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { IMAGE_HEIGHT } from '../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Preview({ item, index, thumbs, epsThumbsHeader }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(Preview)
