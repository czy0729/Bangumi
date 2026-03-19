/*
 * @Author: czy0729
 * @Date: 2024-09-28 21:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:35:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconAssetsProps } from './types'
export type { IconAssetsProps }

export const IconAssets = observer(
  ({ style, icon = 'wordcloud', size = 19, onPress }: IconAssetsProps) => {
    r(COMPONENT)

    return (
      <Touchable style={stl(styles.touch, style)} onPress={onPress}>
        <Image
          src={GROUP_THUMB_MAP[_.select(`${icon}_0`, icon)]}
          size={size}
          resizeMode='contain'
          placeholder={false}
          skeleton={false}
        />
      </Touchable>
    )
  }
)

export default IconAssets
