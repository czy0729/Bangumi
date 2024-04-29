/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-30 01:29:31
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { SectionTitle } from '@_'
import { memo } from '@utils/decorators'
import IconComment from '../icon/comment'
import IconHidden from '../icon/hidden'
import RateSegment from '../rate-segment'
import StatusSegement from '../status-segment'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Comment = memo(
  ({ styles, showComment, commentLength, onSwitchBlock }) => {
    return (
      <>
        <SectionTitle
          style={showComment ? styles.container : styles.hide}
          right={
            showComment ? (
              <>
                <StatusSegement />
                <RateSegment />
                <IconComment />
              </>
            ) : (
              <IconHidden name='吐槽' value='showComment' />
            )
          }
          icon={!showComment && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showComment')}
        >
          吐槽{' '}
          <Text size={12} type='sub' lineHeight={24}>
            {commentLength}+
          </Text>
        </SectionTitle>
        <Heatmap bottom={32} id='条目.跳转' from='吐槽' />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Comment
