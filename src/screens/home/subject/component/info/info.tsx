/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-16 06:18:54
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Expand, Heatmap, RenderHtml } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { memo } from '@utils/decorators'
import { WEB } from '@constants'
import IconHidden from '../icon/hidden'
import IconWiki from '../icon/wiki'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Info = memo(
  ({ navigation, styles, subjectId, showInfo, info, onSwitchBlock }) => {
    const [expand, setExpand] = useState(false)
    const onExpand = useCallback(() => {
      setExpand(true)
    }, [setExpand])

    let html = info
    try {
      html = expand ? decodeURIComponent(html) : decodeURIComponent(html).slice(0, WEB ? 1000 : 440)
    } catch (error) {
      console.error('home/subject/info.js', 'Info', error)
    }

    return (
      <View style={showInfo ? styles.container : styles.hide}>
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
              <Expand ratio={0.88} checkLayout={false} onExpand={onExpand}>
                <RenderHtml
                  style={styles.info}
                  html={html}
                  // katakana
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
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Info
