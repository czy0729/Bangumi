/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-12 15:11:44
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { SectionTitle, IconTouchable } from '@screens/_'
import { _, systemStore } from '@stores'

const headers = {
  Referer: 'https://www.bilibili.com/'
}

function Thumbs({ style }, { $ }) {
  const { bilibiliEpsThumbs } = $.state
  if (!bilibiliEpsThumbs.length) {
    return null
  }

  const { showThumbs } = systemStore.setting
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
          {bilibiliEpsThumbs
            .filter((item, index) => index < 12)
            .map((item, index) => (
              <Image
                style={!!index && _.ml.md}
                key={item}
                src={item}
                size={124}
                height={78}
                radius
                headers={headers}
                imageViewer
                imageViewerSrc={item.replace('@192w_120h_1c.jpg', '')}
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
