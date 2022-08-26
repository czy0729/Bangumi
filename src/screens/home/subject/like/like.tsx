/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:41:54
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

export default memo(({ navigation, showLike, subjectId, like, onSwitchBlock }) => {
  global.rerender('Subject.Like.Main')

  return (
    <View style={[_.mt.lg, !showLike && _.short]}>
      <SectionTitle
        style={_.container.wind}
        right={!showLike && <IconHidden name='猜你喜欢' value='showLike' />}
        icon={!showLike && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showLike')}
      >
        猜你喜欢
      </SectionTitle>
      {showLike && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={like}
            width={COVER_WIDTH}
            height={COVER_HEIGHT}
            initialRenderNums={_.device(
              Math.floor(_.window.contentWidth / COVER_WIDTH) + 1,
              6
            )}
            onPress={({ id, name, image }, type) => {
              t('条目.跳转', {
                to: 'Subject',
                from: '猜你喜欢',
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
          <Heatmap id='条目.跳转' from='猜你喜欢' />
        </>
      )}
    </View>
  )
}, DEFAULT_PROPS)
