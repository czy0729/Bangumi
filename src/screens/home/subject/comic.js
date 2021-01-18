/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-18 22:02:36
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

const initialRenderNums = _.isPad
  ? 0
  : Math.floor(_.window.contentWidth / 80) + 1

function Comic({ style }, { $, navigation }) {
  if (!$.comic.length) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>单行本</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={$.comic}
        width={80}
        height={106}
        ellipsizeMode='middle'
        initialRenderNums={initialRenderNums}
        onPress={({ id, name, image }) => {
          t('条目.跳转', {
            to: 'Subject',
            from: '单行本',
            subjectId: $.subjectId
          })
          navigation.push('Subject', {
            subjectId: id,
            _jp: name,
            _image: image
          })
        }}
      />
      <Heatmap
        id='条目.跳转'
        data={{
          from: '单行本'
        }}
      />
    </View>
  )
}

export default obc(Comic)
