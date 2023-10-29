/*
 * @Author: czy0729
 * @Date: 2023-03-31 12:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-29 23:33:36
 */
import React from 'react'
import { Popover } from 'react-native-popable'
import { Portal } from '@components'
import { _, rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { BlurView } from '../blur-view'
import Grid from './grid'
import { getPosition } from './utils'
import { DATA, DATA_TIMELINE } from './ds'
import { memoStyles } from './styles'

export const LikesGrid = ob(
  ({ visible, portalKey, x, y, value, topicId, floorId, formhash, likeType }) => {
    if (!rakuenStore.setting.likes) return null

    const styles = memoStyles()
    const isTimeline = likeType == 40
    const data = isTimeline ? DATA_TIMELINE : DATA
    const rows = Math.ceil(data.length / 4)
    const position = getPosition(x, y, rows)
    return (
      <Portal key={String(portalKey)}>
        <Popover
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
        </Popover>
      </Portal>
    )
  }
)
