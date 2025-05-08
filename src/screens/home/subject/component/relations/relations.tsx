/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:10:29
 */
import React from 'react'
import { Heatmap } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, FROZEN_FN } from '@constants'
import { SubjectTypeCn } from '@types'
import { TITLE_RELATIONS } from '../../ds'
import IconHidden from '../icon/hidden'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Relations = memo(
  ({
    navigation,
    showRelations = true,
    subjectId = 0,
    relations = FROZEN_ARRAY,
    typeCn = '' as SubjectTypeCn,
    onSwitchBlock = FROZEN_FN
  }) => {
    return (
      <InView style={showRelations ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={
            showRelations ? (
              <IconRelation title='关联' list={relations} />
            ) : (
              <IconHidden name={TITLE_RELATIONS} value='showRelations' />
            )
          }
          icon={!showRelations && 'md-navigate-next'}
          splitStyles
          onPress={() => onSwitchBlock('showRelations')}
        >
          {TITLE_RELATIONS}
        </SectionTitle>
        {showRelations && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={relations}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              findCn
              relationTypeCn={typeCn}
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
                  from: '关联条目',
                  subjectId
                })
              }}
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
