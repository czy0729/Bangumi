/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 21:19:58
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { collectionStore, uiStore, _ } from '@stores'
import { Tag, Cover, Stars, Rank, Manage } from '@_'
import { cnjp, x18 } from '@utils'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/manga'
import { t } from '@utils/fetch'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { $, navigation }: Ctx) {
  const { id, mangaId, status, author, tags, ep, cn, jp, image, begin, score, rank } =
    pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _tags = String(tags).split(' ')
  const tip = [
    typeof ep === 'number' ? `第${ep}回` : ep,
    status ? '完结' : '连载',
    begin,
    author
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection = $.userCollectionsMap[id]
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _jp: jp,
          _cn: cn,
          _image: cover,
          _mid: mangaId
        })

        t('Manga.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex align='start' style={styles.wrap}>
        <View style={styles.imgContainer}>
          <Cover
            src={cover}
            width={IMG_WIDTH_LG}
            height={IMG_HEIGHT_LG}
            radius
            shadow
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={styles.body}>
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {cnjp(cn, jp)}
                  </Text>
                  <Text type='sub' size={11} lineHeight={15} numberOfLines={1}>
                    {' '}
                    {cnjp(jp, cn)}
                  </Text>
                </Text>
              </Flex.Item>
              {x18(id) && <Tag style={_.ml.sm} value='NSFW' />}
              <Manage
                collection={collectionStore.collectionStatus(id) || collection || ''}
                typeCn='书籍'
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title: cnjp(cn, jp),
                      desc: cnjp(jp, cn),
                      status:
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                      action: '读'
                    },
                    '找漫画',
                    () => {
                      collectionStore.fetchCollectionStatusQueue([id])
                    }
                  )
                }}
              />
            </Flex>
            <Text style={_.mt.sm} size={11} lineHeight={14}>
              {tip}
            </Text>
            <Flex style={_.mt.md} wrap='wrap'>
              <Rank value={rank} />
              <Stars style={_.mr.sm} value={score} simple />
              <Flex.Item>
                <Flex>
                  {_tags.map(item => (
                    <Tag key={item} style={_.mr.sm} value={item} />
                  ))}
                </Flex>
              </Flex.Item>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Manga.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
