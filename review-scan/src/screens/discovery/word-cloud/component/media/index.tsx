/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:19:13
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { ReactNode } from '@types'
import { Ctx } from '../../types'
import Mono from './mono'
import Subject from './subject'
import Topic from './topic'
import User from './user'
import { COMPONENT } from './ds'

function Media() {
  const { $, navigation } = useStore<Ctx>()
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

          console.log($.userId)
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
}

export default ob(Media, COMPONENT)
