/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-14 19:32:25
 */
import React from 'react'
import { rakuenStore } from '@stores'
import { getTimestamp } from '@utils'
import { obc } from '@utils/decorators'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST } from '@constants'
import Item from './item'
import { isBlockUser } from './utils'
import { memoStyles } from './styles'
import { Props as ItemPostProps } from './types'

export { ItemPostProps }

export const ItemPost = obc(
  (
    {
      contentStyle,
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
    global.rerender('Topic.Item')

    // 屏蔽脏数据
    if (!userId) return null

    // 屏蔽用户
    if (isBlockUser(userId, userName, replySub)) return null

    // 屏蔽内容删除
    const { filterDelete, blockKeywords, subExpand } = rakuenStore.setting
    let msg = decoder(message)
    if (filterDelete) {
      msg = decoder(message)
      if (msg.includes('内容已被用户删除')) return null
    }

    // 展开子楼层
    const { expands, translateResultFloor } = $.state
    const _expands = Number(expandNums || subExpand)
    let isExpand: boolean

    if (_expands !== undefined) {
      isExpand =
        sub.length <= _expands || (sub.length > _expands && expands.includes(id))
    } else {
      isExpand = true
    }

    // 新楼层标识
    const readedTime = $.readed?._time
    const isNew = !!readedTime && getTimestamp(time) > readedTime

    // 作者
    const isAuthor = authorId === userId

    // 跳转楼层标识
    const isJump = !!postId && postId === id

    // 浏览器查看
    const { _url } = $.params || {}
    const url = _url || `${HOST}/rakuen/topic/${$.topicId}`

    // 屏蔽关键字命中
    if (blockKeywords.some(item => msg.includes(item))) {
      msg =
        '<span style="color:#999;font-size:12px">命中自定义关键字，已被App屏蔽</span>'
    }

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        contentStyle={contentStyle}
        authorId={authorId}
        avatar={avatar}
        erase={erase}
        floor={floor}
        id={id}
        isAuthor={isAuthor}
        isExpand={isExpand}
        isFriend={$.myFriendsMap?.[userId]}
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
        event={event}
        onToggleExpand={$.toggleExpand}
      />
    )
  }
)
