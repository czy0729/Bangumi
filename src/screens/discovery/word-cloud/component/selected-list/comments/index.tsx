/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:51:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:54:51
 *
 * 选中吐槽列表: 分页渲染, 关键词高亮
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex, Highlight, Text, UserStatus } from '@components'
import { InView, Name, PaginationList } from '@_'
import { _, useStore } from '@stores'
import { correctAgo, keyExtractor } from '@utils'
import { EL_PLACEHOLDER } from '../ds'
import { AVATAR_WIDTH, EVENT, ITEM_WIDTH } from './ds'
import { styles } from './styles'

import type { RenderItem } from '@types'
import type { Ctx, SelectedCommentItem } from '../../../types'

function Comments() {
  const { $, navigation } = useStore<Ctx>()

  const { title } = $.state

  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<SelectedCommentItem>) => {
      const { userId, userName, time, action } = item

      return (
        <Flex style={_.mb.md} align='start'>
          <InView
            style={{
              width: AVATAR_WIDTH
            }}
            y={ITEM_WIDTH * (index + 1)}
          >
            <UserStatus userId={userId}>
              <Avatar
                navigation={navigation}
                userId={userId}
                name={userName}
                src={item.avatar}
                size={AVATAR_WIDTH}
                event={EVENT}
              />
            </UserStatus>
          </InView>
          <Flex.Item style={_.ml.sm}>
            <Name
              size={14}
              bold
              userId={userId}
              showFriend
              right={
                <Text type='sub' size={11} lineHeight={14}>
                  {'  '}
                  {action ? `${action} · ` : ''}
                  {String(time).includes('ago') ? correctAgo(time) : time}
                </Text>
              }
            >
              {userName}
            </Name>
            <Highlight style={_.mt.xs} size={13} lineHeight={16} value={title} selectable>
              {item.comment}
            </Highlight>
          </Flex.Item>
        </Flex>
      )
    },
    [title, navigation]
  )

  if (!$.selectedComment.length) return null

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      data={$.selectedComment}
      limit={8}
      resetKey={title}
      renderItem={handleRenderItem}
      removeClippedSubviews={false}
      footerEmptyDataComponent={EL_PLACEHOLDER}
      footerNoMoreDataComponent={EL_PLACEHOLDER}
      onScroll={$.onScroll}
    />
  )
}

export default observer(Comments)
