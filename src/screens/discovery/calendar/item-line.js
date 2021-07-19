/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-19 19:29:55
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text } from '@components'
import { Cover, Tag, Stars } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT, COLLECTION_INDENT } from '@constants'

function ItemLine(
  { subjectId, images = {}, name, air, timeCN, score },
  { $, navigation }
) {
  const { type, expand } = $.state
  const collection = $.userCollectionsMap[subjectId]
  if ((type === 'collect' && !collection) || (!expand && !timeCN)) {
    return null
  }

  const indent = collection ? COLLECTION_INDENT : ''
  const showScore = !systemStore.setting.hideScore && !!score
  return (
    <Touchable
      style={styles.item}
      onPress={() => {
        t('每日放送.跳转', {
          to: 'Subject',
          subjectId
        })

        navigation.push('Subject', {
          subjectId,
          _cn: name,
          _image: images.medium
        })
      }}
    >
      <Flex align='start'>
        <View style={styles.time}>
          {!!timeCN && (
            <Text align='center' bold>
              {timeCN === '2359'
                ? '待定'
                : `${timeCN.slice(0, 2)}:${timeCN.slice(2)}`}
            </Text>
          )}
          {timeCN === '2359' && (
            <Touchable style={_.mt.sm} onPress={$.toggleExpand}>
              <Text type='sub' align='center'>
                {expand ? '隐藏' : '展开'}
              </Text>
            </Touchable>
          )}
        </View>
        {(expand || (!expand && timeCN && timeCN !== '2359')) && (
          <>
            <View style={styles.image}>
              <Cover
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                src={images.medium}
                radius
                shadow
              />
            </View>
            <Flex.Item style={_.ml.md}>
              <Flex
                style={styles.body}
                direction='column'
                justify='between'
                align='start'
              >
                {!!collection && (
                  <Tag style={styles.collection} value={collection} />
                )}
                <Katakana.Provider
                  itemStyle={styles.katakanas}
                  size={13}
                  numberOfLines={2}
                >
                  <Katakana type='desc' size={13} numberOfLines={2} bold>
                    {indent}
                    {HTMLDecode(name)}
                  </Katakana>
                </Katakana.Provider>
                <Flex>
                  {!!air && (
                    <Text style={_.mr.sm} type='main' size={13} bold>
                      第{air}话
                    </Text>
                  )}
                  {showScore && (
                    <Stars simple value={score} type='desc' size={13} />
                  )}
                </Flex>
              </Flex>
            </Flex.Item>
          </>
        )}
      </Flex>
    </Touchable>
  )
}

export default obc(ItemLine)

const styles = _.create({
  item: {
    width: '100%',
    paddingVertical: 12
  },
  time: {
    width: 72 * _.ratio,
    marginTop: 3
  },
  image: {
    width: IMG_WIDTH
  },
  body: {
    width: '100%',
    height: IMG_HEIGHT - 6,
    paddingTop: _.xs,
    paddingRight: _.wind
  },
  katakanas: {
    marginTop: -10
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 4.5 * _.ratio,
    left: 0
  }
})
