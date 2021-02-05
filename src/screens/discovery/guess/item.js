/*
 * @Author: czy0729
 * @Date: 2021-02-04 19:23:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-05 16:44:41
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

const imageWidth = _.window.width - _.wind * 2
const imageHeight = imageWidth * 1.38
const colors = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.24)',
  'rgba(0, 0, 0, 0.64)',
  'rgba(0, 0, 0, 0.92)'
]

function Item(
  { id, ageId, image, cn, jp, begin, ep, official },
  { $, navigation }
) {
  const eps = $.state.eps[id]
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
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
        size={imageWidth}
        height={imageHeight}
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
          {begin} · {official} [{String(ep).replace(/\(完结\)|第/g, '')}]
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
                size={96}
                height={64}
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

const styles = _.create({
  item: {
    marginTop: _.space,
    marginHorizontal: _.wind,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
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
})
