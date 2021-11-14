/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-14 17:58:56
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { Cover, Tag, Stars } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { COLLECTION_INDENT } from '@constants'

const gridStyles = _.grid()
const hitSlop = {
  top: _.device(2, 4),
  right: _.device(4, 4),
  bottom: _.device(10, 4),
  left: _.device(4, 4)
}
const defaultProps = {
  navigation: {},
  hideScore: false,
  style: {},
  subjectId: 0,
  name: '',
  images: {},
  score: '',
  collection: '',
  air: '',
  timeCN: '2359'
}

const Item = memo(
  ({
    navigation,
    hideScore,
    style,
    subjectId,
    name,
    images,
    score,
    collection,
    air,
    timeCN
  }) => {
    rerender('Calendar.Item.Main')

    const onPress = () => {
      t('每日放送.跳转', {
        to: 'Subject',
        subjectId
      })

      navigation.push('Subject', {
        subjectId,
        _cn: name,
        _image: images.medium
      })
    }

    const showScore = !hideScore && !!score
    const indent = collection ? COLLECTION_INDENT : ''
    return (
      <View style={[styles.item, style]}>
        <View>
          <Cover
            style={styles.cover}
            width={gridStyles.width}
            height={gridStyles.height}
            src={images.medium}
            radius
            shadow
            onPress={onPress}
          />
          {!!timeCN && timeCN !== '2359' && (
            <View style={styles.time} pointerEvents='none'>
              <Text style={styles.timeText} size={12} bold>
                {' '}
                {timeCN.slice(0, 2)}:{timeCN.slice(2)}{' '}
              </Text>
            </View>
          )}
        </View>
        <Touchable style={_.mt.sm} withoutFeedback hitSlop={hitSlop} onPress={onPress}>
          {!!collection && <Tag style={styles.collection} value={collection} />}
          <Text size={12} bold lineHeight={14} numberOfLines={2}>
            {indent}
            {HTMLDecode(name)}
          </Text>
          <Flex style={_.mt.xs}>
            {!!air && (
              <Text style={_.mr.xs} size={11} type='sub' bold>
                更新至第{air}话
              </Text>
            )}
            {showScore && <Stars simple value={score} />}
          </Flex>
        </Touchable>
      </View>
    )
  },
  defaultProps
)

export default obc(
  ({ style, subjectId, name, images, score, timeCN }, { $, navigation }) => {
    rerender('Calendar.Item')

    const { type } = $.state
    const collection = $.userCollectionsMap[subjectId]
    if (type === 'collect' && !collection) return null

    const { air, timeCN: onAirTimeCN } = $.onAir[subjectId] || {}
    return (
      <Item
        navigation={navigation}
        hideScore={systemStore.setting.hideScore}
        style={style}
        subjectId={subjectId}
        name={name}
        images={images}
        score={score}
        collection={collection}
        air={air}
        timeCN={onAirTimeCN || timeCN}
      />
    )
  }
)

const styles = _.create({
  item: {
    width: gridStyles.width,
    marginLeft: gridStyles.marginLeft,
    marginBottom: _.space
  },
  time: {
    position: 'absolute',
    zIndex: 1,
    top: _.sm,
    left: _.sm,
    padding: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    borderRadius: _.radiusXs
  },
  timeText: {
    color: _.__colorPlain__
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  },
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
