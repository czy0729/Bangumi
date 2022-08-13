/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-13 11:19:06
 */
import React, { useRef } from 'react'
import { HOST } from '@constants'
import { getUIStoreAsync } from '@utils/async'
import { Text } from '../../text'

function ACText({ navigation, style, subjectId, text, onPress }) {
  const textRef = useRef(null)
  return (
    <Text
      forwardRef={ref => (textRef.current = ref)}
      style={style}
      selectable
      underline
      onPress={() => {
        if (textRef.current) {
          textRef.current.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              const uiStore = getUIStoreAsync()
              uiStore.showPopableSubject({
                subjectId,
                x,
                y,
                width,
                height
              })
            }
          )
          return
        }

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
      }}
    >
      {text}
    </Text>
  )
}

export default ACText
