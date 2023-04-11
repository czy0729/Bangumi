/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 13:11:26
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, uiStore } from '@stores'
import { getAction, HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Cover, Manage } from '../../base'
import { IconTouchable } from '../../icon/touchable'
import Title from './title'
import Bottom from './bottom'
import { DEFAULT_PROPS } from './ds'

const Item = memo(
  ({
    navigation,
    styles,
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
    //  global.rerender('Component.ItemCollections.Main')

    const typeCn = type

    let justify
    if (!isCatalog || (!comments && !isEditable)) justify = 'between'

    const subjectId = String(id).replace('/subject/', '')
    const titleLength = name.length + nameCn.length
    return (
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
          <Cover
            src={cover}
            width={IMG_WIDTH * 1.1}
            height={IMG_HEIGHT * 1.1}
            radius
            shadow
            type={type}
          />
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
                {/* <View style={_.mt.xxs}>
                  {tags.includes('自己可见') && (
                    <Flex style={styles.tag} justify='center'>
                      <Iconfont name='md-visibility-off' color={_.colorSub} size={13} />
                    </Flex>
                  )}
                  {nsfw && (
                    <Flex style={styles.tag} justify='center'>
                      <Text size={10} type='sub' bold>
                        R18
                      </Text>
                    </Flex>
                  )}
                </View> */}
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
                  numberOfLines={numberOfLines - (titleLength >= 28 ? 1 : 0)}
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
    )
  },
  DEFAULT_PROPS
)

export default Item
