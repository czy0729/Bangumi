/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 02:20:46
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconStaff from '../icon/staff'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'

export default memo(({ navigation, showStaff, subjectId, staff, onSwitchBlock }) => {
  // global.rerender('Subject.Staff.Main')

  return (
    <View style={!showStaff ? [_.mt.lg, _.short] : _.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        right={
          showStaff ? <IconStaff /> : <IconHidden name='制作人员' value='showStaff' />
        }
        icon={!showStaff && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showStaff')}
      >
        制作人员
      </SectionTitle>
      {showStaff && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={staff}
            quality={false}
            initialRenderNums={_.device(Math.floor(_.window.contentWidth / 56) + 1, 8)}
            onPress={({ id, name, nameJP, _image }) => {
              t('条目.跳转', {
                to: 'Mono',
                from: '制作人员',
                subjectId
              })

              navigation.push('Mono', {
                monoId: `person/${id}`,
                _name: name,
                _jp: nameJP,
                _image
              })
            }}
          />
          <Heatmap id='条目.跳转' from='制作人员' />
        </>
      )}
    </View>
  )
}, DEFAULT_PROPS)
