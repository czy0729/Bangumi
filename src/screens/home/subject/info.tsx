/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-21 16:25:38
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, RenderHtml, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { obc, memo } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import IconWiki from './icon/wiki'
import IconHidden from './icon/hidden'

const defaultProps = {
  navigation: {},
  styles: {},
  subjectId: 0,
  showInfo: true,
  info: '',
  onSwitchBlock: Function.prototype
}

const Info = memo(
  ({ navigation, styles, subjectId, showInfo, info, onSwitchBlock }) => {
    global.rerender('Subject.Info.Main')

    let html = info
    try {
      html = decodeURIComponent(html)
    } catch (error) {
      console.error('home/subject/info.js', 'Info', error)
    }

    return (
      <View style={[showInfo && styles.container, _.mt.lg, !showInfo && _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={showInfo ? <IconWiki /> : <IconHidden name='详情' value='showInfo' />}
          icon={!showInfo && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showInfo')}
        >
          详情
        </SectionTitle>
        {showInfo && (
          <View>
            {!!info && (
              <Expand>
                <RenderHtml
                  style={styles.info}
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
                          subjectId
                        }
                      }
                    )
                  }
                />
              </Expand>
            )}
            <Heatmap id='条目.跳转' from='详情' />
          </View>
        )}
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  global.rerender('Subject.Info')

  const { showInfo } = systemStore.setting
  if (showInfo === -1) return null

  return (
    <Info
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      showInfo={showInfo}
      info={$.info}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120
  },
  info: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  }
}))
