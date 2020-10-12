/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-12 19:43:44
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Tag from '../base/tag'
import Cover from '../base/cover'

const imageWidth = _.window.contentWidth * 0.2
const marginLeft = (_.window.contentWidth - 4 * imageWidth) / 5

function CollectionsGrid({
  style,
  navigation,
  event,
  id,
  cover,
  name,
  nameCn,
  time,
  score,
  showScore,
  isCollect,
  collection,
  isOnHold,
  typeCn
}) {
  let holdDays
  if (isOnHold) {
    holdDays = Math.ceil((getTimestamp() - getTimestamp(time)) / 86400)
  }
  const onPress = () => {
    const { id: eventId, eventData } = event
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
        src={cover}
        radius
        shadow
        type={typeCn}
        onPress={onPress}
      />
      {!!_collection && <Tag style={styles.collection} value={_collection} />}
      <Touchable withoutFeedback onPress={onPress}>
        <Text style={_.mt.sm} size={12} numberOfLines={2} bold>
          {showScore && score && (
            <Text size={12} type='warning' bold>
              {score}{' '}
            </Text>
          )}
          {HTMLDecode(nameCn || name)}
        </Text>
        {!!holdDays && (
          <Text style={_.mt.xs} size={12} type='sub'>
            搁置{holdDays}天
          </Text>
        )}
      </Touchable>
    </View>
  )
}

CollectionsGrid.defaultProps = {
  event: EVENT,
  showScore: false
}

export default observer(CollectionsGrid)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginLeft,
    marginBottom: _.sm
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: _.xs,
    left: _.xs
  }
})
