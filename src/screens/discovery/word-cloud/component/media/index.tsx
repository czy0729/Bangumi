/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:32:49
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { HeaderPlaceholder, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import Mono from './mono'
import Subject from './subject'
import Topic from './topic'
import User from './user'
import { COMPONENT, WEB_ROUTE_MAP } from './ds'

import type { Paths, ReactNode } from '@types'
import type { Ctx } from '../../types'

function Media() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
          const key = Object.keys(WEB_ROUTE_MAP).find(item => $[item]) as keyof typeof WEB_ROUTE_MAP
          if (!key) return

          const route = WEB_ROUTE_MAP[key]
          const params = { [key]: $[key] }
          ;(navigation.push as (path: Paths, params?: object) => void)(route, params)

          t('词云.跳转', {
            to: route,
            ...params
          })
        }}
      >
        {el}
      </Touchable>
    )
  }

  return (
    <>
      <HeaderPlaceholder />
      <View style={_.container.wind}>{el}</View>
    </>
  )
}

export default observer(Media)
