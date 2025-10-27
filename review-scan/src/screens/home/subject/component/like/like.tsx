/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:51:41
 */
import React from 'react'
import { Heatmap } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, FROZEN_FN } from '@constants'
import { SubjectTypeCn } from '@types'
import { TITLE_LIKE } from '../../ds'
import IconHidden from '../icon/hidden'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Like = memo(
  ({
    navigation,
    showLike = true,
    subjectId = 0,
    like = FROZEN_ARRAY,
    typeCn = '' as SubjectTypeCn,
    onSwitchBlock = FROZEN_FN
  }) => {
    return (
      <InView style={stl(styles.container, !showLike && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={
            showLike ? (
              <IconRelation title='猜你喜欢' list={like} />
            ) : (
              <IconHidden name={TITLE_LIKE} value='showLike' />
            )
          }
          icon={!showLike && 'md-navigate-next'}
          splitStyles
          onPress={() => onSwitchBlock('showLike')}
        >
          {TITLE_LIKE}
        </SectionTitle>
        {showLike && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={like}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              typeCn={typeCn}
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / COVER_WIDTH) + 1, 6)}
              onPress={({ id, name, image }, type) => {
                navigation.push('Subject', {
                  subjectId: id,
                  _jp: name,
                  _image: getCoverSrc(image, COVER_WIDTH),
                  _type: type
                })

                t('条目.跳转', {
                  to: 'Subject',
                  from: TITLE_LIKE,
                  subjectId
                })
              }}
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
