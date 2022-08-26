/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:27:23
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconHidden from '../icon/hidden'
import { COVER_WIDTH, COVER_HEIGHT, DEFAULT_PROPS } from './ds'

export default memo(
  ({ navigation, showRelations, subjectId, relations, onSwitchBlock }) => {
    global.rerender('Subject.Relations.Main')

    return (
      <View style={[_.mt.lg, !showRelations && _.short]}>
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
      </View>
    )
  },
  DEFAULT_PROPS
)
