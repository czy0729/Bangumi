/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:03:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:17:05
 */
import React from 'react'
import { rakuenStore, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { useNavigation, useObserver } from '@utils/hooks'
import { isBlockUser } from '../utils'
import ItemSub from './item'
import { memoStyles } from './styles'

import type { Ctx, Props } from './types'

const Sub = ({
  extraStyle,
  authorId,
  avatar,
  erase,
  floor,
  id,
  matchLink,
  message,
  postId,
  readedTime,
  replySub,
  time,
  uid,
  url,
  userId,
  userName,
  newFloorStyle,
  event,
  onJumpTo,
  onShowFixedTextare
}: Props) => {
  const navigation = useNavigation()
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    // 屏蔽脏数据
    if (!userId) return null

    userName = HTMLDecode(userName)
    if (isBlockUser(userId, userName, replySub)) return null

    const { translateResultFloor } = $?.state || {}
    const { blockKeywords, quote, quoteAvatar, wide } = rakuenStore.setting
    return (
      <ItemSub
        navigation={navigation}
        styles={memoStyles()}
        extraStyle={extraStyle}
        topicId={$?.topicId || ($?.blogId ? `blog/${$?.blogId}` : undefined)}
        authorId={authorId}
        avatar={avatar}
        blockKeywords={blockKeywords}
        erase={erase}
        filterDelete={rakuenStore.setting.filterDelete}
        floor={floor}
        directFloor={$?.state?.directFloor === floor}
        id={id}
        isBlockUser={$?.isBlockUser}
        matchLink={matchLink}
        message={message}
        myFriendsMap={$?.myFriendsMap}
        postId={postId}
        postUsersMap={$?.postUsersMap}
        quote={quote}
        quoteAvatar={quoteAvatar}
        wide={wide}
        readedTime={readedTime}
        replySub={replySub}
        time={time}
        translate={translateResultFloor?.[id]}
        uid={uid}
        url={url}
        userId={userId}
        userName={userName}
        formhash={$?.topic?.formhash}
        like={rakuenStore.commentTracked(userId)}
        likeType={$?.topic?.likeType}
        newFloorStyle={newFloorStyle}
        event={event}
        onJumpTo={onJumpTo}
        onLikesLongPress={$?.showLikesUsers}
        onShowFixedTextare={onShowFixedTextare}
      />
    )
  })
}

export default Sub
