/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 10:32:07
 */
import React from 'react'
import { Component } from '@components'
import { rakuenStore, uiStore } from '@stores'
import { getTimestamp } from '@utils'
import { obc } from '@utils/decorators'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST } from '@constants'
import Item from './item'
import PlusOne from './plus-one'
import { isBlockUser } from './utils'
import { memoStyles } from './styles'
import { Props as ItemPostProps } from './types'

export { ItemPostProps }

export const ItemPost = obc(
  (
    {
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
      showFixedTextare,
      expandNums,
      event
    }: ItemPostProps,
    { $, navigation }
  ) => {
    // global.rerender('Topic.Item')

    // 屏蔽脏数据
    if (!userId) return null

    // 屏蔽用户
    if (isBlockUser(userId, userName, replySub, `Topic|${id}`)) return null

    // 屏蔽内容删除
    const { filterDelete, blockKeywords, subExpand } = rakuenStore.setting
    let msg = decoder(message)

    const isDelete = msg.includes('删除了回复')
    if (isDelete && filterDelete) return null

    const styles = memoStyles()
    const url = $?.params?._url || `${HOST}/rakuen/topic/${$?.topicId}`
    const directFloor = $?.state?.directFloor === floor
    const isAuthor = authorId === userId
    const isFriend = $?.myFriendsMap?.[userId]
    const isBadge =
      !sub.length &&
      msg.length <= 10 &&
      (msg.toLocaleLowerCase().includes('mark') || msg.includes('+1'))
    if (isDelete || isBadge) {
      return (
        <Component
          id='item-post'
          data-key={id}
          data-type='plus-one'
          style={styles.itemDelete}
        >
          <PlusOne
            id={id}
            message={message}
            userId={userId}
            userName={userName}
            avatar={avatar}
            url={url}
            floor={floor}
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
    const _expands = Number(expandNums || subExpand)
    let isExpand: boolean
    if (_expands !== undefined) {
      isExpand =
        sub.length <= _expands || (sub.length > _expands && expands?.includes(id))
    } else {
      isExpand = true
    }

    // 新楼层标识
    const readedTime = $?.readed?._time
    const isNew = !!readedTime && getTimestamp(time) > readedTime

    // 跳转楼层标识
    const isJump = !!postId && postId === id

    // 屏蔽关键字命中
    if (blockKeywords.some(item => msg.includes(item))) {
      msg = '<span style="color:#999;font-size:12px">命中自定义关键字，已被屏蔽</span>'
    }

    return (
      <Item
        navigation={navigation}
        inViewY={inViewY}
        index={index}
        styles={styles}
        contentStyle={contentStyle}
        extraStyle={extraStyle}
        topicId={$?.topicId}
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
        showFixedTextare={showFixedTextare}
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
        event={event}
        onToggleExpand={$?.toggleExpand}
        onLikesLongPress={uiStore.showLikesUsers}
      />
    )
  }
)
