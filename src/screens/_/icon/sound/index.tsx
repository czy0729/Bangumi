/*
 * @Author: czy0729
 * @Date: 2025-11-20 14:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:37:23
 */
import React, { useCallback } from 'react'
import * as Speech from 'expo-speech'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { logger, r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconSoundProps } from './types'

export type { IconSoundProps }

export const IconSound = ({ style, text }: IconSoundProps) => {
  r(COMPONENT)

  const handlePress = useCallback(() => {
    try {
      Speech.speak(text, {
        voice: 'com.apple.voice.compact.ja-JP.Kyoko',
        language: 'ja-JP'
      })

      logger.log('IconSound', 'Speech.speak', {
        text
      })
    } catch (error) {}
  }, [text])

  return useObserver(() => {
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
}

export default IconSound
