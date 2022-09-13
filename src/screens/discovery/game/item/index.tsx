/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-13 21:41:03
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap, HorizontalList, Image } from '@components'
import { collectionStore, uiStore, _ } from '@stores'
import { Tag, Cover, Stars, Rank, Manage } from '@_'
import { x18, HTMLDecode, showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { pick } from '@utils/subject/game'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'
import { fixed, getThumbs } from './utils'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const {
    id,
    title,
    sub,
    cover: image,
    tag,
    dev,
    publish,
    platform,
    time,
    timeCn,
    score,
    rank,
    length
  } = pick(pickIndex)
  const thumbs = getThumbs(id, length)
  const cover = image ? `//lain.bgm.tv/pic/cover/${fixed(image)}.jpg` : IMG_DEFAULT
  let tip: any = [
    platform.join('、'),
    time,
    timeCn && timeCn !== time ? `中文 ${timeCn}` : ''
  ]
  if (dev.join('、') === publish.join('、')) {
    tip.push(`${dev.join('、')}`)
  } else {
    tip.push(`${dev.join('、')} 开发`, `${publish.join('、')} 发行`)
  }
  tip.push(tag.join('、'))
  tip = tip.filter((item: string) => !!item).join(' / ')

  const collection = $.userCollectionsMap[id]
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _image: cover
        })

        t('游戏.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex align='start' style={styles.wrap}>
        <Cover
          src={cover}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          shadow
          type='游戏'
        />
        <Flex style={styles.content} direction='column' justify='between' align='start'>
          <View style={styles.body}>
            <Flex align='start' style={_.container.w100}>
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {HTMLDecode(title)}
                  </Text>
                  {!!sub && sub !== title && (
                    <Text type='sub' size={11} lineHeight={15} numberOfLines={1}>
                      {' '}
                      {HTMLDecode(sub)}
                    </Text>
                  )}
                </Text>
              </Flex.Item>
              {x18(id) && <Tag style={_.ml.sm} value='NSFW' />}
              <Manage
                collection={collectionStore.collectionStatus(id) || collection || ''}
                typeCn='游戏'
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title,
                      desc: sub,
                      status:
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                      action: '玩'
                    },
                    '找游戏',
                    () => {
                      collectionStore.fetchCollectionStatusQueue([id])
                    }
                  )
                }}
              />
            </Flex>
            <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={3}>
              {tip}
            </Text>
            {!!(rank || score) && (
              <Flex style={_.mt.md} wrap='wrap'>
                <Rank value={rank} />
                <Stars style={_.mr.sm} value={score} simple />
              </Flex>
            )}
          </View>
          {!!thumbs.length && (
            <View style={styles.thumbs}>
              <HorizontalList
                data={thumbs.filter((item, index) => index < 2)}
                renderItem={(item, index) => (
                  <Image
                    style={[!!index && _.ml.sm, index === thumbs.length - 1 && _.mr.md]}
                    key={item}
                    src={item}
                    size={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    radius
                    onPress={() => {
                      showImageViewer(
                        thumbs.map(item => ({
                          url: item
                        })),
                        index
                      )
                    }}
                  />
                )}
                renderNums={
                  thumbs.length > 2 &&
                  (() => (
                    <Touchable
                      onPress={() => {
                        showImageViewer(
                          thumbs.map(item => ({
                            url: item
                          })),
                          2
                        )
                      }}
                    >
                      <Flex style={styles.nums} justify='center'>
                        <Text size={15} bold>
                          + {thumbs.length}
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
      {index === 0 && <Heatmap id='游戏.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
