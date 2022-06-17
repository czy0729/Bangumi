/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 12:21:23
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { getTimestamp, cnjp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { Tag, Rank, Stars, Cover } from '../../base'
import { IconTouchable } from '../../icon/touchable'
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
    onEdit
  }) => {
    global.rerender('Component.ItemCollections.Main')

    const left = HTMLDecode(cnjp(nameCn, name))
    const right = HTMLDecode(cnjp(name, nameCn))
    const hasName = !!name
    const hasTip = !!tip
    const hasScore = !!score
    const hasComment = !!comments
    let days
    if (isDo || isOnHold || isDropped) {
      days = Math.ceil((getTimestamp() - getTimestamp(time)) / 86400)
    }

    const info = []
    if (isDo) info.push(`${days}天`)
    if (isOnHold) info.push(`搁置${days}天`)
    if (isDropped) info.push(`抛弃${days}天`)

    let isHidden
    const tag = tags
      .split(' ')
      .filter(item => {
        if (item === '自己可见') {
          isHidden = true
          return false
        }
        return !!item
      })
      .filter((item, index) => index < 4)

    const _collection = collection || (isCollect ? '已收藏' : '')
    // {collection} = 2个全角 + 1个半角, 已收藏 = 3个全角
    const indent = _collection ? (collection ? '　　 ' : '　　　') : ''
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
          <View style={styles.imgContainer}>
            <Cover
              style={styles.image}
              src={cover}
              width={IMG_WIDTH}
              height={IMG_HEIGHT}
              radius
              shadow
              type={type}
            />
          </View>
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
                  <Katakana.Provider
                    itemStyle={styles.katakanas}
                    size={15}
                    numberOfLines={2}
                  >
                    <Katakana size={15} bold>
                      {indent}
                      {left}
                    </Katakana>
                    {hasName && right !== left && (
                      <Katakana type='sub' size={11} lineHeight={15} bold>
                        {'  '}
                        {right}
                      </Katakana>
                    )}
                  </Katakana.Provider>
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
                {!hideScore && hasScore && (
                  <>
                    <Rank value={rank} />
                    <Stars style={_.mr.xs} value={score} />
                  </>
                )}
                {!!info.length && (
                  <Text style={_.mr.sm} type='sub' size={11} numberOfLines={1}>
                    {hasScore && !!info.length && '/ '}
                    {info}
                  </Text>
                )}
                {tag.map(item => (
                  <View key={item} style={styles.tag}>
                    <Text size={11}>{item}</Text>
                  </View>
                ))}
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
