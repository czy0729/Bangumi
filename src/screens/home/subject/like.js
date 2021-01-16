/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:19:03
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function Like({ style }, { $, navigation }) {
  if (!$.like.length) {
    return null
  }

  const { showLike } = systemStore.setting
  return (
    <View style={[style, !showLike && _.short]}>
      <SectionTitle
        style={_.container.wind}
        icon={!showLike && 'right'}
        onPress={() => $.switchBlock('showLike')}
      >
        猜你喜欢
      </SectionTitle>
      {showLike && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={$.like}
            width={80}
            height={106}
            onPress={({ id, name, image }) => {
              t('条目.跳转', {
                to: 'Subject',
                from: '猜你喜欢',
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
              from: '猜你喜欢'
            }}
          />
        </>
      )}
    </View>
  )
}

export default obc(Like)
