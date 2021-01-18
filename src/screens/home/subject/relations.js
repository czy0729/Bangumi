/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-18 02:00:08
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

const initialRenderNums = _.isPad
  ? 0
  : Math.floor(_.window.contentWidth / 80) + 1

function Relations({ style }, { $, navigation }) {
  if (!$.relations.length) {
    return null
  }

  const { showRelations } = systemStore.setting
  return (
    <View style={[style, !showRelations && _.short]}>
      <SectionTitle
        style={_.container.wind}
        icon={!showRelations && 'right'}
        onPress={() => $.switchBlock('showRelations')}
      >
        关联
      </SectionTitle>
      {showRelations && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={$.relations}
            width={80}
            height={106}
            findCn
            initialRenderNums={initialRenderNums}
            onPress={({ id, name, image }) => {
              t('条目.跳转', {
                to: 'Subject',
                from: '关联条目',
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
              from: '关联条目'
            }}
          />
        </>
      )}
    </View>
  )
}

export default obc(Relations)
