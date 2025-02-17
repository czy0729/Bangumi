/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 11:00:09
 */
import React, { useCallback, useRef } from 'react'
import { GestureResponderEvent, Text as RNText } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { syncRakuenStore, syncUIStore } from '@utils/async'
import { t } from '@utils/fetch'
import { HOST, WEB } from '@constants'
import { Text } from '../../../text'
import { Props } from './types'

function ACText({ navigation, style, subjectId, text, onPress }: Props) {
  const textRef = useRef<RNText>(null)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const rakuenStore = syncRakuenStore()
      if (rakuenStore.setting.acSearchPopable) {
        t('AC搜索.缩略框', {
          subjectId
        })

        if (textRef.current) {
          textRef.current.measure(() => {
            const { pageX, pageY } = event.nativeEvent

            const uiStore = syncUIStore()
            uiStore.setXY(pageX, pageY)
            uiStore.showPopableSubject({
              subjectId
            })
          })
        }

        return
      }

      t('AC搜索.跳转', {
        subjectId
      })

      if (navigation) {
        navigation.push('Subject', {
          subjectId,
          _cn: text
        })
        return
      }

      if (typeof onPress === 'function') {
        onPress(null, `${HOST}/subject/${subjectId}`, {
          _cn: text
        })
      }
    },
    [navigation, onPress, subjectId, text]
  )

  return (
    <Text forwardRef={textRef} style={stl(WEB && _.mr.xxs, style)} underline onPress={handlePress}>
      {text}
    </Text>
  )
}

export default ACText
