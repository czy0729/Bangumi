/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 18:50:03
 */
import React from 'react'
import { HOST } from '@constants'
import { t } from '@utils/fetch'
import { getUIStoreAsync, getRakuenStoreAsync } from '@utils/async'
import { Text } from '../../text'

function ACText({ navigation, style, subjectId, text, onPress }) {
  return (
    <Text
      style={style}
      selectable
      underline
      onPress={() => {
        const rakuenStore = getRakuenStoreAsync()
        if (rakuenStore.setting.acSearchPopable) {
          t('AC搜索.缩略框', {
            subjectId
          })

          const uiStore = getUIStoreAsync()
          uiStore.showPopableSubject({
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
      }}
    >
      {text}
    </Text>
  )
}

export default ACText
