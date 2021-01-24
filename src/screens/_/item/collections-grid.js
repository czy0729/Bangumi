/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-24 20:35:42
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Tag from '../base/tag'
import Cover from '../base/cover'
import Stars from '../base/stars'

function CollectionsGrid({
  style,
  navigation,
  event,
  id,
  cover,
  name,
  nameCn,
  score,
  isCollect,
  collection,
  typeCn,
  num,
  aid,
  wid,
  mid
}) {
  const imageWidth = _.window.contentWidth * ((1 / num) * 0.84)
  const imageHeight = imageWidth * 1.4
  const marginLeft = (_.window.contentWidth - num * imageWidth) / (num + 1)
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
      _mid: mid
    })
  }

  const _collection = collection || (isCollect ? '已收藏' : '')
  return (
    <View
      style={[
        {
          width: imageWidth,
          marginBottom: marginLeft + _.xs,
          marginLeft
        },
        style
      ]}
    >
      <Cover
        size={imageWidth}
        height={imageHeight}
        src={cover}
        radius
        shadow
        type={typeCn}
        onPress={onPress}
      />
      {!!_collection && <Tag style={styles.collection} value={_collection} />}
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={11} numberOfLines={3} bold align='center'>
          {HTMLDecode(nameCn || name)}
        </Text>
        {!!score && (
          <Flex style={_.mt.xs} justify='center'>
            <Stars value={score} color='warning' size={10} />
          </Flex>
        )}
      </Touchable>
    </View>
  )
}

CollectionsGrid.defaultProps = {
  event: EVENT,
  num: 3
}

export default observer(CollectionsGrid)

const styles = StyleSheet.create({
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: _.xs,
    left: _.xs
  }
})
