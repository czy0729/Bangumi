/*
 * @Author: czy0729
 * @Date: 2025-11-20 14:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:36:06
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { speak } from '@utils/ui'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconSoundProps } from './types'
export type { IconSoundProps }

export const IconSound = observer(({ style, text }: IconSoundProps) => {
  r(COMPONENT)

  const handlePress = useCallback(() => {
    speak(text)
  }, [text])

  if (!text) return null

  return (
    <Touchable style={stl(styles.touch, style)} onPress={handlePress}>
      <Image
        src={GROUP_THUMB_MAP[_.select('sound_0', 'sound')]}
        size={16}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  )
})

export default IconSound
