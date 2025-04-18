/*
 * @Author: czy0729
 * @Date: 2023-03-31 12:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:55:49
 */
import React from 'react'
import { Popover as Popable } from 'react-native-popable'
import { Component, Portal } from '@components'
import { _, rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { LIKE_TYPE_TIMELINE } from '@constants'
import { BlurView } from '../blur-view'
import Grid from './grid'
import { getPosition } from './utils'
import { COMPONENT, DATA, DATA_TIMELINE } from './ds'
import { memoStyles } from './styles'

/** 贴贴浮出选择框 */
export const LikesGrid = ob(
  ({ visible, portalKey, x, y, value, topicId, floorId, formhash, likeType, offsets }) => {
    if (!rakuenStore.setting.likes) return null

    const styles = memoStyles()
    const isTimeline = likeType == LIKE_TYPE_TIMELINE
    const data = isTimeline ? DATA_TIMELINE : DATA
    const rows = Math.ceil(data.length / 4)
    const position = getPosition(x, y, rows, offsets?.recommandPosition)

    // 应用偏移值
    if (offsets?.x && position.style.left) position.style.left += offsets.x
    if (offsets?.y && position.style.top) position.style.left += offsets.y

    return (
      <Component id='base-likes-grid'>
        <Portal key={String(portalKey)}>
          <Popable
            style={[styles.subject, position.style]}
            position={position.position}
            visible={visible}
            caret={false}
            backgroundColor='transparent'
          >
            {!!topicId && (
              <BlurView
                style={[
                  styles.container,
                  {
                    height: position.height
                  }
                ]}
                intensity={_.select(64, 80)}
              >
                <Grid
                  data={data}
                  value={value}
                  topicId={topicId}
                  floorId={floorId}
                  formhash={formhash}
                  likeType={likeType}
                />
              </BlurView>
            )}
          </Popable>
        </Portal>
      </Component>
    )
  },
  COMPONENT
)

export default LikesGrid
