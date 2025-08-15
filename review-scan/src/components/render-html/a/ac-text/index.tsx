/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 11:00:09
 */
import React, { useCallback } from 'react'
import { GestureResponderEvent } from 'react-native'
import { _ } from '@stores'
import { feedback, stl } from '@utils'
import { syncRakuenStore, syncUIStore } from '@utils/async'
import { t } from '@utils/fetch'
import { HOST, WEB } from '@constants'
import { Text } from '../../../text'
import { Props } from './types'

function ACText({ navigation, style, subjectId, text, onPress }: Props) {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const rakuenStore = syncRakuenStore()
      if (rakuenStore.setting.acSearchPopable) {
        const uiStore = syncUIStore()
        const { pageX, pageY } = event.nativeEvent
        uiStore.setXY(pageX, pageY - 8)
        uiStore.showPopableSubject({
          subjectId
        })
        feedback(true)

        t('AC搜索.缩略框', {
          subjectId
        })
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
    <Text style={stl(WEB && _.mr.xxs, style)} underline onPress={handlePress}>
      {text}
    </Text>
  )
}

export default ACText
