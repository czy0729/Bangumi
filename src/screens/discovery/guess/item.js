/*
 * @Author: czy0729
 * @Date: 2021-02-04 19:23:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 17:58:36
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, HorizontalList, Image } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { cnjp } from '@utils/app'
import { t } from '@utils/fetch'
import { showImageViewer } from '@utils/ui'
import { IMG_DEFAULT } from '@constants'

const colors = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.24)',
  'rgba(0, 0, 0, 0.64)',
  'rgba(0, 0, 0, 0.92)'
]

function Item(
  { id, ageId, image, cn, jp, begin, ep, official, rate },
  { $, navigation }
) {
  const styles = memoStyles()
  const eps = $.state.eps[id]
  const cover = image ? `//lain.bgm.tv/pic/cover/l/${image}.jpg` : IMG_DEFAULT
  const onPress = () => {
    t('推荐.跳转', {
      id
    })

    navigation.push('Subject', {
      subjectId: id,
      _cn: cn,
      _image: cover,
      _aid: ageId
    })
  }
  return (
    <View style={styles.item}>
      <Cover
        src={cover}
        size={styles.cover.width}
        height={styles.cover.height}
        radius={_.radiusMd}
        onPress={onPress}
      />
      <LinearGradient
        colors={colors}
        pointerEvents='none'
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.desc}>
        <Text
          style={[styles.title, _.mr.sm]}
          size={22}
          type={_.select('plain', 'title')}
          bold
          onPress={onPress}
        >
          {cnjp(cn, jp)}
        </Text>
        <Text
          style={[_.mt.xs, _.mr.sm]}
          size={13}
          type={_.select('plain', 'title')}
          bold
          onPress={onPress}
        >
          {begin} / {official} [{String(ep).replace(/\(完结\)|第/g, '')}] / 推荐分{' '}
          {rate}
        </Text>
        {!!eps && (
          <HorizontalList
            style={_.mt.md}
            data={eps.epsThumbs}
            initialRenderNums={4}
            renderItem={(item, index) => (
              <Image
                style={[
                  !!index && _.ml.sm,
                  index === eps.epsThumbs.length - 1 && _.mr.md
                ]}
                key={item}
                src={item}
                size={styles.thumb.width}
                height={styles.thumb.height}
                radius
                headers={eps.epsThumbsHeader}
                onPress={() => {
                  showImageViewer(
                    eps.epsThumbs.map(item => ({
                      url: item.split('@')[0], // 参数: bilibili为@, youku没有, iqiyi看不懂不作处理
                      headers: eps.epsThumbsHeader
                    })),
                    index
                  )
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(() => {
  const width = _.windowSm.width - _.windSm * 2
  const thumbWidth = _.device(128, 200)
  return {
    item: {
      marginTop: _.space,
      marginHorizontal: _.windSm,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    cover: {
      width,
      height: width * 1.38
    },
    thumb: {
      width: thumbWidth,
      height: thumbWidth * 0.56
    },
    desc: {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      bottom: _.md,
      left: _.md
    },
    title: {
      opacity: 0.88
    }
  }
})
