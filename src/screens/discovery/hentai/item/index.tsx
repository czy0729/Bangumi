/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-24 22:12:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap, Loading } from '@components'
import { _, otaStore, collectionStore, uiStore } from '@stores'
import { Tag, Cover, Stars, Rank, Manage } from '@_'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HENTAI_TAGS } from '@utils/subject/hentai'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { getType } from './utils'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.hentaiSubjectId(pickIndex)
  const {
    id,
    h: hid,
    i: image,
    c: cn,
    e: ep,
    a: air,
    t: tags = [],
    s: score,
    r: rank,
    n: total
  } = otaStore.hentai(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const tip = [ep ? `${ep}话` : '', air].filter(item => !!item).join(' / ')

  const collection =
    collectionStore.collectionStatus(id) || $.userCollectionsMap[id] || ''
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _image: cover,
          _hid: hid
        })

        t('Hentai.跳转', {
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
            textOnly={!$.isLogin}
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={$.isLogin && tags.length >= 14 ? styles.contentFlux : styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={styles.body}>
              <Flex.Item>
                <Text size={15} bold numberOfLines={3}>
                  {cn}
                </Text>
              </Flex.Item>
              <Manage
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title: cn,
                      status:
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '找Hentai',
                    () => {
                      collectionStore.fetchCollectionStatusQueue([id])
                    }
                  )
                }}
              />
            </Flex>
            <Text style={styles.tip} size={11} lineHeight={14}>
              {tip}
            </Text>
            {$.isLogin && !!tags.length && (
              <Flex style={_.mt.md} wrap='wrap'>
                {tags.map((item: number) => (
                  <Tag
                    key={item}
                    style={styles.tag}
                    type={getType($.state, item)}
                    value={HENTAI_TAGS[item]}
                  />
                ))}
                <Tag value={`+${tags.length}`} />
              </Flex>
            )}
            <Flex style={_.mt.md} wrap='wrap'>
              <Rank value={rank} />
              <Stars style={_.mr.xs} value={score} simple />
              {!!total && (
                <Text type='sub' size={11} bold>
                  ({total})
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Hentai.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
