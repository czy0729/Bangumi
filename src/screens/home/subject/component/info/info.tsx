/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 05:20:06
 */
import React, { useCallback, useMemo, useState } from 'react'
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

    const html = useMemo(() => {
      try {
        const decoded = decodeURIComponent(info)
        return expand ? decoded : decoded.slice(0, 560)
      } catch (error) {
        console.error('home/subject/info.js', 'Info', error)
        return info
      }
    }, [expand, info])

    const handlePress = useCallback(() => onSwitchBlock('showInfo'), [onSwitchBlock])

    const handleExpand = useCallback(() => {
      setExpand(true)
    }, [])

    const handleExpandPress = useCallback(() => {
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
    }, [name, navigation, subjectId])

    const handleLinkPress = useCallback(
      (href: string) => {
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
      },
      [navigation, subjectId]
    )

    return (
      <View style={showInfo ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={showInfo ? <IconWiki /> : <IconHidden name='详情' value='showInfo' />}
          icon={!showInfo && 'md-navigate-next'}
          splitStyles
          onPress={handlePress}
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
                onPress={subjectHtmlExpand ? undefined : handleExpandPress}
              >
                <RenderHtml
                  style={styles.info}
                  baseFontStyle={_.baseFontStyle.md}
                  html={html}
                  onLinkPress={handleLinkPress}
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
