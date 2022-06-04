/*
 * @Author: czy0729
 * @Date: 2020-04-10 16:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 01:42:58
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text } from '@components'
import { Cover, Tag, Stars } from '@_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { IMG_WIDTH_SM, IMG_HEIGHT_SM } from '@constants'

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
    global.rerender('Calendar.ItemLine.Main')

    const showScore = !hideScore && !!score
    const canPress = expand || (!expand && timeCN && timeCN !== '2359')
    const content = (
      <Flex style={styles.item} align='start'>
        <View style={styles.time}>
          {!!(timeCN && !(timeCN === '2359' && !expand)) && (
            <Text bold>
              {timeCN === '2359' ? '未知' : `${timeCN.slice(0, 2)}:${timeCN.slice(2)}`}
            </Text>
          )}
          {timeCN === '2359' && (
            <Touchable
              style={styles.undetermined}
              withoutFeedback
              onPress={onToggleExpand}
            >
              <Text type='sub'>{expand ? '收起' : '展开'}</Text>
            </Touchable>
          )}
        </View>
        {canPress && (
          <>
            <View style={styles.image}>
              <Cover
                width={IMG_WIDTH_SM}
                height={IMG_HEIGHT_SM}
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
                <View style={_.container.block}>
                  <Flex align='start'>
                    <Flex.Item>
                      <Katakana.Provider
                        itemStyle={styles.katakanas}
                        size={14}
                        lineHeight={15}
                        numberOfLines={3}
                      >
                        <Katakana
                          type='desc'
                          size={14}
                          lineHeight={15}
                          numberOfLines={3}
                          bold
                        >
                          {HTMLDecode(name)}
                        </Katakana>
                      </Katakana.Provider>
                    </Flex.Item>
                  </Flex>
                  {!!collection && (
                    <Flex style={_.mt.sm}>
                      <Tag value={collection} />
                    </Flex>
                  )}
                </View>
                <Flex>
                  {!!air && (
                    <Text style={_.mr.sm} type='sub' size={13} bold>
                      更新至第{air}话
                    </Text>
                  )}
                  {showScore && <Stars simple value={score} type='desc' size={13} />}
                </Flex>
              </Flex>
            </Flex.Item>
          </>
        )}
      </Flex>
    )

    if (canPress) {
      return (
        <View style={_.container.block}>
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
            {content}
          </Touchable>
        </View>
      )
    }

    return <View style={_.container.block}>{content}</View>
  },
  defaultProps
)

export default obc(
  ({ subjectId, images = {}, name, air, timeCN, score }, { $, navigation }) => {
    global.rerender('Calendar.ItemLine')

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
        onToggleExpand={$.onToggleExpand}
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
    width: IMG_WIDTH_SM
  },
  body: {
    width: '100%',
    height: IMG_HEIGHT_SM - 4,
    paddingTop: 2,
    paddingRight: _.wind
  },
  katakanas: {
    marginTop: -10
  },
  undetermined: {
    zIndex: 1,
    paddingVertical: _.sm
  }
}))
