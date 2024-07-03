/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-03 11:06:19
 */
import React from 'react'
import { memo } from '@utils/decorators'
import { r } from '@utils/dev'
import Avatar from './avatar'
import Container from './container'
import ContainerLayout from './container-layout'
import FloorDirect from './floor-direct'
import FloorMain from './floor-main'
import FloorSub from './floor-sub'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Item = memo(
  ({
    inViewY,
    index,
    contentStyle,
    extraStyle,
    topicId,
    authorId,
    avatar,
    erase,
    floor,
    directFloor,
    id,
    isAuthor,
    isExpand,
    isFriend,
    isJump,
    isNew,
    matchLink,
    msg,
    postId,
    readedTime,
    replySub,
    expandNums,
    sub,
    time,
    translate,
    url,
    userId,
    userName,
    userSign,
    formhash,
    likeType,
    event,
    onJumpTo,
    onLikesLongPress,
    onShowFixedTextare,
    onToggleExpand
  }) => {
    r(COMPONENT_MAIN)

    return (
      <Container id={id} subLength={sub.length}>
        <ContainerLayout id={id} subLength={sub.length} isJump={isJump}>
          <Avatar
            {...{
              index,
              inViewY,
              userId,
              userName,
              avatar,
              event
            }}
          />

          {/* 主楼层 */}
          <FloorMain
            {...{
              contentStyle,
              extraStyle,
              topicId,
              erase,
              floor,
              id,
              isAuthor,
              isFriend,
              isNew,
              matchLink,
              msg,
              replySub,
              time,
              translate,
              url,
              userId,
              userName,
              userSign,
              formhash,
              likeType,
              event,
              onJumpTo,
              onLikesLongPress,
              onShowFixedTextare
            }}
          />

          {/* 高亮 */}
          {directFloor && <FloorDirect />}
        </ContainerLayout>

        <FloorSub
          {...{
            extraStyle,
            authorId,
            id,
            isExpand,
            matchLink,
            postId,
            readedTime,
            expandNums,
            sub,
            url,
            userId,
            event,
            onJumpTo,
            onLikesLongPress,
            onShowFixedTextare,
            onToggleExpand
          }}
        />
      </Container>
    )
  },
  DEFAULT_PROPS
)

export default Item
