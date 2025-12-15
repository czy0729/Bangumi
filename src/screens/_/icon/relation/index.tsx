/*
 * @Author: czy0729
 * @Date: 2025-12-15 13:25:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 15:15:45
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconRelationProps } from './types'

export { IconRelationProps }

export const IconRelation = ob(
  ({ style, onPress }: IconRelationProps) => (
    <Touchable style={stl(styles.touch, style)} onPress={onPress}>
      <Image
        src={GROUP_THUMB_MAP[_.select('relation_0', 'relation')]}
        size={18}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  ),
  COMPONENT
)

export default IconRelation
