/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:28:51
 */
import React from 'react'
import { memo } from '@utils/decorators'
import { r } from '@utils/dev'
import { EVENT, FROZEN_ARRAY, FROZEN_FN } from '@constants'
import Avatar from './avatar'
import Container from './container'
import ContainerLayout from './container-layout'
import FloorDirect from './floor-direct'
import FloorMain from './floor-main'
import FloorNew from './floor-new'
import FloorSub from './floor-sub'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Item = memo(
  ({
    inViewY = 0,
    index = 0,
    contentStyle,
    extraStyle,
    topicId = '',
    authorId = '',
    avatar = '',
    erase = '',
    floor = '',
    directFloor = false,
    id = 0,
    isAuthor = false,
    isExpand = false,
    isFriend = false,
    isJump = false,
    isNew = false,
    matchLink = false,
    msg = '',
    postId = '',
    readedTime = '',
    replySub = '',
    expandNums,
    sub = FROZEN_ARRAY,
    time = '',
    translate = '',
    url = '',
    userId = '',
    userName = '',
    userSign = '',
    formhash = '',
    likeType = '',
    newFloorStyle = '角标',
    event = EVENT,
    onJumpTo = FROZEN_FN,
    onLikesLongPress = FROZEN_FN,
    onShowFixedTextare = FROZEN_FN,
    onToggleExpand = FROZEN_FN
  }) => {
    r(COMPONENT_MAIN)

    return (
      <Container id={id} subLength={sub.length} isNew={newFloorStyle === '背景' && isNew}>
        <ContainerLayout id={id} subLength={sub.length} isJump={isJump}>
          {newFloorStyle === '角标' && isNew && <FloorNew />}

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
              isNew: newFloorStyle === '红点' && isNew,
              matchLink,
              msg,
              replySub,
              time,
              translate,
              url,
              userId,
              userName,
              userSign,
              avatar,
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
            newFloorStyle,
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
