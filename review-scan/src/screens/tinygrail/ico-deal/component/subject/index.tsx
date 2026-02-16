/*
 * @Author: czy0729
 * @Date: 2025-06-07 16:50:02
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-06-07 16:50:02
 */
import React from 'react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

const Subject = () => {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const subject = $.mono?.jobs?.[0]
    if (!subject) return null

    return (
      <Touchable
        style={_.mv.sm}
        onPress={() => {
          appNavigate(subject.href, navigation)
        }}
      >
        <Text type='tinygrailText' align='center' underline>
          {subject.nameCn || subject.name}
        </Text>
      </Touchable>
    )
  })
}

export default Subject
