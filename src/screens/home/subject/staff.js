/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 15:56:07
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconStaff from './icon/staff'
import IconHidden from './icon/hidden'

const initialRenderNums = _.device(Math.floor(_.window.contentWidth / 56) + 1, 8)
const defaultProps = {
  navigation: {},
  showStaff: true,
  subjectId: 0,
  staff: [],
  onSwitchBlock: Function.prototype
}

const Staff = memo(({ navigation, showStaff, subjectId, staff, onSwitchBlock }) => {
  rerender('Subject.Staff.Main')
  return (
    <View style={[_.mt.lg, !showStaff && _.short]}>
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
            initialRenderNums={initialRenderNums}
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
}, defaultProps)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Staff')

  const { showStaff } = systemStore.setting
  if (showStaff === -1 || !$.staff.length) return null

  return (
    <Staff
      navigation={navigation}
      showStaff={systemStore.setting.showStaff}
      subjectId={$.subjectId}
      staff={$.staff}
      onSwitchBlock={$.switchBlock}
    />
  )
})
