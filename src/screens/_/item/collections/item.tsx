/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 20:37:12
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Component, Flex, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT, FROZEN_FN, IMG_WIDTH } from '@constants'
import { Comments, computeInViewY, PreventTouchPlaceholder } from '../../base'
import { IconTouchable } from '../../icon'
import Bottom from './bottom'
import Container from './container'
import Content from './content'
import Cover from './cover'
import Likes from './likes'
import Manage from './manage'
import Tip from './tip'
import Title from './title'
import { COMPONENT_MAIN, DEFAULT_PROPS, ITEM_HEIGHT } from './ds'

const Item = memo(
  ({
    navigation,
    styles,
    index = 0,
    inViewY = 0,
    id = 0,
    name = '',
    nameCn = '',
    tip = '',
    rank = '',
    score = '',
    total = '',
    simpleStars = false,
    tags = '',
    comments = '',
    time = '',
    collection = '',
    cover = '',
    type,
    modify = '',
    numberOfLines = 2,
    hideScore = false,
    relatedId = 0,
    isCatalog = false,
    isEditable = false,
    event = EVENT,
    filter = '',
    showManage = false,
    showLikesCreate = false,
    touchPosition = 'outer',
    commentsFull = false,
    commentsLines,
    active = false,
    onEdit = FROZEN_FN
  }) => {
    const {
      subjectId,
      hasComment
      // isOuterTouch
    } = useMemo(
      () => ({
        subjectId: String(id).replace('/subject/', ''),
        hasComment: !!comments && comments !== 'undefined',
        isOuterTouch: touchPosition === 'outer'
      }),
      [id, comments, touchPosition]
    )

    const handleNavigate = useCallback(() => {
      navigation.push('Subject', {
        subjectId: id,
        _jp: name,
        _cn: nameCn,
        _image: getCoverSrc(cover, IMG_WIDTH * 1.1),
        _type: type
      })

      t(event.id, {
        to: 'Subject',
        subjectId: id,
        type: 'list',
        ...event.data
      })
    }, [navigation, id, name, nameCn, cover, type, event])

    const titleLines = useMemo(
      () => (name && nameCn && name !== nameCn && comments ? 1 : 2),
      [name, nameCn, comments]
    )

    const renderCommentsAndLikes = (customStyle = null) => (
      <>
        {hasComment && (
          <Comments style={customStyle} value={comments} numberOfLines={commentsLines} />
        )}
        <Likes
          relatedId={relatedId}
          subjectId={id}
          limit={(commentsFull ? 5 : 3) + _.device(0, 3)}
          showCreate={showLikesCreate}
        />
      </>
    )

    return (
      <Component id='item-collections' data-key={id}>
        <Container active={active}>
          <Flex style={styles.wrap} align='start'>
            <Cover
              index={index}
              subjectId={subjectId}
              cover={cover}
              y={computeInViewY(index, ITEM_HEIGHT, inViewY)}
              type={type}
              onPress={handleNavigate}
            />

            <Flex.Item style={styles.body}>
              <Content comments={comments} isCatalog={isCatalog} isEditable={isEditable}>
                <Touchable onPress={handleNavigate}>
                  <Flex style={_.container.block} align='start'>
                    <Flex.Item>
                      <Title
                        name={name}
                        nameCn={nameCn}
                        filter={filter}
                        numberOfLines={titleLines}
                      />
                    </Flex.Item>

                    {showManage && (
                      <Manage
                        subjectId={subjectId}
                        name={name}
                        nameCn={nameCn}
                        collection={collection}
                        typeCn={type}
                      />
                    )}
                  </Flex>

                  {!!tip && (
                    <Tip
                      style={!isEditable && _.mt.xs}
                      name={name}
                      nameCn={nameCn}
                      numberOfLines={numberOfLines}
                      value={tip}
                    />
                  )}
                </Touchable>

                <Flex>
                  <Flex.Item>
                    <Bottom
                      id={id}
                      score={score}
                      rank={rank}
                      total={total}
                      simpleStars={simpleStars}
                      time={time}
                      tags={tags}
                      hideScore={hideScore}
                      hasComment={hasComment}
                    />
                  </Flex.Item>

                  {isEditable && (
                    <IconTouchable
                      style={styles.edit}
                      name='md-edit'
                      size={17}
                      onPress={() => onEdit(modify)}
                    />
                  )}
                </Flex>
              </Content>

              {!commentsFull && renderCommentsAndLikes()}
            </Flex.Item>
          </Flex>
        </Container>

        {commentsFull && (
          <View style={styles.comments}>{renderCommentsAndLikes(styles.commentsFull)}</View>
        )}

        <PreventTouchPlaceholder />
      </Component>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
