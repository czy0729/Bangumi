/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:35:38
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Image, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { showImageViewer } from '@utils/ui'
import { t } from '@utils/fetch'

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
    <View style={[styles.container, style, !showThumbs && _.short]}>
      <SectionTitle
        style={_.container.wind}
        icon={!showThumbs && 'right'}
        onPress={() => $.switchBlock('showThumbs')}
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
                onPress={() => {
                  t('条目.预览', {
                    subjectId: $.subjectId
                  })

                  showImageViewer(
                    thumbs.filter((item, index) => index < 12),
                    index
                  )
                }}
              />
            ))}
        </ScrollView>
      )}
      <Heatmap id='条目.预览' />
    </View>
  )
}

export default obc(Thumbs)

const styles = _.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind
  },
  icon: {
    marginRight: -_.sm
  }
})
