/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 05:16:21
 */
import React from 'react'
import { Image, ScrollView, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, useStore } from '@stores'
import { showImageViewer } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { epsThumbs = [], epsThumbsHeader = {} } = $.state

  let images: string[] = $.data.length ? $.data : epsThumbs
  const headers: {
    Referer?: string
  } = $.headers?.Referer ? $.headers : epsThumbsHeader

  const passProps: any = {}
  if (headers?.Referer && headers.Referer.includes('douban')) {
    if ($.data.length && $.data[0].includes('douban')) images = [...$.data]
    epsThumbs.forEach(item => {
      // 存在多域名分布式链接, 使用后缀判断是否重复
      const ext = item.split(/public/)?.[1]
      if (ext) {
        const flag = images.some(item => item.includes(ext))
        if (!flag) images.push(item)
      }
    })

    passProps.autoSize = styles.item.width
    passProps.fallback = true
  } else {
    passProps.width = styles.item.width
    passProps.height = styles.item.width * 0.56
    passProps.fallback = true
  }

  return (
    <ScrollView style={_.mt.sm} contentContainerStyle={_.container.page} onScroll={$.onScroll}>
      {images.map((item, index) => (
        <InView key={item} style={styles.item} y={200 * (index + 1)}>
          <Touchable
            withoutFeedback
            onPress={() => {
              showImageViewer(
                images.map(item => ({
                  url: item.split('@')?.[0],
                  headers
                })),
                index
              )
            }}
          >
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
}

export default ob(List, COMPONENT)
