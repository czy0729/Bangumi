/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-22 02:45:59
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import RateSegement from './rate-segment'
import IconComment from './icon/comment'
import IconHidden from './icon/hidden'

const defaultProps = {
  showComment: true,
  pageTotal: 0,
  onSwitchBlock: Function.prototype
}

const Comment = memo(({ showComment, pageTotal, onSwitchBlock }) => {
  rerender('Subject.Comment.Main')

  return (
    <>
      <SectionTitle
        style={[_.container.wind, _.mt.lg, !showComment && _.short]}
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
          {20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)}+
        </Text>
      </SectionTitle>
      <Heatmap bottom={32} id='条目.跳转' from='吐槽' />
    </>
  )
}, defaultProps)

export default obc((props, { $ }) => {
  rerender('Subject.Comment')

  const { showComment } = systemStore.setting
  if (showComment === -1) return <View style={_.mt.lg} />

  const {
    pagination: { pageTotal = 0 }
  } = $.subjectComments
  return (
    <Comment
      showComment={showComment}
      pageTotal={pageTotal}
      onSwitchBlock={$.switchBlock}
    />
  )
})
