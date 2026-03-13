/*
 * @Author: czy0729
 * @Date: 2025-02-04 06:36:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 06:39:01
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconMesumeProps } from './types'

export { IconMesumeProps }

export const IconMesume = ob(
  ({ onPress }: IconMesumeProps) => (
    <Touchable style={styles.touch} onPress={onPress}>
      <Image
        src={GROUP_THUMB_MAP[_.select('mesume_0', 'mesume')]}
        size={19}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  ),
  COMPONENT
)

export default IconMesume
