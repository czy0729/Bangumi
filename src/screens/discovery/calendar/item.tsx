/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 16:02:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { Cover, Stars } from '@_'
import { _, systemStore, collectionStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

const hitSlop = {
  top: _.device(2, 4),
  right: _.device(4, 4),
  bottom: _.device(10, 4),
  left: _.device(4, 4)
}
const defaultProps = {
  navigation: {},
  styles: {},
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
    styles,
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
    global.rerender('Calendar.Item.Main')

    const showScore = !hideScore && !!score

    let middle: any = []
    if (!!timeCN && timeCN !== '2359') {
      middle.push(`${timeCN.slice(0, 2)}:${timeCN.slice(2)}`)
    }
    if (collection) middle.push(collection)
    middle = middle.join(' · ')

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

    return (
      <View style={[styles.item, style]}>
        <Cover
          width={styles.cover.width}
          height={styles.cover.height}
          src={images.medium}
          radius
          shadow
          onPress={onPress}
        />
        <Touchable style={_.mt.sm} hitSlop={hitSlop} withoutFeedback onPress={onPress}>
          <Text size={13} lineHeight={15} numberOfLines={2} bold>
            {HTMLDecode(name)}
          </Text>
          {!!middle && (
            <Text style={_.mt.xs} size={11} lineHeight={12} type='sub' bold>
              {middle}
            </Text>
          )}
          <Flex style={_.mt.sm}>
            {!!air && (
              <Text style={_.mr.xs} size={11} bold>
                第{air}话
              </Text>
            )}
            {showScore && <Stars value={score} simple />}
          </Flex>
        </Touchable>
      </View>
    )
  },
  defaultProps
)

export default obc(
  ({ style, subjectId, name, images, score, timeCN }, { $, navigation }) => {
    global.rerender('Calendar.Item')

    const { type } = $.state
    const collection = collectionStore.collectionStatus(subjectId)
    if (type === 'collect' && !collection) return null

    const { air, timeCN: onAirTimeCN } = $.onAir[subjectId] || {}
    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
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

const memoStyles = _.memoStyles(() => {
  const gridStyles = _.grid()
  return {
    item: {
      width: gridStyles.width,
      marginLeft: gridStyles.marginLeft,
      marginBottom: _.md
    },
    cover: {
      width: gridStyles.width,
      height: gridStyles.height
    }
  }
})
