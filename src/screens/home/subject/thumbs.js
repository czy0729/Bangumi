/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-12 18:59:13
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { SectionTitle, IconTouchable } from '@screens/_'
import { _, systemStore } from '@stores'
import { showImageViewer } from '@utils/ui'

function Thumbs({ style }, { $ }) {
  const { epsThumbs, epsThumbsHeader } = $.state
  if (!epsThumbs.length) {
    return null
  }

  const { showThumbs } = systemStore.setting
  const thumbs = epsThumbs.map(item => ({
    url: item.split('@')[0], // 参数: bilibili为@, youku没有, iqiyi看不懂不作处理
    headers: epsThumbsHeader
  }))
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        style={_.container.wind}
        right={
          <IconTouchable
            style={styles.icon}
            name={showThumbs ? 'up' : 'down'}
            size={16}
            onPress={() => systemStore.switchSetting('showThumbs')}
          />
        }
      >
        预览
      </SectionTitle>
      {showThumbs && (
        <ScrollView
          style={_.mt.md}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {epsThumbs
            .filter((item, index) => index < 12)
            .map((item, index) => (
              <Image
                style={!!index && _.ml.sm}
                key={item}
                src={item}
                size={124}
                height={78}
                radius
                headers={epsThumbsHeader}
                onPress={() => showImageViewer(thumbs, index)}
              />
            ))}
        </ScrollView>
      )}
    </View>
  )
}

Thumbs.contextTypes = {
  $: PropTypes.object
}

export default observer(Thumbs)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind
  },
  icon: {
    marginRight: -_.sm
  }
})
