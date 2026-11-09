/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 23:29:09
 */
import { useMemo } from 'react'
import { View } from 'react-native'
import { Heatmap, Text } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import BlockTitle from '../block-title'
import IconComment from '../icon/comment'
import IconVersion from '../icon/version'
import IconRate from '../rate-segment'
import IconStatus from '../status-segment'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Comment = memo(
  ({ styles, showComment = true, commentLength = 0 }) => {
    const elRight = useMemo(
      () =>
        showComment && (
          <>
            <IconVersion />
            <IconStatus />
            <IconRate />
            <IconComment />
          </>
        ),
      [showComment]
    )

    return (
      <>
        <BlockTitle
          layoutKey='showComment'
          style={showComment ? styles.container : styles.hide}
          right={elRight}
          icon={!showComment && 'md-navigate-next'}
          splitStyles
        >
          吐槽
          <Text size={12} type='sub' lineHeight={20}>
            {' '}
            {commentLength}+
          </Text>
        </BlockTitle>
        {!showComment && <View style={_.mt.sm} />}

        <Heatmap bottom={32} id='条目.跳转' from='吐槽' />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Comment
