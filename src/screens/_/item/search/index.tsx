/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 15:19:01
 */
import React from 'react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { _ } from '@stores'
import { cnjp, appNavigate, x18 } from '@utils'
import { memo, ob } from '@utils/decorators'
import { EVENT, IMG_WIDTH_LG, IMG_HEIGHT_LG, MODEL_SUBJECT_TYPE } from '@constants'
import { Tag, Cover, Stars, Rank } from '../../base'
import { memoStyles } from './styles'

const defaultProps = {
  navigation: {},
  styles: {},
  style: {},
  id: '',
  name: '',
  nameCn: '',
  cover: '',
  type: '',
  typeCn: '',
  tip: '',
  rank: '',
  score: '',
  total: '',
  comments: '',
  collection: '', // 动画才有, 具体收藏状态
  collected: false, // 是否收藏
  position: [],
  event: EVENT
}

const Item = memo(
  ({
    navigation,
    styles,
    style,
    id,
    name,
    nameCn,
    cover,
    type,
    typeCn,
    tip,
    rank,
    score,
    total,
    comments,
    collection,
    collected,
    position,
    event
  }) => {
    global.rerender('Component.ItemSearch.Main')

    const top = cnjp(nameCn, name)
    const bottom = cnjp(name, nameCn)

    // 人物高清图不是正方形的图, 所以要特殊处理
    const isMono = !id.includes('/subject/')
    const isMusic = typeCn === '音乐'
    const _collection = collection || (collected ? '已收藏' : '')
    const justify = tip || position.length ? 'between' : 'start'
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
              _image: cover,
              _type: typeCn,
              _collection: collection
            },
            event
          )
        }}
      >
        <Flex align='start' style={styles.wrap}>
          <Cover
            style={styles.image}
            src={cover}
            placeholder={!isMono}
            width={IMG_WIDTH_LG}
            height={isMono ? IMG_WIDTH_LG : IMG_HEIGHT_LG}
            radius
            shadow
            type={typeCn}
          />
          <Flex
            style={[
              styles.content,
              !!comments && styles.flux,
              isMusic && styles.musicContent
            ]}
            direction='column'
            justify={justify}
            align='start'
          >
            <Flex align='start' style={_.container.w100}>
              <Flex.Item>
                {!!(top || bottom) && (
                  <Katakana.Provider size={15} numberOfLines={2}>
                    <Katakana size={15} bold>
                      {top || bottom}
                    </Katakana>
                    {!!comments && (
                      <Text type='main' lineHeight={15}>
                        {' '}
                        {comments}
                      </Text>
                    )}
                  </Katakana.Provider>
                )}
                {!!bottom && bottom !== top && (
                  <Katakana type='sub' size={12} lineHeight={15} numberOfLines={1}>
                    {bottom}
                  </Katakana>
                )}
              </Flex.Item>
              <Flex style={_.mt.xxs}>
                {!!_collection && <Tag style={_.ml.sm} value={_collection} />}
                {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />}
                {!!type && (
                  <Tag style={_.ml.sm} value={MODEL_SUBJECT_TYPE.getTitle(type)} />
                )}
              </Flex>
            </Flex>
            {!!tip && (
              <Text style={_.mt.sm} size={11} lineHeight={13} numberOfLines={3}>
                {tip}
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
      </Touchable>
    )
  },
  defaultProps
)

export const ItemSearch = ob(
  ({
    navigation,
    style,
    id,
    name,
    nameCn,
    cover,
    type,
    typeCn,
    tip,
    rank,
    score,
    total,
    comments,
    collection,
    collected,
    position,
    event
  }) => {
    global.rerender('Component.ItemSearch')

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        style={style}
        id={id}
        name={name}
        nameCn={nameCn}
        cover={cover}
        type={type}
        typeCn={typeCn}
        tip={tip}
        rank={rank}
        score={score}
        total={total}
        comments={comments}
        collection={collection}
        collected={collected}
        position={position}
        event={event}
      />
    )
  }
)
