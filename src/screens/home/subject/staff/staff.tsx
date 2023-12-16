/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 07:48:08
 */
import React from 'react'
import { Heatmap } from '@components'
import { InView, SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import IconStaff from '../icon/staff'
import IconHidden from '../icon/hidden'
import { TITLE_STAFF } from '../ds'
import { DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(({ navigation, showStaff, subjectId, staff, onSwitchBlock }) => {
  rerender('Subject.Staff.Main')

  return (
    <InView style={stl(styles.container, !showStaff && _.short)}>
      <SectionTitle
        style={_.container.wind}
        right={
          showStaff ? (
            <IconStaff />
          ) : (
            <IconHidden name={TITLE_STAFF} value='showStaff' />
          )
        }
        icon={!showStaff && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showStaff')}
      >
        {TITLE_STAFF}
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
                from: TITLE_STAFF,
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
          <Heatmap id='条目.跳转' from={TITLE_STAFF} />
        </>
      )}
    </InView>
  )
}, DEFAULT_PROPS)
