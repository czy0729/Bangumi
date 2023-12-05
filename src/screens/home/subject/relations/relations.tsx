/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:38:19
 */
import React from 'react'
import { Heatmap } from '@components'
import { InView, SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import IconHidden from '../icon/hidden'
import { COVER_WIDTH, COVER_HEIGHT, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(
  ({ navigation, showRelations, subjectId, relations, onSwitchBlock }) => {
    rerender('Subject.Relations.Main')

    return (
      <InView style={showRelations ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={!showRelations && <IconHidden name='关联' value='showRelations' />}
          icon={!showRelations && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showRelations')}
        >
          关联
        </SectionTitle>
        {showRelations && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={relations}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              findCn
              initialRenderNums={_.device(
                Math.floor(_.window.contentWidth / COVER_WIDTH) + 1,
                6
              )}
              onPress={({ id, name, image }, type) => {
                t('条目.跳转', {
                  to: 'Subject',
                  from: '关联条目',
                  subjectId
                })

                navigation.push('Subject', {
                  subjectId: id,
                  _jp: name,
                  _image: image,
                  _type: type
                })
              }}
            />
            <Heatmap id='条目.跳转' from='关联条目' />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS
)
