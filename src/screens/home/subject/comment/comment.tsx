/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:59:18
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { memo } from '@utils/decorators'
import RateSegement from '../rate-segment'
import IconComment from '../icon/comment'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'

export default memo(({ styles, showComment, pageTotal, total, onSwitchBlock }) => {
  // global.rerender('Subject.Comment.Main')

  const comment =
    pageTotal <= 1 ? total : 20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)
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
          {comment}+
        </Text>
      </SectionTitle>
      <Heatmap bottom={32} id='条目.跳转' from='吐槽' />
    </>
  )
}, DEFAULT_PROPS)
