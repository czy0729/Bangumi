/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:28:34
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { COVER_WIDTH, COVER_HEIGHT, DEFAULT_PROPS } from './ds'

export default memo(({ navigation, subjectId, comic }) => {
  global.rerender('Subject.Comic.Main')

  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>单行本</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={comic}
        width={COVER_WIDTH}
        height={COVER_HEIGHT}
        ellipsizeMode='middle'
        initialRenderNums={_.device(
          Math.floor(_.window.contentWidth / COVER_WIDTH) + 1,
          6
        )}
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
      <Heatmap id='条目.跳转' from='单行本' />
    </View>
  )
}, DEFAULT_PROPS)
