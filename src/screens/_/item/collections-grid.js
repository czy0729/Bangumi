/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-14 07:15:41
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { memo, ob } from '@utils/decorators'
import { EVENT } from '@constants'
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
  gridStyles: {},
  id: 0,
  name: '',
  nameCn: '',
  cover: '',
  score: '',
  rank: '',
  typeCn: '',
  collection: '',
  userCollection: '',
  aid: '',
  wid: '',
  mid: '',
  isCollect: false,
  event: EVENT
}

const Item = memo(
  ({
    navigation,
    style,
    gridStyles,
    id,
    name,
    nameCn,
    cover,
    score,
    rank,
    typeCn,
    collection,
    userCollection,
    aid,
    wid,
    mid,
    isCollect,
    event
  }) => {
    rerender('Component.ItemCollectionsGrid.Main')

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
        _type: typeCn,
        _collection: collection || userCollection
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
          size={gridStyles.width}
          height={gridStyles.height}
          src={cover}
          radius
          shadow
          type={typeCn}
          onPress={onPress}
        />
        {!!_collection && <Tag style={styles.collection} value={_collection} />}
        <Touchable style={_.mt.xs} withoutFeedback hitSlop={hitSlop} onPress={onPress}>
          <Text
            style={_.mt.sm}
            size={12}
            lineHeight={13}
            numberOfLines={3}
            bold
            align='center'
          >
            {HTMLDecode(cnjp(nameCn, name))}
          </Text>
          {!!score && (
            <Flex style={_.mt.sm} justify='center'>
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
    num = 3,
    id,
    name,
    nameCn,
    cover,
    score,
    rank,
    typeCn,
    collection,
    userCollection,
    aid,
    wid,
    mid,
    isCollect,
    event
  }) => {
    rerender('Component.ItemCollectionsGrid')

    return (
      <Item
        navigation={navigation}
        style={style}
        gridStyles={_.grid(num)}
        id={id}
        name={name}
        nameCn={nameCn}
        cover={cover}
        score={score}
        rank={rank}
        typeCn={typeCn}
        collection={collection}
        userCollection={userCollection}
        aid={aid}
        wid={wid}
        mid={mid}
        isCollect={isCollect}
        event={event}
      />
    )
  }
)

const styles = _.create({
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: _.xs,
    left: _.xs
  }
})
