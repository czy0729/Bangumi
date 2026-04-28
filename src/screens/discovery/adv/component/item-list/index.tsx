/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 05:47:14
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, HorizontalList, Image, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars } from '@_'
import { _, collectionStore, otaStore, uiStore } from '@stores'
import { formatPlaytime, HTMLDecode, showImageViewer, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import {
  HOST_BGM_STATIC,
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { getThumbs } from './utils'
import { COMPONENT, THUMB_HEIGHT, THUMB_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Props } from './types'

function Item({ index, pickIndex }: Props) {
  const navigation = useNavigation(COMPONENT)
  const styles = memoStyles()

  // --- Data Logic ---
  const subjectId = otaStore.advSubjectId(pickIndex)
  const adv = otaStore.adv(subjectId)
  const { id } = adv

  // --- Handlers ---
  const handlePress = useCallback(() => {
    const { title, cover } = adv
    const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT

    navigation.push('Subject', {
      subjectId: id,
      _cn: title,
      _image: getCoverSrc(image, IMG_WIDTH_LG),
      _type: '游戏'
    })

    t('ADV.跳转', { subjectId: id })
  }, [adv, id, navigation])

  const handleManagePress = useCallback(() => {
    const { title } = adv
    const collection = collectionStore.collect(id)

    uiStore.showManageModal(
      {
        subjectId: id,
        title,
        status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
        action: '玩'
      },
      '找游戏'
    )
  }, [adv, id])

  // --- Render ---
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const { title, cover, date, score, rank, total, length, dev, time, cn } = adv
  const titleText = HTMLDecode(title)
  const size = titleText.length >= 20 ? 13 : titleText.length >= 14 ? 14 : 15
  const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT
  const thumbs = getThumbs(id, length)
  const thumbs2 = getThumbs(id, length, false)

  const tipStr = [date, dev, formatPlaytime(time), cn ? '汉化' : '']
    .filter(item => !!item)
    .join(' / ')

  const collection = collectionStore.collect(id)

  return (
    <Touchable style={styles.container} animate onPress={handlePress}>
      <Flex style={styles.wrap} align='start'>
        <Cover src={image} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius cdn={!x18(id)} />
        <Flex style={styles.content} direction='column' align='start'>
          <View style={styles.body}>
            <Flex style={_.container.block} align='start'>
              <Flex.Item>
                <Text size={size} bold numberOfLines={3}>
                  {titleText}
                </Text>
                <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={5}>
                  {tipStr}
                </Text>
                <Flex style={_.mt.md} wrap='wrap'>
                  <Rank value={rank} />
                  <Stars style={_.mr.xs} value={score} simple />
                  {!!total && (
                    <Text style={_.mr.sm} type='sub' size={11} bold>
                      ({total})
                    </Text>
                  )}
                </Flex>
              </Flex.Item>
              <Manage
                subjectId={id}
                collection={collection}
                typeCn='游戏'
                onPress={handleManagePress}
              />
            </Flex>
          </View>

          {!!thumbs.length && (
            <View style={styles.thumbs}>
              <HorizontalList
                data={thumbs.filter((_, idx) => idx < 3)}
                renderItem={(item, idx) => (
                  <Image
                    style={stl(!!idx && _.ml.sm, idx === thumbs.length - 1 && _.mr.md)}
                    key={item}
                    src={item}
                    size={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    radius={_.radiusSm}
                    errorToHide
                    onPress={() => {
                      showImageViewer(
                        thumbs2.map(t => ({ url: t })),
                        idx
                      )
                    }}
                  />
                )}
                renderNums={
                  thumbs2.length > 3 &&
                  (() => (
                    <Touchable
                      onPress={() => {
                        showImageViewer(
                          thumbs2.map(t => ({ url: t })),
                          3
                        )
                      }}
                    >
                      <Flex style={styles.nums} justify='center'>
                        <Text size={15} bold>
                          + {thumbs2.length}
                        </Text>
                      </Flex>
                    </Touchable>
                  ))
                }
              />
            </View>
          )}
        </Flex>
      </Flex>
      {index === 0 && <Heatmap id='ADV.跳转' />}
    </Touchable>
  )
}

export default observer(Item)
