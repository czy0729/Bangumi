/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 07:33:51
 */
import { useCallback, useMemo } from 'react'
import { Heatmap, HorizontalList } from '@components'
import { InView } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_STAFF } from '../../ds'
import BlockTitle from '../block-title'
import IconStaff from '../icon/staff'
import { removeDuplicateItemsById } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

import type { Staff as StaffType } from '../../types'

const Staff = memo(
  ({ navigation, showStaff = true, subjectId = 0, staff }) => {
    const elRight = useMemo(() => (showStaff ? <IconStaff /> : null), [showStaff])

    const handleNavigate = useCallback(
      ({ id, name, nameJP, _image }: StaffType) => {
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
      },
      [navigation, subjectId]
    )

    return (
      <InView style={stl(styles.container, !showStaff && styles.containerNotShow)}>
        <BlockTitle
          layoutKey='showStaff'
          style={_.container.wind}
          right={elRight}
          icon={!showStaff && 'md-navigate-next'}
          splitStyles
        >
          {TITLE_STAFF}
        </BlockTitle>

        {showStaff && (
          <>
            <HorizontalList
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              data={removeDuplicateItemsById(staff)}
              typeCn='角色'
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / 56) + 1, 8)}
              onPress={handleNavigate}
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
