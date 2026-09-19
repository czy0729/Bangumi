/*
 * @Author: czy0729
 * @Date: 2023-03-31 12:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 10:29:17
 */
import { observer } from 'mobx-react'
import { Component, PopoverContent, Portal } from '@components'
import { _, rakuenStore } from '@stores'
import { r } from '@utils/dev'
import { LIKE_TYPE_TIMELINE } from '@constants'
import { BlurView } from '../blur-view'
import Grid from './grid'
import { getPosition } from './utils'
import { COMPONENT, DATA, DATA_TIMELINE } from './ds'
import { memoStyles } from './styles'

/** 贴贴浮出选择框 */
export const LikesGrid = observer(
  ({ visible, portalKey, x, y, value, topicId, floorId, formhash, likeType, offsets }) => {
    r(COMPONENT)

    if (!rakuenStore.setting.likes) return null

    const styles = memoStyles()

    const isMiniGrids = likeType == LIKE_TYPE_TIMELINE
    const data = isMiniGrids ? DATA_TIMELINE : DATA
    const rows = Math.ceil(data.length / 4)
    const position = getPosition(x, y, rows, offsets?.recommandPosition)

    // 应用偏移值
    if (offsets?.x && position.style.left) position.style.left += offsets.x
    if (offsets?.y && position.style.top) position.style.top += offsets.y

    return (
      <Component id='base-likes-grid'>
        <Portal key={String(portalKey)}>
          <PopoverContent
            style={[styles.subject, position.style]}
            position={position.position}
            visible={visible}
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
          </PopoverContent>
        </Portal>
      </Component>
    )
  }
)

export default LikesGrid
