/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-09 02:10:00
 */
import React from 'react'
import { Component } from '@components'
import { rakuenStore, uiStore, useStore } from '@stores'
import { getIsBlocked, getTimestamp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST, MODEL_RAKUEN_NEW_FLOOR_STYLE } from '@constants'
import Item from './item'
import PlusOne from './plus-one'
import { isBlockUser, isSpecFloor } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Ctx, Props as ItemPostProps } from './types'

export { ItemPostProps }

export const ItemPost = ob(
  ({
    inViewY,
    index,
    contentStyle,
    extraStyle,
    avatar,
    userId,
    userName,
    replySub,
    message,
    sub,
    id,
    authorId,
    postId,
    time,
    floor,
    userSign,
    erase,
    rendered,
    matchLink,
    expandNums,
    event,
    showFixedTextare: onShowFixedTextarea,
    onJumpTo
  }: ItemPostProps) => {
    const { $ } = useStore<Ctx>()

    // 屏蔽脏数据
    if (!userId) return null

    // 屏蔽用户
    const uuid = `Topic|${id}`
    userName = HTMLDecode(userName)
    if (isBlockUser(userId, userName, replySub, uuid)) return null

    const styles = memoStyles()
    const url = $?.params?._url || `${HOST}/rakuen/topic/${$?.topicId}`
    const directFloor = $?.state?.directFloor === floor
    const isAuthor = authorId === userId
    const isFriend = $?.myFriendsMap?.[userId]
    let msg = decoder(message)
    if (isSpecFloor(msg, sub.length)) {
      return (
        <Component id='item-post' data-key={id} data-type='plus-one' style={styles.delete}>
          <PlusOne
            id={id}
            message={message}
            userId={userId}
            userName={userName}
            avatar={avatar}
            url={url}
            directFloor={directFloor}
            isAuthor={isAuthor}
            isFriend={isFriend}
            event={event}
          />
        </Component>
      )
    }

    // 展开子楼层
    const { expands, translateResultFloor } = $?.state || {}
    const _expands = Number(expandNums || rakuenStore.setting.subExpand)
    let isExpand: boolean
    if (_expands !== undefined) {
      isExpand = sub.length <= _expands || (sub.length > _expands && expands?.includes(id))
    } else {
      isExpand = true
    }

    // 新楼层标识
    const newFloorStyle = MODEL_RAKUEN_NEW_FLOOR_STYLE.getLabel(rakuenStore.setting.newFloorStyle)
    const readedTime = $?.readed?._time
    let isNew = false
    if (newFloorStyle !== '不设置') isNew = !!readedTime && getTimestamp(time) > Number(readedTime)

    // 跳转楼层标识
    const isJump = !!postId && postId === id

    // 屏蔽关键字命中
    if (getIsBlocked(rakuenStore.setting.blockKeywords, msg, uuid)) {
      msg = '<span style="color:#999;font-size:13px">已屏蔽</span>'
    }

    return (
      <Item
        inViewY={inViewY}
        index={index}
        contentStyle={contentStyle}
        extraStyle={extraStyle}
        topicId={$?.topicId || ($?.blogId ? `blog/${$?.blogId}` : undefined)}
        authorId={authorId}
        avatar={avatar}
        erase={erase}
        floor={floor}
        directFloor={directFloor}
        id={id}
        isAuthor={isAuthor}
        isExpand={isExpand}
        isFriend={isFriend}
        isJump={isJump}
        isNew={isNew}
        matchLink={matchLink === undefined ? rendered : matchLink}
        msg={msg}
        postId={postId}
        readedTime={readedTime}
        replySub={replySub}
        expandNums={_expands}
        sub={sub}
        time={time}
        translate={translateResultFloor?.[id]}
        url={url}
        userId={userId}
        userName={userName}
        userSign={userSign}
        formhash={$?.topic?.formhash}
        likeType={$?.topic?.likeType}
        newFloorStyle={newFloorStyle}
        event={event}
        onJumpTo={onJumpTo}
        onLikesLongPress={uiStore.showLikesUsers}
        onShowFixedTextare={onShowFixedTextarea}
        onToggleExpand={$?.toggleExpand}
      />
    )
  },
  COMPONENT
)

export default ItemPost
