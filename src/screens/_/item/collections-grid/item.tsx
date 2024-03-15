/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:10:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-14 00:48:46
 */
import React from 'react'
import { Component, Flex, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { cnjp, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Cover, Rank, Stars } from '../../base'
import Collection from './collection'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

const Item = memo(
  ({
    navigation,
    style,
    gridStyles,
    id,
    name,
    nameCn,
    sub,
    cover,
    score,
    rank,
    typeCn,
    collection,
    userCollection,
    airtime,
    aid,
    wid,
    mid,
    isRectangle,
    event
  }) => {
    const { width } = gridStyles
    return (
      <Component
        id='item-collections-grid'
        data-key={id}
        style={stl(
          {
            width,
            marginBottom: gridStyles.marginLeft + _.xs,
            marginLeft: gridStyles.marginLeft
          },
          style
        )}
      >
        <Touchable
          animate
          hitSlop={HIT_SLOP}
          onPress={() => {
            const { id: eventId, data: eventData } = event
            const subjectId = String(id).replace('/subject/', '')
            t(eventId, {
              to: 'Subject',
              subjectId,
              type: 'grid',
              ...eventData
            })

            navigation.push('Subject', {
              subjectId,
              _jp: name,
              _cn: nameCn,
              _image: getCoverSrc(cover, width),
              _aid: aid,
              _wid: wid,
              _mid: mid,
              _type: typeCn,
              _collection: collection || userCollection
            })
          }}
        >
          <Cover
            size={width}
            height={isRectangle ? width : gridStyles.height}
            src={cover}
            radius
            shadow
            type={typeCn}
          />
          <Text style={_.mt.sm} size={12} lineHeight={13} numberOfLines={3} bold align='center'>
            {cnjp(nameCn, name)}
          </Text>
          <Collection collection={collection} typeCn={typeCn} airtime={airtime} />
          {!!sub && (
            <Text
              style={_.mt.xs}
              size={11}
              lineHeight={11}
              type='sub'
              align='center'
              bold
              numberOfLines={1}
            >
              {sub}
            </Text>
          )}
          {!!score && (
            <Flex style={_.mt.sm} justify='center'>
              <Rank style={_.mr.xs} value={rank} size={9} />
              <Stars value={score} size={9} />
            </Flex>
          )}
        </Touchable>
      </Component>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
