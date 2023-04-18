/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-18 13:50:47
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Expand, RenderHtml, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { memo } from '@utils/decorators'
import IconWiki from '../icon/wiki'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ navigation, styles, subjectId, showInfo, info, onSwitchBlock }) => {
    // global.rerender('Subject.Info.Main')

    const [expand, setExpand] = useState(false)
    const onExpand = useCallback(() => {
      setExpand(true)
    }, [setExpand])

    let html = info
    try {
      html = expand ? decodeURIComponent(html) : decodeURIComponent(html).slice(0, 200)
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
              <Expand ratio={0.88} onExpand={onExpand}>
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
  DEFAULT_PROPS
)
