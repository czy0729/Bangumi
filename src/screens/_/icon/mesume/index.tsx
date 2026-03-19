/*
 * @Author: czy0729
 * @Date: 2025-02-04 06:36:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 01:12:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconMesumeProps } from './types'
export type { IconMesumeProps }

export const IconMesume = observer(({ onPress }: IconMesumeProps) => {
  r(COMPONENT)

  return (
    <Touchable style={styles.touch} onPress={onPress}>
      <Image
        src={GROUP_THUMB_MAP[_.select('mesume_0', 'mesume')]}
        size={19}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  )
})

export default IconMesume
