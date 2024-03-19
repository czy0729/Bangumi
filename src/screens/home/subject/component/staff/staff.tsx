/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:35:29
 */
import React from 'react'
import { Heatmap } from '@components'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_STAFF } from '../../ds'
import IconHidden from '../../icon/hidden'
import IconStaff from '../../icon/staff'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Staff = memo(
  ({ navigation, showStaff, subjectId, staff, onSwitchBlock }) => {
    return (
      <InView style={stl(styles.container, !showStaff && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={showStaff ? <IconStaff /> : <IconHidden name={TITLE_STAFF} value='showStaff' />}
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
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Staff
