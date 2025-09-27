/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:14:52
 */
import React from 'react'
import { Component, Flex, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT, FROZEN_FN, IMG_WIDTH } from '@constants'
import { IconTouchable } from '../../icon'
import Bottom from './bottom'
import Comments from './comments'
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
    isDo = false,
    isOnHold = false,
    isDropped = false,
    isCatalog = false,
    isEditable = false,
    event = EVENT,
    filter = '',
    showManage = false,
    touchPosition = 'outer',
    onEdit = FROZEN_FN
  }) => {
    const subjectId = String(id).replace('/subject/', '')
    const hasComment = !!comments && comments !== 'undefined'

    const isOuterTouch = touchPosition === 'outer'
    const handleNavigate = () => {
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
    }
    const elTitle = (
      <Title name={name} nameCn={nameCn} filter={filter} numberOfLines={comments ? 1 : 2} />
    )

    return (
      <Component id='item-collections' data-key={id}>
        <Container onPress={isOuterTouch ? handleNavigate : undefined}>
          <Flex style={styles.wrap} align='start'>
            <Cover
              index={index}
              subjectId={subjectId}
              cover={cover}
              y={ITEM_HEIGHT * (index + 1) + inViewY}
              type={type}
              onPress={isOuterTouch ? undefined : handleNavigate}
            />
            <Flex.Item style={styles.body}>
              <Content comments={comments} isCatalog={isCatalog} isEditable={isEditable}>
                <Flex style={_.container.block} align='start'>
                  <Flex.Item>
                    {isOuterTouch ? (
                      elTitle
                    ) : (
                      <Touchable onPress={handleNavigate}>{elTitle}</Touchable>
                    )}
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
                  <Tip name={name} nameCn={nameCn} numberOfLines={numberOfLines} value={tip} />
                )}
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
                      isDo={isDo}
                      isOnHold={isOnHold}
                      isDropped={isDropped}
                      hasComment={hasComment}
                    />
                  </Flex.Item>
                  {isEditable && (
                    <IconTouchable
                      style={styles.edit}
                      name='md-edit'
                      size={18}
                      onPress={() => onEdit(modify)}
                    />
                  )}
                </Flex>
              </Content>
              {hasComment && <Comments value={comments} />}
              <Likes relatedId={relatedId} subjectId={id} />
            </Flex.Item>
          </Flex>
        </Container>
      </Component>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
