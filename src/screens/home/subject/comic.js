/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-13 09:07:16
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'

const coverWidth = 80
const coverHeight = coverWidth * 1.4
const initialRenderNums = _.device(
  Math.floor(_.window.contentWidth / coverWidth) + 1,
  6
)
const defaultProps = {
  navigation: {},
  subjectId: 0,
  comic: []
}

const Comic = memo(({ navigation, subjectId, comic }) => {
  rerender('Subject.Comic.Main')
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>单行本</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={comic}
        width={coverWidth}
        height={coverHeight}
        ellipsizeMode='middle'
        initialRenderNums={initialRenderNums}
        onPress={({ id, name, image }, type) => {
          t('条目.跳转', {
            to: 'Subject',
            from: '单行本',
            subjectId
          })
          navigation.push('Subject', {
            subjectId: id,
            _jp: name,
            _image: image,
            _type: type
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
}, defaultProps)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Comic')

  if (!$.comic.length) return null

  return (
    <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />
  )
})
