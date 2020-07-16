/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-16 22:10:36
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, x18 } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { EVENT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Tag from '../base/tag'
import Cover from '../base/cover'
import Stars from '../base/stars'

function ItemSearch({
  style,
  navigation,
  index,
  id,
  cover,
  name,
  nameCn,
  tip,
  score,
  total,
  rank,
  type,
  collection, // 动画才有, 具体收藏状态
  collected, // 是否收藏
  comments,
  position = [],
  event
}) {
  const styles = memoStyles()

  // 人物高清图不是正方形的图, 所以要特殊处理
  const isMono = !id.includes('/subject/')
  const isFirst = index === 0
  const _collection = collection || (collected ? '已收藏' : '')

  // {collection} = 2个全角 + 1个半角, 已收藏 = 3个全角
  const indent = _collection ? (collection ? '　　 ' : '　　　') : ''
  return (
    <Touchable
      style={[styles.container, style]}
      onPress={() => {
        appNavigate(
          id,
          navigation,
          {
            _jp: name,
            _cn: nameCn,
            _image: cover
          },
          event
        )
      }}
    >
      <Flex
        align='start'
        style={[styles.wrap, !isFirst && !_.flat && styles.border]}
      >
        <View style={styles.imgContainer}>
          <Cover
            style={styles.image}
            src={cover}
            resizeMode={isMono ? 'contain' : undefined}
            placeholder={!isMono}
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
            radius
            shadow
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={{ width: '100%' }}>
              {!!_collection && (
                <Tag style={styles.collection} value={_collection} />
              )}
              <Flex.Item>
                {!!(nameCn || name) && (
                  <Katakana.Provider size={15} numberOfLines={2}>
                    <Katakana size={15} bold>
                      {indent}
                      {HTMLDecode(nameCn || name)}
                    </Katakana>
                    {!!comments && (
                      <Text type='main' lineHeight={15}>
                        {' '}
                        {comments}
                      </Text>
                    )}
                    {!!name && name !== nameCn && (
                      <Katakana
                        type='sub'
                        size={11}
                        lineHeight={15}
                        numberOfLines={1}
                      >
                        {' '}
                        {HTMLDecode(name)}
                      </Katakana>
                    )}
                  </Katakana.Provider>
                )}
              </Flex.Item>
              <Flex style={_.mt.xxs}>
                {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />}
                {!!type && (
                  <Tag
                    style={_.ml.sm}
                    value={MODEL_SUBJECT_TYPE.getTitle(type)}
                  />
                )}
              </Flex>
            </Flex>
            {!!tip && (
              <Text style={_.mt.sm} size={11} numberOfLines={2}>
                {HTMLDecode(tip)}
              </Text>
            )}
            {!!position.length && (
              <Flex style={_.mt.sm} wrap='wrap'>
                {position.map(item => (
                  <Tag key={item} style={_.mr.sm} value={item} />
                ))}
              </Flex>
            )}
            <Flex style={_.mt.md}>
              <Stars style={_.mr.xs} value={score} color='warning' />
              <Text style={_.mr.sm} type='sub' size={12}>
                {total}
              </Text>
              {!!rank && (
                <Text type='primary' size={12} bold>
                  #{rank}{' '}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

ItemSearch.defaultProps = {
  event: EVENT
}

export default observer(ItemSearch)

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
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    height: IMG_HEIGHT
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  }
}))
