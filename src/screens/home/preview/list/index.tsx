/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 14:06:15
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Image, Touchable } from '@components'
import { _ } from '@stores'
import { showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { epsThumbs, epsThumbsHeader } = $.state
  const { data = [], headers = {} } = $.params

  let _data = epsThumbs.length ? epsThumbs : data
  const _headers = epsThumbs.length ? epsThumbsHeader : headers

  const passProps: any = {}
  if (_headers?.Referer && _headers.Referer.includes('douban')) {
    if (data.length && data[0].includes('douban')) _data = [...data]
    epsThumbs.forEach(item => {
      if (!_data.includes(item)) _data.push(item)
    })

    passProps.autoSize = styles.item.width
    passProps.fallback = true
  } else {
    passProps.width = styles.item.width
    passProps.height = styles.item.width * 0.56
    passProps.fallback = true
  }

  return (
    <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
      {_data.map((item, index) => (
        <View key={item} style={styles.item}>
          <Touchable
            withoutFeedback
            onPress={() => {
              showImageViewer(
                _data.map(item => ({
                  url: item.split('@')[0],
                  headers
                })),
                index
              )
            }}
          >
            <Image src={item} {...passProps} shadow headers={headers} />
          </Touchable>
        </View>
      ))}
    </ScrollView>
  )
}

export default obc(List)
