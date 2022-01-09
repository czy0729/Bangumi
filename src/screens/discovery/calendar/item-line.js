/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-08 07:55:20
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text } from '@components'
import { Cover, Tag, Stars } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

const imgWidth = parseInt(IMG_WIDTH * 1.28)
const imgHeight = parseInt(IMG_HEIGHT * 1.28)

const defaultProps = {
  navigation: {},
  styles: {},
  hideScore: false,
  subjectId: 0,
  name: '',
  images: {},
  air: '',
  timeCN: '2359',
  expand: false,
  collection: undefined,
  onToggleExpand: Function.prototype
}

const ItemLine = memo(
  ({
    navigation,
    styles,
    hideScore,
    subjectId,
    name,
    images,
    air,
    timeCN,
    expand,
    collection,
    score,
    onToggleExpand
  }) => {
    rerender('Calendar.ItemLine.Main')

    const showScore = !hideScore && !!score
    return (
      <View style={styles.item}>
        <Touchable
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
                <Text bold>
                  {timeCN === '2359'
                    ? '待定'
                    : `${timeCN.slice(0, 2)}:${timeCN.slice(2)}`}
                </Text>
              )}
              {timeCN === '2359' && (
                <Touchable style={_.mt.sm} onPress={onToggleExpand}>
                  <Text type='sub'>{expand ? '隐藏' : '展开'}</Text>
                </Touchable>
              )}
            </View>
            {(expand || (!expand && timeCN && timeCN !== '2359')) && (
              <>
                <View style={styles.image}>
                  <Cover
                    width={imgWidth}
                    height={imgHeight}
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
                    <Flex align='start'>
                      <Flex.Item>
                        <Katakana.Provider
                          itemStyle={styles.katakanas}
                          size={15}
                          lineHeight={16}
                          numberOfLines={3}
                        >
                          <Katakana
                            type='desc'
                            size={15}
                            lineHeight={16}
                            numberOfLines={3}
                            bold
                          >
                            {HTMLDecode(name)}
                          </Katakana>
                        </Katakana.Provider>
                      </Flex.Item>
                      {!!collection && <Tag style={_.mt.xxs} value={collection} />}
                    </Flex>
                    <Flex>
                      {!!air && (
                        <Text style={_.mr.sm} type='sub' size={14} bold>
                          更新至第{air}话
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
      </View>
    )
  },
  defaultProps
)

export default obc(
  ({ subjectId, images = {}, name, air, timeCN, score }, { $, navigation }) => {
    rerender('Calendar.ItemLine')

    const { type, expand } = $.state
    const collection = $.userCollectionsMap[subjectId]
    if ((type === 'collect' && !collection) || (!expand && !timeCN)) return null

    return (
      <ItemLine
        navigation={navigation}
        styles={memoStyles()}
        hideScore={systemStore.setting.hideScore}
        subjectId={subjectId}
        name={name}
        images={images}
        air={air}
        timeCN={timeCN}
        expand={expand}
        collection={collection}
        score={score}
        onToggleExpand={$.toggleExpand}
      />
    )
  }
)

const memoStyles = _.memoStyles(() => ({
  item: {
    width: '100%',
    paddingVertical: 12
  },
  time: {
    width: 72 * _.ratio,
    paddingLeft: _._wind,
    marginTop: 2
  },
  image: {
    width: imgWidth
  },
  body: {
    width: '100%',
    height: imgHeight - 4,
    paddingTop: 2,
    paddingRight: _.wind
  },
  katakanas: {
    marginTop: -10
  }
}))
