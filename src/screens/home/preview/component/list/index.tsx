/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:29:09
 */
import React from 'react'
import { Image, ScrollView, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, useStore } from '@stores'
import { showImageViewer } from '@utils'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ImageProps } from '@components'
import type { Ctx } from '../../types'

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { epsThumbs = [], epsThumbsHeader = {} } = $.state

    const hasData = $.data.length > 0
    const headers = $.headers?.Referer ? $.headers : epsThumbsHeader
    let images: string[] = hasData ? [...$.data] : [...epsThumbs]

    const isDouban = headers?.Referer?.includes('douban')
    if (isDouban) {
      if (hasData && $.data[0]?.includes('douban')) {
        images = [...$.data]
      }

      // 去重逻辑：用 /public 后缀片段去判重
      epsThumbs.forEach(item => {
        const ext = item.split(/public/)?.[1]
        if (ext && !images.some(target => target.includes(ext))) {
          images.push(item)
        }
      })
    }

    const passProps: ImageProps = {
      fallback: true
    }

    if (isDouban) {
      passProps.autoSize = styles.item.width
    } else {
      passProps.width = styles.item.width
      passProps.height = styles.item.minHeight
    }

    const viewerData = images.map(url => ({
      url: url.split('@')?.[0],
      headers
    }))

    return (
      <ScrollView style={_.mt.sm} contentContainerStyle={_.container.bottom} onScroll={$.onScroll}>
        {images.map((item, index) => (
          <InView key={item} style={styles.item} y={styles.item.minHeight * (index + 1)}>
            <Touchable withoutFeedback onPress={() => showImageViewer(viewerData, index)}>
              <Image {...passProps} src={item} headers={headers} errorToHide />
            </Touchable>
          </InView>
        ))}

        {!!(WEB && $.subjectId) && (
          <Touchable
            style={_.mt.lg}
            onPress={() => {
              navigation.push('Subject', {
                subjectId: $.subjectId
              })
            }}
          >
            <Text align='center' underline>
              返回条目
            </Text>
          </Touchable>
        )}
      </ScrollView>
    )
  })
}

export default List
