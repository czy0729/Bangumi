/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-21 15:30:07
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Image } from '@components'
import { _ } from '@stores'
import { showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { data = [], headers = {} } = $.params
  const passProps: any = {}
  if (headers?.Referer && headers.Referer.includes('douban.com')) {
    passProps.autoSize = styles.item.width
    passProps.fallback = true
  } else {
    passProps.width = styles.item.width
    passProps.height = styles.item.width * 0.56
  }
  return (
    <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
      {data.map((item, index) => (
        <View key={item} style={styles.item}>
          <Image
            src={item}
            {...passProps}
            shadow
            headers={headers}
            onPress={() =>
              showImageViewer(
                data.map(item => ({
                  url: item.split('@')[0],
                  headers
                })),
                index
              )
            }
          />
        </View>
      ))}
    </ScrollView>
  )
}

export default obc(List)
