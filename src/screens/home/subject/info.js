/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:18:31
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, RenderHtml, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'

function Info({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { showInfo } = systemStore.setting
  let html = $.info
  try {
    html = decodeURIComponent(html)
  } catch (error) {
    warn('home/subject/info.js', 'Info', error)
  }
  return (
    <View style={[showInfo && styles.container, style, !showInfo && _.short]}>
      <SectionTitle
        style={_.container.wind}
        icon={!showInfo && 'right'}
        onPress={() => $.switchBlock('showInfo')}
      >
        详情
      </SectionTitle>
      {showInfo && (
        <View>
          {!!$.info && (
            <Expand>
              <RenderHtml
                style={styles.info}
                baseFontStyle={styles.baseFontStyle}
                html={html}
                katakana
                onLinkPress={href =>
                  appNavigate(
                    href,
                    navigation,
                    {},
                    {
                      id: '条目.跳转',
                      data: {
                        from: '详情',
                        subjectId: $.subjectId
                      }
                    }
                  )
                }
              />
            </Expand>
          )}
          <Heatmap
            id='条目.跳转'
            data={{
              from: '详情'
            }}
          />
        </View>
      )}
    </View>
  )
}

export default obc(Info)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120
  },
  info: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22,
    color: _.colorTitle
  }
}))
