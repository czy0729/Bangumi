/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:06:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, HorizontalList, Image, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars, Tags } from '@_'
import { _, collectionStore, otaStore, uiStore } from '@stores'
import { HTMLDecode, showImageViewer, stl, x18 } from '@utils'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { IMG_DEFAULT, IMG_HEIGHT_LG, IMG_WIDTH_LG, MODEL_COLLECTION_STATUS, WEB } from '@constants'
import { CollectionStatus } from '@types'
import { getThumbs, toArray } from './utils'
import { THUMB_HEIGHT, THUMB_WIDTH } from './ds'
import { memoStyles } from './styles'

function ItemList({ index, pickIndex }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const subjectId = otaStore.gameSubjectId(pickIndex)
  const game = otaStore.game(subjectId)
  const {
    id,
    t: title,
    c: image,
    en: time,
    cn: timeCn,
    sc: score,
    r: rank,
    o: total,
    l: length
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

  const tag = toArray(game, 'ta')
  const dev = toArray(game, 'd')
  const publish = toArray(game, 'p')
  const platform = toArray(game, 'pl')
  const _dev = dev.map((item: any) => String(item).trim()).filter((item: any) => !!item)
  const _publish = publish.map((item: any) => String(item).trim()).filter((item: any) => !!item)

  const tip = [platform.join('、'), time, timeCn && timeCn !== time ? `中文 ${timeCn}` : '']
  if (_dev.join('、') === _publish.join('、')) {
    tip.push(_dev.join('、'))
  } else {
    tip.push(`${_dev.join('、')} 开发`, `${_publish.join('、')} 发行`)
  }
  const tipStr = tip.filter((item: string) => !!item).join(' / ')
  const collection = collectionStore.collect(id)

  return (
    <Touchable
      style={styles.container}
      animate
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId: id,
            _cn: _title,
            _image: getCoverSrc(cover, IMG_WIDTH_LG),
            _type: '游戏'
          })
        },
        '游戏.跳转',
        {
          subjectId: id
        }
      )}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius cdn={!x18(id)} />
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
                <Flex style={_.mt.md}>
                  <Rank value={rank} />
                  <Stars style={_.mr.xs} value={score} simple />
                  {!!total && (
                    <Text style={_.mr.sm} type='sub' size={11} bold>
                      ({total})
                    </Text>
                  )}
                  <Flex.Item>
                    <Tags value={tag} />
                  </Flex.Item>
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
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
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
                data={thumbs.filter((_item, index) => {
                  if (!WEB) return index < 3

                  if (thumbs.length <= 1) return true
                  return index > 0 && index < 4
                })}
                renderItem={(item, index) => (
                  <Image
                    style={stl(!!index && _.ml.sm, index === thumbs.length - 1 && _.mr.md)}
                    key={item}
                    src={item}
                    size={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    radius
                    errorToHide
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
                  thumbs2.length > 2 &&
                  (() => (
                    <Touchable
                      onPress={() => {
                        showImageViewer(
                          thumbs2.map(item => ({
                            url: item
                          })),
                          2
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
      {index === 0 && <Heatmap id='游戏.跳转' />}
    </Touchable>
  )
}

export default ob(ItemList)
