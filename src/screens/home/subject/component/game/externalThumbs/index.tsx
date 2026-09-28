/*
 * @Author: czy0729
 * @Date: 2026-05-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 21:00:00
 *
 * 外部站点游戏截图横滑列表 (VNDB / DLsite)
 */
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, ScrollView, Text, Touchable } from '@components'
import { IconTouchable, Segment } from '@_'
import { _, systemStore, useStore } from '@stores'
import { open, showImageViewer, stl } from '@utils'
import { t } from '@utils/fetch'
import { isNsfwScreenshot } from '@utils/thirdParty/dlsite-vndb'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function ExternalThumbs() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { isAdvance } = systemStore
  const { subjectId, nsfw } = $

  const [sourceIndex, setSourceIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const { vndb: vndbScreenshots, dlsite: dlsiteImages } = $.state.externalScreenshots
  const hasVndb = vndbScreenshots.length > 0
  const hasDlsite = dlsiteImages.length > 0
  const isVndb = sourceIndex === 0 && hasVndb

  const images = isVndb
    ? vndbScreenshots.map(s => ({ url: s.thumbnail || s.url, nsfw: isNsfwScreenshot(s) }))
    : dlsiteImages.map((s, i) => ({ url: s.url, nsfw: nsfw && i > 0 }))
  const safeImages = isVndb || isAdvance ? images : images.filter(i => !i.nsfw)
  const previews = safeImages.map(i => ({ url: String(i.url).replace('/sf.t/', '/sf/') }))
  const segmentData = [
    hasVndb && `VNDB (${vndbScreenshots.length})`,
    hasDlsite && `DLsite (${dlsiteImages.length})`
  ].filter(Boolean)

  const handleScroll = useCallback(() => {
    setScrolled(true)
  }, [])
  const handleSelect = useCallback((_: unknown, index: number) => {
    setSourceIndex(index)
  }, [])
  const handlePressImage = (url: string, nsfw: boolean) => {
    if (isVndb) {
      open(String(url).replace('/sf.t/', '/sf/'))
    } else if (nsfw && !isAdvance) {
      open(String(url).replace('/sf.t/', '/sf/'))
    } else {
      if (!previews.length) return

      const safeIndex = safeImages.findIndex(i => i.url === url)
      showImageViewer(previews, safeIndex)
    }

    t('条目.游戏截图', { subjectId })
  }
  if ((!hasVndb && !hasDlsite) || !images.length) return null

  const styles = memoStyles()

  return (
    <View style={styles.container}>
      {(hasVndb || hasDlsite) && (
        <Flex style={styles.segment}>
          <Segment
            textStyle={segmentData.length >= 2 && styles.segmentText}
            data={segmentData}
            selectedIndex={sourceIndex}
            onSelect={handleSelect}
          />
          <IconTouchable
            style={_.ml.xs}
            name='md-info-outline'
            size={16}
            onPress={() => {
              navigation.push('Information', {
                title: '游戏预览截图',
                message: [
                  '此数据是根据详情中，维基人编辑的 VNDB、DLsite 链接，进行简易匹配的结果，未必准确请自行判断。',
                  '由于 VNDB 的大图加载非常慢，暂时决定只能打开外部浏览器加载，以保证能顺利查看。',
                  '由于 DLsite 的预览图不能有效区分 NSFW，普通用户组默认使用外部浏览器加载。'
                ] as const
              })
            }}
          />
        </Flex>
      )}

      <ScrollView
        key={String(sourceIndex)}
        style={_.mt.sm}
        contentContainerStyle={_.container.wind}
        horizontal
        onScroll={scrolled ? undefined : handleScroll}
      >
        {images
          .filter((_item, index) => index <= (scrolled ? 24 : 4))
          .map((item, index) => (
            <Touchable
              key={item.url + index}
              style={stl(styles.image, !index && styles.side)}
              onPress={() => handlePressImage(item.url, item.nsfw)}
            >
              {!isAdvance && item.nsfw ? null : (
                <Image
                  src={item.url}
                  size={styles.image.width}
                  height={styles.image.height}
                  blurRadius={!isAdvance && item.nsfw ? 16 : undefined}
                  errorToHide
                />
              )}
              {item.nsfw && (
                <Flex style={styles.mask} direction='column' justify='center'>
                  <Text style={styles.label} type='__plain__' bold shadow>
                    {index + 1}
                  </Text>
                  <Text style={styles.sub} type='__plain__' size={10} bold shadow>
                    NSFW
                  </Text>
                </Flex>
              )}
            </Touchable>
          ))}
      </ScrollView>
    </View>
  )
}

export default observer(ExternalThumbs)
