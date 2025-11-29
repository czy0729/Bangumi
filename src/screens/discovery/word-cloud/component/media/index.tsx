/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:54:06
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import Mono from './mono'
import Subject from './subject'
import Topic from './topic'
import User from './user'
import { COMPONENT } from './ds'

import type { ReactNode } from '@types'
import type { Ctx } from '../../types'
function Media() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    let el: ReactNode
    if ($.subjectId) {
      el = <Subject />
    } else if ($.topicId) {
      el = <Topic />
    } else if ($.monoId) {
      el = <Mono />
    } else if ($.userId) {
      el = <User />
    }
    if (!el) return null

    if (WEB) {
      el = (
        <Touchable
          onPress={() => {
            if ($.subjectId) {
              navigation.push('Subject', {
                subjectId: $.subjectId
              })
              return
            }

            if ($.topicId) {
              navigation.push('Topic', {
                topicId: $.topicId
              })
              return
            }

            if ($.monoId) {
              navigation.push('Mono', {
                monoId: $.monoId
              })
              return
            }

            if ($.userId) {
              navigation.push('Zone', {
                userId: $.userId
              })
              return
            }
          }}
        >
          {el}
        </Touchable>
      )
    }

    return <View style={_.container.wind}>{el}</View>
  })
}

export default Media
