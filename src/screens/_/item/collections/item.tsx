/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 10:56:13
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { Tag, Cover } from '../../base'
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
    tags,
    comments,
    time,
    collection,
    userCollection,
    cover,
    type,
    modify,
    showLabel,
    hideScore,
    isDo,
    isOnHold,
    isDropped,
    isCollect,
    isCatalog,
    isEditable,
    event,
    filter,
    onEdit
  }) => {
    global.rerender('Component.ItemCollections.Main')

    const hasTip = !!tip
    const hasComment = !!comments
    const isHidden = tags.includes('自己可见')
    const _collection = collection || (isCollect ? '已收藏' : '')

    return (
      <Touchable
        style={[_.container.plain, styles.container]}
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
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
            radius
            shadow
            type={type}
          />
          <Flex.Item style={[_.mt.xxs, _.ml.wind]}>
            <Flex
              style={[!isCatalog && styles.content]}
              direction='column'
              justify={isCatalog ? undefined : 'between'}
              align='start'
            >
              <Flex align='start'>
                {!!_collection && <Tag style={styles.collection} value={_collection} />}
                <Flex.Item>
                  <Title
                    name={name}
                    nameCn={nameCn}
                    filter={filter}
                    collection={collection}
                    isCollect={isCollect}
                  />
                </Flex.Item>
                <Flex style={_.mt.xxs}>
                  {isHidden && (
                    <Flex style={styles.hidden} justify='center'>
                      <Iconfont name='md-visibility-off' color={_.colorSub} size={11} />
                    </Flex>
                  )}
                  {/* {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />} */}
                  {showLabel && !!type && <Tag style={_.ml.sm} value={type} />}
                </Flex>
              </Flex>
              {hasTip && (
                <Text style={_.mt.sm} size={11} numberOfLines={2}>
                  {HTMLDecode(tip)}
                </Text>
              )}
              <Flex style={_.mt.sm}>
                <Bottom
                  score={score}
                  rank={rank}
                  time={time}
                  tags={tags}
                  hideScore={hideScore}
                  isDo={isDo}
                  isOnHold={isOnHold}
                  isDropped={isDropped}
                />
              </Flex>
            </Flex>
            <Flex>
              <Flex.Item>
                <Flex>
                  {hasComment && (
                    <Text style={[styles.comments, _.mt.md]} size={13} lineHeight={15}>
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
