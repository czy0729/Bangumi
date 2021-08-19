/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-19 13:56:20
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { memo, ob } from '@utils/decorators'
import { EVENT, DEV } from '@constants'
import { Tag, Cover, Stars, Rank } from '../base'

const hitSlop = {
  top: _.device(2, 4),
  right: _.device(4, 4),
  bottom: _.device(10, 4),
  left: _.device(4, 4)
}
const defaultProps = {
  navigation: {},
  style: {},
  num: 3,
  id: 0,
  name: '',
  nameCn: '',
  cover: '',
  score: '',
  rank: '',
  typeCn: '',
  collection: '',
  aid: '',
  wid: '',
  mid: '',
  textOnly: DEV,
  isCollect: false,
  event: EVENT
}

const Item = memo(
  ({
    navigation,
    style,
    num,
    id,
    name,
    nameCn,
    cover,
    score,
    rank,
    typeCn,
    collection,
    aid,
    wid,
    mid,
    textOnly,
    isCollect,
    event
  }) => {
    rerender('Component.ItemCollectionsGrid.Main')

    const gridStyles = _.grid(num)
    const _collection = collection || (isCollect ? '已收藏' : '')
    const onPress = () => {
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
        _image: cover,
        _aid: aid,
        _wid: wid,
        _mid: mid,
        _type: typeCn
      })
    }

    return (
      <View
        style={[
          {
            width: gridStyles.width,
            marginBottom: gridStyles.marginLeft + _.xs,
            marginLeft: gridStyles.marginLeft
          },
          style
        ]}
      >
        <Cover
          style={styles.cover}
          size={gridStyles.width}
          height={gridStyles.height}
          src={cover}
          radius
          shadow
          type={typeCn}
          textOnly={textOnly}
          onPress={onPress}
        />
        {!!_collection && <Tag style={styles.collection} value={_collection} />}
        <Touchable withoutFeedback hitSlop={hitSlop} onPress={onPress}>
          <Text
            style={_.mt.sm}
            size={11}
            lineHeight={13}
            numberOfLines={3}
            bold
            align='center'
          >
            {HTMLDecode(nameCn || name)}
          </Text>
          {!!score && (
            <Flex style={_.mt.xs} justify='center'>
              <Rank style={_.mr.xs} value={rank} size={9} />
              <Stars value={score} color='warning' size={9} />
            </Flex>
          )}
        </Touchable>
      </View>
    )
  },
  defaultProps
)

export const ItemCollectionsGrid = ob(
  ({
    navigation,
    style,
    num,
    id,
    name,
    nameCn,
    cover,
    score,
    rank,
    typeCn,
    collection,
    aid,
    wid,
    mid,
    textOnly,
    isCollect,
    event
  }) => {
    rerender('Component.ItemCollectionsGrid')

    return (
      <Item
        navigation={navigation}
        style={style}
        num={num}
        id={id}
        name={name}
        nameCn={nameCn}
        cover={cover}
        score={score}
        rank={rank}
        typeCn={typeCn}
        collection={collection}
        aid={aid}
        wid={wid}
        mid={mid}
        textOnly={textOnly}
        isCollect={isCollect}
        event={event}
      />
    )
  }
)

const styles = _.create({
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: _.xs,
    left: _.xs
  }
})
