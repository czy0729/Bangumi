/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-02 18:37:26
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

const gridNum = 3
const imageWidth = _.window.contentWidth * ((1 / gridNum) * 0.86)
const imageHeight = imageWidth * 1.4
const marginLeft =
  (_.window.contentWidth - gridNum * imageWidth) / (gridNum + 1)

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
  typeCn
}) {
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
      _image: cover
    })
  }

  const _collection = collection || (isCollect ? '已收藏' : '')
  return (
    <View style={[styles.item, style]}>
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
        <Text style={_.mt.sm} size={12} numberOfLines={3} bold align='center'>
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
  event: EVENT
}

export default observer(CollectionsGrid)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginBottom: marginLeft - _.sm + _.xs,
    marginLeft,
    marginTop: _.sm
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: _.xs,
    left: _.xs
  }
})
