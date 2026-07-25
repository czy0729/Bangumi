/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 20:22:01
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { subjectStore, systemStore } from '@stores'
import Button from '../button'
import SpButtons from '../sp-buttons'
import TimelineAvatars from '../timeline-avatars'

import type { Ep } from '@stores/subject/types'
import type { Props } from './types'

function NormalButtons({ props, eps }: Props) {
  const itemsNormal: Ep[] = []
  const itemsSp: Ep[] = []
  eps.forEach(item => {
    if (item.type === 0) {
      itemsNormal.push(item)
    } else if (item.type === 1) {
      itemsSp.push(item)
    }
  })

  const showTimelineAvatars = !!systemStore.setting.collectionTimelines?.length

  return (
    <Flex wrap='wrap' align='start'>
      {itemsNormal.map((item, index) => {
        const num = index + 1
        const isSide = num % props.numbersOfLine === 0

        return (
          <View key={item.id}>
            {showTimelineAvatars && (
              <TimelineAvatars
                subjectId={props.subjectId}
                index={index}
                sort={item.sort}
                isSide={isSide}
              />
            )}
            <Button
              props={props}
              item={item}
              epStatus={subjectStore.epStatus(item.id)}
              num={num}
            />
          </View>
        )
      })}

      <SpButtons
        props={props}
        eps={itemsSp}
        preNum={itemsNormal.length}
      />
    </Flex>
  )
}

export default observer(NormalButtons)
