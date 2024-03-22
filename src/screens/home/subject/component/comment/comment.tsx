/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:46:44
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { SectionTitle } from '@_'
import { memo } from '@utils/decorators'
import IconComment from '../icon/comment'
import IconHidden from '../icon/hidden'
import RateSegement from '../rate-segment'
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
                <RateSegement />
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
