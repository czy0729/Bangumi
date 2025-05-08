/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:11:30
 */
import React from 'react'
import { Heatmap } from '@components'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, FROZEN_FN } from '@constants'
import { TITLE_STAFF } from '../../ds'
import IconHidden from '../icon/hidden'
import IconStaff from '../icon/staff'
import { removeDuplicateItemsById } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Staff = memo(
  ({
    navigation,
    showStaff = true,
    subjectId = 0,
    staff = FROZEN_ARRAY,
    onSwitchBlock = FROZEN_FN
  }) => {
    return (
      <InView style={stl(styles.container, !showStaff && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={showStaff ? <IconStaff /> : <IconHidden name={TITLE_STAFF} value='showStaff' />}
          icon={!showStaff && 'md-navigate-next'}
          splitStyles
          onPress={() => onSwitchBlock('showStaff')}
        >
          {TITLE_STAFF}
        </SectionTitle>
        {showStaff && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={removeDuplicateItemsById(staff)}
              typeCn='角色'
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / 56) + 1, 8)}
              onPress={({ id, name, nameJP, _image }) => {
                navigation.push('Mono', {
                  monoId: `person/${id}`,
                  _name: name,
                  _jp: nameJP,
                  _image
                })

                t('条目.跳转', {
                  to: 'Mono',
                  from: TITLE_STAFF,
                  subjectId
                })
              }}
            />
            <Heatmap id='条目.跳转' from={TITLE_STAFF} />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Staff
