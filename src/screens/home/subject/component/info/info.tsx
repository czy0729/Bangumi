/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:50:16
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Expand, Heatmap, RenderHtml } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import IconHidden from '../icon/hidden'
import IconWiki from '../icon/wiki'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Info = memo(
  ({
    navigation,
    styles,
    subjectId = 0,
    showInfo = true,
    subjectHtmlExpand = true,
    info = '',
    name = '',
    onSwitchBlock = FROZEN_FN
  }) => {
    const [expand, setExpand] = useState(false)
    const handleExpand = useCallback(() => {
      setExpand(true)
    }, [])
    const handlePress = useCallback(() => {
      navigation.push('SubjectInfo', {
        subjectId,
        name,
        type: '详情'
      })

      t('条目.跳转', {
        to: 'SubjectInfo',
        type: 'Info',
        subjectId
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, subjectId])

    let html = info
    try {
      html = expand ? decodeURIComponent(html) : decodeURIComponent(html).slice(0, 440)
    } catch (error) {
      console.error('home/subject/info.js', 'Info', error)
    }

    return (
      <View style={showInfo ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={showInfo ? <IconWiki /> : <IconHidden name='详情' value='showInfo' />}
          icon={!showInfo && 'md-navigate-next'}
          splitStyles
          onPress={() => onSwitchBlock('showInfo')}
        >
          详情
        </SectionTitle>
        {showInfo && (
          <View>
            {!!info && (
              <Expand
                ratio={0.88}
                checkLayout={false}
                onExpand={handleExpand}
                onPress={subjectHtmlExpand ? undefined : handlePress}
              >
                <RenderHtml
                  style={styles.info}
                  html={html}
                  // katakana
                  onLinkPress={href => {
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
                  }}
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
