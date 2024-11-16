/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:48:09
 */
import React from 'react'
import { Flex, Heatmap, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars, Tag } from '@_'
import { _, collectionStore, otaStore, uiStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HENTAI_TAGS } from '@utils/subject/hentai'
import {
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS,
  TEXT_ONLY
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { getType } from './utils'
import { memoStyles } from './styles'

function Item({ index, pickIndex }) {
  const { $, navigation } = useStore<Ctx>()
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

  const size = cn.length >= 20 ? 13 : cn.length >= 14 ? 14 : 15
  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const tip = [ep ? `${ep}话` : '', air].filter(item => !!item).join(' / ')
  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _image: getCoverSrc(cover, IMG_WIDTH_LG),
          _hid: hid
        })

        t('Hentai.跳转', {
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
          cdn={false}
          textOnly={TEXT_ONLY || !$.isLogin}
        />
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={$.isLogin && tags.length >= 14 ? styles.contentFlux : styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start'>
              <Flex.Item>
                <Text size={size} bold numberOfLines={3}>
                  {cn}
                </Text>
                <Text style={_.mt.sm} size={11} lineHeight={14}>
                  {tip}
                </Text>
              </Flex.Item>
              <Manage
                subjectId={id}
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title: cn,
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '找Hentai'
                  )
                }}
              />
            </Flex>
            {$.isLogin && !!tags.length && (
              <Flex style={_.mt.sm} wrap='wrap'>
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

export default ob(Item)
