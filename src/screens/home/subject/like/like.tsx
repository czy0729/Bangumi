/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 16:34:52
 */
import React from 'react'
import { Heatmap } from '@components'
import { InView, SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import IconHidden from '../icon/hidden'
import { COVER_WIDTH, COVER_HEIGHT, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(({ navigation, showLike, subjectId, like, onSwitchBlock }) => {
  rerender('Subject.Like.Main')

  return (
    <InView style={stl(styles.container, !showLike && _.short)}>
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
    </InView>
  )
}, DEFAULT_PROPS)
