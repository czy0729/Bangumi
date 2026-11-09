/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 07:33:43
 */
import { useCallback, useMemo } from 'react'
import { Heatmap, HorizontalList } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_RELATIONS } from '../../ds'
import BlockTitle from '../block-title'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'

const Relations = memo(
  ({
    navigation,
    showRelations = true,
    subjectId = 0,
    relations,
    typeCn = '' as SubjectTypeCn
  }) => {
    const elRight = useMemo(
      () => (showRelations ? <IconRelation title='关联' list={relations} /> : null),
      [relations, showRelations]
    )

    const handleNavigate = useCallback(
      ({ id, name, image }: Ctx['$']['relations'][number], type: string) => {
        navigation.push('Subject', {
          subjectId: id,
          _jp: name,
          _image: getCoverSrc(image, COVER_WIDTH),
          _type: type as SubjectTypeCn
        })

        t('条目.跳转', {
          to: 'Subject',
          from: '关联条目',
          subjectId
        })
      },
      [navigation, subjectId]
    )

    return (
      <InView style={stl(styles.container, !showRelations && styles.containerNotShow)}>
        <BlockTitle
          layoutKey='showRelations'
          style={_.container.wind}
          right={elRight}
          icon={!showRelations && 'md-navigate-next'}
          splitStyles
        >
          {TITLE_RELATIONS}
        </BlockTitle>

        {showRelations && (
          <>
            <HorizontalList
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              data={relations}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              findCn
              relationTypeCn={typeCn}
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / COVER_WIDTH) + 1, 6)}
              ellipsizeMode='middle'
              onPress={handleNavigate}
            />
            <Heatmap id='条目.跳转' from='关联条目' />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Relations
