/*
 * @Author: czy0729
 * @Date: 2022-07-25 23:12:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-03 12:50:57
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text } from '@components'
import { Cover, Stars, Manage } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { DEFAULT_PROPS } from './ds'

const ItemLine = memo(
  ({
    navigation,
    styles,
    hideScore,
    subjectId,
    name,
    desc,
    images,
    air,
    timeCN,
    expand,
    collection,
    score,
    sites,
    onToggleExpand,
    onShowManageModal
  }) => {
    global.rerender('Calendar.ItemLine.Main')

    const showScore = !hideScore && !!score
    const canPress = expand || (!expand && timeCN && timeCN !== '2359')

    const s = []
    if (sites.b) s.push('bilibili')
    if (!sites.b && sites.bhmt) s.push('bilibili 港澳台')
    if (sites.i) s.push('爱奇艺')
    if (sites.q) s.push('腾讯视频')

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
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                src={images?.medium}
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
                        lineHeight={15}
                        numberOfLines={3}
                      >
                        <Katakana type='desc' lineHeight={15} numberOfLines={3} bold>
                          {HTMLDecode(name)}
                        </Katakana>
                      </Katakana.Provider>
                    </Flex.Item>
                  </Flex>
                </View>
                {!!s.length && (
                  <Text type='sub' size={13} bold>
                    {s.join('、')}
                  </Text>
                )}
                <Flex>
                  {!!air && (
                    <Text style={_.mr.sm} type='sub' size={13} bold>
                      至第{air}话
                    </Text>
                  )}
                  {showScore && <Stars simple value={score} type='desc' size={13} />}
                </Flex>
              </Flex>
            </Flex.Item>
            <Manage
              style={_.mt.z}
              collection={collection}
              onPress={() => {
                onShowManageModal({
                  subjectId,
                  title: HTMLDecode(name),
                  desc
                })
              }}
            />
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
                _image: images?.medium
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
  DEFAULT_PROPS
)

export default ItemLine
