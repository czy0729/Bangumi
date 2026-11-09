/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 07:33:34
 */
import { useCallback, useMemo } from 'react'
import { Heatmap, HorizontalList } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_LIKE } from '../../ds'
import BlockTitle from '../block-title'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

import type { SubjectFromHtmlLikeItem } from '@stores/subject/types'
import type { SubjectTypeCn } from '@types'

const Like = memo(
  ({ navigation, showLike = true, subjectId = 0, like, typeCn = '' as SubjectTypeCn }) => {
    const elRight = useMemo(
      () => (showLike ? <IconRelation title='猜你喜欢' list={like} /> : null),
      [like, showLike]
    )

    const handleNavigate = useCallback(
      ({ id, name, image }: SubjectFromHtmlLikeItem, type: string) => {
        navigation.push('Subject', {
          subjectId: id,
          _jp: name,
          _image: getCoverSrc(image, COVER_WIDTH),
          _type: type as SubjectTypeCn
        })

        t('条目.跳转', {
          to: 'Subject',
          from: TITLE_LIKE,
          subjectId
        })
      },
      [navigation, subjectId]
    )

    return (
      <InView style={stl(styles.container, !showLike && styles.containerNotShow)}>
        <BlockTitle
          layoutKey='showLike'
          style={_.container.wind}
          right={elRight}
          icon={!showLike && 'md-navigate-next'}
          splitStyles
        >
          {TITLE_LIKE}
        </BlockTitle>

        {showLike && (
          <>
            <HorizontalList
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              data={like}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              typeCn={typeCn}
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / COVER_WIDTH) + 1, 6)}
              onPress={handleNavigate}
            />
            <Heatmap id='条目.跳转' from={TITLE_LIKE} />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Like
