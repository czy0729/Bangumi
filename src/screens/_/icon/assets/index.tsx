/*
 * @Author: czy0729
 * @Date: 2024-09-28 21:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:41:29
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { GROUP_THUMB_MAP } from '@assets/images'
import { styles } from './styles'

import type { Props as IconAssetsProps } from './types'

export type { IconAssetsProps }

export function IconAssets({ style, icon = 'wordcloud', onPress }: IconAssetsProps) {
  return useObserver(() => (
    <Touchable style={stl(styles.touch, style)} onPress={onPress}>
      <Image
        src={GROUP_THUMB_MAP[_.select(`${icon}_0`, icon)]}
        size={19}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  ))
}

export default IconAssets
