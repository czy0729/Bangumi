/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-12 00:45:44
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconStaff from './icon/staff'

const initialRenderNums = _.isPad
  ? 8
  : Math.floor(_.window.contentWidth / 56) + 1

function Staff({ style }, { $, navigation }) {
  rerender('Subject.Staff')

  if (!$.staff.length) return null

  const { showStaff } = systemStore.setting
  return (
    <View style={[style, !showStaff && _.short]}>
      <SectionTitle
        style={_.container.wind}
        right={<IconStaff />}
        icon={!showStaff && 'md-navigate-next'}
        onPress={() => $.switchBlock('showStaff')}
      >
        制作人员
      </SectionTitle>
      {showStaff && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={$.staff}
            quality={false}
            initialRenderNums={initialRenderNums}
            onPress={({ id, name, nameJP, _image }) => {
              t('条目.跳转', {
                to: 'Mono',
                from: '制作人员',
                subjectId: $.subjectId
              })
              navigation.push('Mono', {
                monoId: `person/${id}`,
                _name: name,
                _jp: nameJP,
                _image
              })
            }}
          />
          <Heatmap
            id='条目.跳转'
            data={{
              from: '制作人员'
            }}
          />
        </>
      )}
    </View>
  )
}

export default obc(Staff)
