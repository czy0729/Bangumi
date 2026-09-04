/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:10:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-30 00:08:14
 */
import React, { useMemo } from 'react'
import { Component, Cover, Flex, Link, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { cnjp, getSubjectId, getVisualLength, stl } from '@utils'
import { memo } from '@utils/decorators'
import { EVENT } from '@constants'
import { InView, Rank, Stars } from '../../base'
import Collection from './collection'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

import type { CollectionStatusCn, SubjectTypeCn } from '@types'

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
    y,
    event = EVENT
  }) => {
    const subjectId = getSubjectId(id)

    const { width } = gridStyles
    const height = isRectangle ? width : gridStyles.height
    const elCover = useMemo(
      () => <Cover size={width} height={height} src={cover} radius type={typeCn} cdn={cdn} />,
      [cdn, cover, height, typeCn, width]
    )

    const text = cnjp(nameCn, name)

    // getVisualLength 逐字符正则, 网格上百格全量重算很贵, 只依赖文本
    const textSize = useMemo(() => {
      const visualLength = getVisualLength(text)
      return visualLength >= 32 ? 10 : visualLength >= 20 ? 11 : 12
    }, [text])

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
          {y !== undefined ? (
            <InView
              style={{
                minWidth: width,
                minHeight: height
              }}
              y={y}
            >
              {elCover}
            </InView>
          ) : (
            elCover
          )}

          <Text
            style={_.mt.sm}
            size={textSize}
            lineHeight={13}
            numberOfLines={4}
            bold
            align='center'
          >
            {text}
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
