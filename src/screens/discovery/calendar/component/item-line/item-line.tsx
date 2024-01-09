/*
 * @Author: czy0729
 * @Date: 2022-07-25 23:12:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:00:21
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Katakana, Text, Touchable } from '@components'
import { InView, Manage, Rank, Stars } from '@_'
import { _, uiStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const SECTION_HEIGHT = _.window.height * 0.64

const ItemLine = memo(
  ({
    navigation,
    section,
    index,
    styles,
    hideScore,
    subjectId,
    name,
    desc,
    image,
    air,
    time,
    prevTime,
    expand,
    collection,
    rank,
    score,
    total,
    sites,
    onToggleExpand
  }) => {
    const { minWidth: width, minHeight: height } = styles.inView
    const title = HTMLDecode(name)
    const size = title.length >= 20 ? 12 : title.length >= 14 ? 13 : 14

    const showScore = !hideScore && !!score
    const canPress = expand || (!expand && time && time !== '2359')

    const s = []
    if (sites.b) s.push('bilibili')
    if (!sites.b && sites.bhmt) s.push('bilibili 港澳台')
    if (sites.i) s.push('爱奇艺')
    if (sites.q) s.push('腾讯视频')

    return (
      <View style={_.container.block}>
        <Flex style={styles.item} align='start'>
          <View style={stl(styles.time, prevTime && prevTime === time && styles.transparent)}>
            {!!(time && !(time === '2359' && !expand)) && (
              <Text bold>{time === '2359' ? '未知' : `${time.slice(0, 2)}:${time.slice(2)}`}</Text>
            )}
            {time === '2359' && (
              <Touchable style={styles.undetermined} withoutFeedback onPress={onToggleExpand}>
                <Text type='sub'>{expand ? '收起' : '展开'}</Text>
              </Touchable>
            )}
          </View>
          {canPress && (
            <>
              <InView style={styles.inView} y={SECTION_HEIGHT * section + height * index + 1}>
                <Touchable
                  onPress={() => {
                    t('每日放送.跳转', {
                      to: 'Subject',
                      subjectId
                    })

                    navigation.push('Subject', {
                      subjectId,
                      _cn: name,
                      _image: image
                    })
                  }}
                >
                  <Cover width={width} height={height} src={image} radius />
                </Touchable>
              </InView>
              <Flex.Item style={_.ml.md}>
                <Flex style={styles.body} direction='column' justify='between' align='start'>
                  <View style={_.container.block}>
                    <Flex align='start'>
                      <Flex.Item>
                        <Katakana.Provider
                          itemStyle={styles.katakanas}
                          size={size}
                          numberOfLines={3}
                          bold
                        >
                          <Katakana type='desc' size={size} numberOfLines={3} bold>
                            {title}
                          </Katakana>
                        </Katakana.Provider>
                      </Flex.Item>
                    </Flex>
                  </View>
                  {!!air ? (
                    <Text type='sub' size={12} bold>
                      至第 {air} 话 {s.length ? ` · ${s.join('、')}` : ''}
                    </Text>
                  ) : s.length ? (
                    <Text type='sub' size={12} bold>
                      {s.join('、')}
                    </Text>
                  ) : null}
                  <Flex>
                    {showScore && (
                      <>
                        <Rank value={rank} />
                        <Stars style={_.mr.xs} simple value={score} type='desc' size={12} />
                        {!!total && (
                          <Text type='sub' size={12} bold>
                            ({total})
                          </Text>
                        )}
                      </>
                    )}
                  </Flex>
                </Flex>
              </Flex.Item>
              <Manage
                subjectId={subjectId}
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId,
                      title: HTMLDecode(name),
                      desc,
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '每日放送'
                  )
                }}
              />
            </>
          )}
        </Flex>
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ItemLine
