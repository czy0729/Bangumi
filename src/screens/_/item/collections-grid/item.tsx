/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:10:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 15:53:02
 */
import React from 'react'
import { Component, Cover, Flex, Link, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { cnjp, stl } from '@utils'
import { memo } from '@utils/decorators'
import { EVENT } from '@constants'
import { CollectionStatusCn, SubjectId, SubjectTypeCn } from '@types'
import { Rank, Stars } from '../../base'
import Collection from './collection'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

const Item = memo(
  ({
    style,
    gridStyles,
    id = 0,
    name = '',
    nameCn = '',
    sub = '',
    cover = '',
    cdn = true,
    score = '',
    rank = '',
    typeCn,
    collection = '',
    userCollection = '',
    airtime = '',
    aid = '',
    wid = '',
    mid = '',
    isRectangle = false,
    hideScore,
    event = EVENT
  }) => {
    const { width } = gridStyles
    const subjectId = String(id).replace('/subject/', '') as SubjectId

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
        <Link
          path='Subject'
          getParams={() => ({
            subjectId,
            _jp: name,
            _cn: nameCn,
            _image: getCoverSrc(cover, width),
            _aid: aid,
            _wid: wid,
            _mid: mid,
            _type: typeCn as SubjectTypeCn,
            _collection: (collection || userCollection) as CollectionStatusCn
          })}
          eventId={event.id}
          getEventData={() => ({
            to: 'Subject',
            subjectId,
            type: 'grid',
            ...event.data
          })}
          hitSlop={HIT_SLOP}
        >
          <Cover
            size={width}
            height={isRectangle ? width : gridStyles.height}
            src={cover}
            radius
            type={typeCn}
            cdn={cdn}
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
              <Stars value={score} size={9} hideScore={hideScore} />
            </Flex>
          )}
        </Link>
      </Component>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
