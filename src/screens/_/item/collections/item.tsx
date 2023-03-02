/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 18:53:25
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT, MODEL_RATING_STATUS } from '@constants'
import { RatingStatus } from '@types'
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
    // showLabel,
    hideScore,
    isDo,
    isOnHold,
    isDropped,
    // isCollect,
    isCatalog,
    isEditable,
    event,
    filter,
    onEdit,
    onManagePress
  }) => {
    global.rerender('Component.ItemCollections.Main')

    const typeCn = type

    let justify
    if (!isCatalog || (!comments && !isEditable)) justify = 'between'

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
              <Flex align='start'>
                <Flex.Item>
                  <Title name={name} nameCn={nameCn} filter={filter} />
                </Flex.Item>
                <Flex style={_.mt.xxs}>
                  {tags.includes('自己可见') && (
                    <Flex style={styles.hidden} justify='center'>
                      <Iconfont name='md-visibility-off' color={_.colorSub} size={13} />
                    </Flex>
                  )}
                </Flex>
                {!!onManagePress && (
                  <Manage
                    collection={collection}
                    typeCn={typeCn}
                    onPress={() => {
                      onManagePress({
                        subjectId: String(id).replace('/subject/', ''),
                        title: nameCn,
                        desc: name,
                        status: MODEL_RATING_STATUS.getValue<RatingStatus>(collection),
                        typeCn
                      })
                    }}
                  />
                )}
              </Flex>
              {!!tip && (
                <Text
                  style={styles.tip}
                  size={11}
                  lineHeight={12}
                  numberOfLines={numberOfLines}
                >
                  {HTMLDecode(tip)}
                </Text>
              )}
              <Bottom
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
            </Flex>
            <Flex>
              <Flex.Item>
                <Flex>
                  {!!comments && (
                    <Text style={styles.comments} size={14} lineHeight={17}>
                      {comments}
                    </Text>
                  )}
                </Flex>
              </Flex.Item>
              {isEditable && (
                <IconTouchable
                  style={styles.edit}
                  name='md-more-vert'
                  onPress={() => onEdit(modify)}
                />
              )}
            </Flex>
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  },
  DEFAULT_PROPS
)

export default Item
