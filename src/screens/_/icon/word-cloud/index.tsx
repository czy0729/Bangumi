/*
 * @Author: czy0729
 * @Date: 2024-09-28 21:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 21:20:27
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconWordCloudProps } from './types'

export { IconWordCloudProps }

export const IconWordCloud = ob(
  ({ onPress }: IconWordCloudProps) => (
    <Touchable style={styles.touch} onPress={onPress}>
      <Image
        src={GROUP_THUMB_MAP[_.select('wordcloud_0', 'wordcloud')]}
        size={18}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  ),
  COMPONENT
)

export default IconWordCloud
