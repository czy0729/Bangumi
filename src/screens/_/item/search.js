/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-14 15:48:46
 */
import React from 'react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, x18 } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { ob } from '@utils/decorators'
import { EVENT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { Tag, Cover, Stars, Rank } from '../base'

export const ItemSearch = ob(
  ({
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
    typeCn,
    collection, // 动画才有, 具体收藏状态
    collected, // 是否收藏
    comments,
    position = [],
    event = EVENT,
    children
  }) => {
    const styles = memoStyles()

    // 人物高清图不是正方形的图, 所以要特殊处理
    const isMono = !id.includes('/subject/')
    const isFirst = index === 0
    const _collection = collection || (collected ? '已收藏' : '')
    return (
      <Touchable
        style={[styles.container, style]}
        onPress={() =>
          appNavigate(
            id,
            navigation,
            {
              _jp: name,
              _cn: nameCn,
              _image: cover,
              _type: typeCn
            },
            event
          )
        }
      >
        <Flex
          align='start'
          style={[styles.wrap, !isFirst && !_.flat && styles.border]}
        >
          <Cover
            style={styles.image}
            src={cover}
            placeholder={!isMono}
            width={IMG_WIDTH}
            height={isMono ? IMG_WIDTH : IMG_HEIGHT}
            radius
            shadow
            type={typeCn}
          />
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={_.container.w100}>
              <Flex.Item>
                {!!(nameCn || name) && (
                  <Katakana.Provider size={15} numberOfLines={2}>
                    <Katakana size={15} bold>
                      {HTMLDecode(nameCn || name)}
                    </Katakana>
                    {!!comments && (
                      <Text type='main' lineHeight={15}>
                        {' '}
                        {comments}
                      </Text>
                    )}
                  </Katakana.Provider>
                )}
                {!!name && name !== nameCn && (
                  <Katakana
                    type='sub'
                    size={12}
                    lineHeight={15}
                    numberOfLines={1}
                  >
                    {HTMLDecode(name)}
                  </Katakana>
                )}
              </Flex.Item>
              <Flex style={_.mt.xxs}>
                {!!_collection && <Tag style={_.ml.sm} value={_collection} />}
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
              <Rank value={rank} />
              <Stars value={score} color='warning' />
              <Text style={_.ml.xxs} type='sub' size={11}>
                {total}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {children}
      </Touchable>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
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
    flex: 1,
    minHeight: IMG_HEIGHT,
    marginLeft: _._wind
  }
}))
