/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-25 07:04:54
 */
import React from 'react'
import { Component, Flex, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _, uiStore } from '@stores'
import { getAction, HTMLDecode } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_HEIGHT, IMG_WIDTH, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Cover, InView, Manage } from '../../base'
import { IconTouchable } from '../../icon/touchable'
import Bottom from './bottom'
import Likes from './likes'
import Title from './title'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const ITEM_HEIGHT = 156

const Item = memo(
  ({
    navigation,
    styles,
    index,
    inViewY,
    id,
    name,
    nameCn,
    tip,
    rank,
    score,
    total,
    simpleStars,
    tags,
    comments,
    time,
    collection,
    userCollection,
    cover,
    type,
    modify,
    numberOfLines,
    hideScore,
    relatedId,
    isDo,
    isOnHold,
    isDropped,
    isCatalog,
    isEditable,
    event,
    filter,
    showManage,
    onEdit
  }) => {
    const typeCn = type

    let justify: 'between'
    if (!isCatalog || (!comments && !isEditable)) justify = 'between'

    const subjectId = String(id).replace('/subject/', '')
    const titleLength = name.length + nameCn.length
    const width = IMG_WIDTH * 1.1
    return (
      <Component id='item-collections' data-key={id}>
        <Touchable
          style={styles.container}
          animate
          onPress={() => {
            const { id: eventId, data: eventData } = event
            t(eventId, {
              to: 'Subject',
              subjectId: id,
              type: 'list',
              ...eventData
            })

            navigation.push('Subject', {
              subjectId: id,
              _jp: name,
              _cn: nameCn,
              _image: getCoverSrc(cover, width),
              _type: type,
              _collection: collection || userCollection
            })
          }}
        >
          <Flex style={styles.wrap} align='start'>
            <InView style={styles.inView} y={ITEM_HEIGHT * index + inViewY + 1}>
              <Cover
                src={cover}
                width={width}
                height={IMG_HEIGHT * 1.1}
                radius
                type={type}
                priority={index < 4 ? 'high' : 'normal'}
              />
            </InView>
            <Flex.Item style={styles.body}>
              <Flex
                style={!!justify && styles.content}
                direction='column'
                justify={justify}
                align='start'
              >
                <Flex style={_.container.block} align='start'>
                  <Flex.Item>
                    <Title
                      name={name}
                      nameCn={nameCn}
                      filter={filter}
                      numberOfLines={comments ? 1 : 2}
                    />
                  </Flex.Item>
                  {showManage && (
                    <Manage
                      subjectId={subjectId}
                      collection={collection}
                      typeCn={typeCn}
                      onPress={() => {
                        uiStore.showManageModal(
                          {
                            subjectId,
                            title: nameCn,
                            desc: name,
                            status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                            action: getAction(typeCn)
                          },
                          '收藏'
                        )
                      }}
                    />
                  )}
                </Flex>
                {!!tip && (
                  <Text
                    size={11}
                    lineHeight={12}
                    numberOfLines={Math.max(2, numberOfLines - (titleLength >= 36 ? 1 : 0))}
                  >
                    {HTMLDecode(tip)}
                  </Text>
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
                    />
                  </Flex.Item>
                  {isEditable && (
                    <IconTouchable
                      style={styles.edit}
                      name='md-more-vert'
                      onPress={() => onEdit(modify)}
                    />
                  )}
                </Flex>
              </Flex>
              {!!comments && comments !== 'undefined' && (
                <Text
                  style={styles.comments}
                  size={comments.length >= 80 ? 12 : comments.length >= 40 ? 13 : 14}
                  lineHeight={16}
                >
                  {comments}
                </Text>
              )}
              <Likes relatedId={relatedId} subjectId={id} />
            </Flex.Item>
          </Flex>
        </Touchable>
      </Component>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
