/*
 * @Author: czy0729
 * @Date: 2026-09-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:17:06
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { flexStyle, HorizontalList, Image, Squircle, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, userStore } from '@stores'
import { isArray, showImageViewer, stl } from '@utils'
import { r } from '@utils/dev'
import { THUMB_HEIGHT, THUMB_WIDTH } from '../ds'
import { getThumbs } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 截图区: 在线截图 (VNDB, 数据侧已过滤 NSFW) 优先, 旧条目回落自建 CDN */
function Thumbs({ id, length, screens, y }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  /** 统一成 { url 原图, thumbnail 缩略图 } */
  const thumbs = useMemo(() => {
    if (isArray(screens) && screens.length) {
      return screens.map(screen => ({
        url: screen.url,
        thumbnail: screen.thumbnail || screen.url
      }))
    }
    return (id ? getThumbs(id, length) : []).map(url => ({ url, thumbnail: url }))
  }, [screens, id, length])

  const thumbsData = useMemo(
    () => thumbs.slice(0, 3).map((item, thumbId) => ({ id: thumbId, image: item.thumbnail })),
    [thumbs]
  )
  const thumbUrls = useMemo(() => thumbs.map(item => item.url), [thumbs])

  /** 未登录不展示截图 */
  if (!userStore.isLogin) return null

  if (!thumbs.length) return null

  const showNums = thumbUrls.length > 3

  return (
    <InView style={styles.thumbs} y={y}>
      <HorizontalList
        data={thumbsData}
        renderItem={(item, idx) => (
          <Squircle
            key={item.id}
            style={stl(
              !!idx && _.ml.sm,

              /** 末尾留白: 有 +N 时由 +N 的 marginRight 承担, 这里只留缩略图间距 */
              idx === thumbsData.length - 1 && (showNums ? _.mr.sm : _.mr.md)
            )}
            width={THUMB_WIDTH}
            height={THUMB_HEIGHT}
            radius={_.radiusSm}
          >
            <Image
              src={item.image}
              size={THUMB_WIDTH}
              height={THUMB_HEIGHT}
              radius={0}
              errorToHide
              onPress={() => {
                showImageViewer(
                  thumbUrls.map(url => ({ url })),
                  idx
                )
              }}
            />
          </Squircle>
        )}
        renderNums={
          showNums &&
          (() => (
            <Touchable
              style={stl(flexStyle({ justify: 'center' }), styles.nums)}
              onPress={() => {
                showImageViewer(
                  thumbUrls.map(url => ({ url })),
                  3
                )
              }}
            >
              <Text size={15} bold>
                + {thumbUrls.length}
              </Text>
            </Touchable>
          ))
        }
      />
    </InView>
  )
}

export default observer(Thumbs)
