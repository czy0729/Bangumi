/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 07:19:47
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Katakana, Text, Touchable } from '@components'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { x18 } from '@utils/app'
import { memo, ob } from '@utils/decorators'
import { EVENT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { Tag, Stars, Cover } from '../base'
import { IconTouchable } from '../icon/touchable'

const defaultProps = {
  navigation: {},
  styles: {},
  id: 0,
  name: '',
  nameCn: '',
  tip: '',
  score: '',
  tags: '',
  comments: '',
  time: '',
  collection: '',
  userCollection: '',
  cover: '',
  type: '',
  modify: '',
  showLabel: true,
  hideScore: false,
  isDo: false,
  isOnHold: false,
  isDropped: false,
  isCollect: false,
  isCatalog: false,
  isEditable: false,
  event: EVENT,
  onEdit: Function.prototype
}

const Item = memo(
  ({
    navigation,
    styles,
    id,
    name,
    nameCn,
    tip,
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
    rerender('Component.ItemCollections.Main')

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
    if (tags) {
      info.push(
        tags
          .split(' ')
          .filter(item => !!item)
          .filter((item, index) => index < 4)
          .join(' ')
      )
    }

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
          <Flex.Item style={_.ml.wind}>
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
                      {HTMLDecode(nameCn)}
                    </Katakana>
                    {hasName && name !== nameCn && (
                      <Katakana type='sub' size={11} lineHeight={15} bold>
                        {' '}
                        {HTMLDecode(name)}
                      </Katakana>
                    )}
                  </Katakana.Provider>
                </Flex.Item>
                <Flex style={_.mt.xxs}>
                  {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />}
                  {showLabel && !!type && <Tag style={_.ml.sm} value={type} />}
                </Flex>
              </Flex>
              {hasTip && (
                <Text style={_.mt.sm} size={11} numberOfLines={2}>
                  {HTMLDecode(tip)}
                </Text>
              )}
              <Flex style={_.mt.sm} align='start'>
                {!hideScore && hasScore && (
                  <Stars style={_.mr.xs} value={score} color='warning' />
                )}
                <Text style={_.mr.sm} type='sub' size={11} numberOfLines={1}>
                  {hasScore && !!info.length && '/ '}
                  {info.join(' / ')}
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex.Item>
                {hasComment && (
                  <Text style={[styles.comments, _.mt.md]} size={13}>
                    {comments}
                  </Text>
                )}
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
        {/* {children} */}
      </Touchable>
    )
  },
  defaultProps
)

export const ItemCollections = ob(
  ({
    navigation,
    id,
    name,
    nameCn,
    tip,
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
    rerender('Component.ItemCollections')

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        id={id}
        name={name}
        nameCn={nameCn}
        tip={tip}
        score={score}
        tags={tags}
        comments={comments}
        time={time}
        collection={collection}
        userCollection={userCollection}
        cover={cover}
        type={type}
        modify={modify}
        showLabel={showLabel}
        hideScore={hideScore}
        isDo={isDo}
        isOnHold={isOnHold}
        isDropped={isDropped}
        isCollect={isCollect}
        isCatalog={isCatalog}
        isEditable={isEditable}
        event={event}
        onEdit={onEdit}
      />
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
  },
  imgContainer: {
    width: IMG_WIDTH
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT
  },
  comments: {
    padding: _.sm,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  katakanas: {
    marginTop: -6
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  },
  edit: {
    marginTop: _.sm,
    marginRight: -_.xs
  }
}))
