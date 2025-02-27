/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:03:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:21:14
 */
import React from 'react'
import { rakuenStore, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { isBlockUser } from '../utils'
import ItemSub from './item'
import { memoStyles } from './styles'
import { Ctx } from './types'

export default ob(
  ({
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
  }) => {
    const navigation = useNavigation()
    const { $ } = useStore<Ctx>()

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
  }
)
