/*
 * @Author: czy0729
 * @Date: 2021-08-14 16:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-14 16:58:09
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import RateSegement from './rate-segment'
import IconComment from './icon/comment'

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
        icon={!showComment && 'md-navigate-next'}
        right={
          showComment && (
            <>
              <RateSegement />
              <IconComment />
            </>
          )
        }
        onPress={() => onSwitchBlock('showComment')}
      >
        吐槽{' '}
        <Text size={12} type='sub' lineHeight={24}>
          {20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)}+
        </Text>
      </SectionTitle>
      <Heatmap
        bottom={32}
        id='条目.跳转'
        data={{
          from: '吐槽'
        }}
      />
    </>
  )
}, defaultProps)

export default obc((props, { $ }) => {
  rerender('Subject.Comment')

  const {
    pagination: { pageTotal = 0 }
  } = $.subjectComments
  return (
    <Comment
      showComment={systemStore.setting.showComment}
      pageTotal={pageTotal}
      onSwitchBlock={$.switchBlock}
    />
  )
})
