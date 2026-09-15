/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 04:02:42
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  Flex,
  flexStyle,
  Heatmap,
  HorizontalList,
  Image,
  Loading,
  Squircle,
  Text,
  Touchable
} from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, Manage, Rank, Stars } from '@_'
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

  const subjectId = otaStore.advSubjectId(pickIndex)
  const adv = otaStore.adv(subjectId)
  const { id, title, cover, date, score, rank, total, length, dev, time, cn } = adv

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

  /**
   * 下面两个 useMemo 必须在 `if (!id)` 之前
   *  - 数据未就绪时 otaStore.adv() 返回的是 {}, id 为 undefined, 会走 loading 分支
   *  - 若把它们写在提前 return 之后, 首次渲染会少调用这两个 hook,
   *    数据回来后再渲染就会报 Rendered more hooks than during the previous render
   * */
  const thumbs = useMemo(() => (id ? getThumbs(id, length) : []), [id, length])
  const thumbsData = useMemo(() => thumbs.slice(0, 3).map((image, id) => ({ id, image })), [thumbs])

  /** 稳定 style 引用, 避免每次渲染生成新数组击穿子组件 memo */
  const itemStyle = useMemo(
    () => stl(flexStyle({ align: 'start' }), styles.container, styles.wrap),
    [styles]
  )

  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const titleText = HTMLDecode(title)
  const size = titleText.length >= 20 ? 13 : titleText.length >= 14 ? 14 : 15
  const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT
  const thumbs2 = getThumbs(id, length, false)

  const tipStr = [date, dev, formatPlaytime(time), cn ? '汉化' : '']
    .filter(item => !!item)
    .join(' / ')

  const collection = collectionStore.collect(id)
  const y = InView.y(index, IMG_HEIGHT_LG, _.window.height * 0.4)

  return (
    <Touchable style={itemStyle} onPress={handlePress}>
      <InView style={styles.inView} y={y}>
        <Cover
          src={image}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          cdn={!x18(id, titleText)}
        />
      </InView>

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
          <InView style={styles.thumbs} y={y}>
            <HorizontalList
              data={thumbsData}
              renderItem={(item, idx) => (
                <Squircle
                  key={item.id}
                  style={stl(!!idx && _.ml.sm, idx === thumbsData.length - 1 && _.mr.md)}
                  width={THUMB_WIDTH}
                  height={THUMB_HEIGHT}
                  radius={_.radiusSm}
                >
                  <Image
                    src={item.image}
                    size={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    radius={0}
                    errorToHide
                    onPress={() => {
                      showImageViewer(
                        thumbs2.map(t => ({ url: t })),
                        idx
                      )
                    }}
                  />
                </Squircle>
              )}
              renderNums={
                thumbs2.length > 3 &&
                (() => (
                  <Touchable
                    style={stl(flexStyle({ justify: 'center' }), styles.nums)}
                    onPress={() => {
                      showImageViewer(
                        thumbs2.map(t => ({ url: t })),
                        3
                      )
                    }}
                  >
                    <Text size={15} bold>
                      + {thumbs2.length}
                    </Text>
                  </Touchable>
                ))
              }
            />
          </InView>
        )}
      </Flex>
      {index === 0 && <Heatmap id='ADV.跳转' />}
    </Touchable>
  )
}

export default observer(Item)
