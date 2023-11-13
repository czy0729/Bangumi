/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 22:14:28
 */
import React from 'react'
import { Component, Flex, Text, Touchable } from '@components'
import { _, uiStore } from '@stores'
import { getAction, HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { InView, Cover, Manage } from '../../base'
import { IconTouchable } from '../../icon/touchable'
import Title from './title'
import Bottom from './bottom'
import { DEFAULT_PROPS } from './ds'

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
    // global.rerender('Component.ItemCollections.Main')

    const typeCn = type

    let justify
    if (!isCatalog || (!comments && !isEditable)) justify = 'between'

    const subjectId = String(id).replace('/subject/', '')
    const titleLength = name.length + nameCn.length
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
              _image: cover,
              _type: type,
              _collection: collection || userCollection
            })
          }}
        >
          <Flex style={styles.wrap} align='start'>
            <InView style={styles.inView} y={ITEM_HEIGHT * index + inViewY + 1}>
              <Cover
                src={cover}
                width={IMG_WIDTH * 1.1}
                height={IMG_HEIGHT * 1.1}
                radius
                shadow
                type={type}
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
                            status:
                              MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(
                                collection
                              ),
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
                    numberOfLines={numberOfLines - (titleLength >= 36 ? 1 : 0)}
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
                <Text style={styles.comments} size={14} lineHeight={17}>
                  {comments}
                </Text>
              )}
            </Flex.Item>
          </Flex>
        </Touchable>
      </Component>
    )
  },
  DEFAULT_PROPS
)

export default Item
