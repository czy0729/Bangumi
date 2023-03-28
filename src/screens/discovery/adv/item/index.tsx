/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 13:50:37
 */
import React from 'react'
import { View } from 'react-native'
import {
  Flex,
  Text,
  Touchable,
  Heatmap,
  HorizontalList,
  Image,
  Loading
} from '@components'
import { _, otaStore, collectionStore, uiStore } from '@stores'
import { Cover, Stars, Rank, Manage } from '@_'
import { HTMLDecode, showImageViewer, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'
import { getThumbs } from './utils'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.advSubjectId(pickIndex)
  const game = otaStore.game(subjectId)
  const {
    id,
    t: title,
    c: image,
    en: time,
    sc: score,
    r: rank,
    o: total,
    l: length,
    d: dev
  } = game
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const _title = HTMLDecode(title)
  const size = _title.length >= 20 ? 13 : _title.length >= 14 ? 14 : 15

  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const thumbs = getThumbs(id, length)
  const thumbs2 = getThumbs(id, length, false)

  const tipStr = [time, dev].filter((item: string) => !!item).join(' / ')
  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _image: cover
        })

        t('ADV.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover
          src={cover}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          shadow
          type='游戏'
        />
        <Flex style={styles.content} direction='column' align='start'>
          <View style={styles.body}>
            <Flex style={_.container.block} align='start'>
              <Flex.Item>
                <Text size={size} bold numberOfLines={3}>
                  {_title}
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
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title,
                      status:
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                      action: '玩'
                    },
                    '找游戏'
                  )
                }}
              />
            </Flex>
          </View>
          {!!thumbs.length && (
            <View style={styles.thumbs}>
              <HorizontalList
                data={thumbs.filter((item, index) => index < 3)}
                renderItem={(item, index) => (
                  <Image
                    style={stl(
                      !!index && _.ml.sm,
                      index === thumbs.length - 1 && _.mr.md
                    )}
                    key={item}
                    src={item}
                    size={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    radius
                    onPress={() => {
                      showImageViewer(
                        thumbs2.map(item => ({
                          url: item
                        })),
                        index
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
                          thumbs2.map(item => ({
                            url: item
                          })),
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

export default obc(Item)
