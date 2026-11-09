/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 21:58:44
 */
import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Expand, Heatmap, RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import BlockTitle from '../block-title'
import IconHtmlExpand from '../icon/html-expand'
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
    name = ''
  }) => {
    const [expand, setExpand] = useState(false)

    const html = useMemo(() => {
      try {
        const decoded = decodeURIComponent(info)
        return expand ? decoded : decoded.slice(0, 560)
      } catch (error) {
        return info
      }
    }, [expand, info])

    const elRight = useMemo(() => (showInfo ? <IconWiki /> : null), [showInfo])

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

    const handleNavigate = useCallback(
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
      <View style={stl(styles.container, !showInfo && styles.containerNotShow)}>
        <BlockTitle
          layoutKey='showInfo'
          style={_.container.wind}
          right={elRight}
          icon={!showInfo && 'md-navigate-next'}
          splitStyles
        >
          详情
        </BlockTitle>

        {showInfo && !!info && (
          <Expand
            ratio={0.88}
            checkLayout={false}
            onExpand={handleExpand}
            onPress={subjectHtmlExpand ? undefined : handleExpandPress}
          >
            <View style={styles.info}>
              <RenderHtml
                baseFontStyle={_.baseFontStyle.md}
                html={html}
                onLinkPress={handleNavigate}
              />
              {subjectHtmlExpand && <IconHtmlExpand showPromoteAlias />}
              <Heatmap id='条目.跳转' from='详情' />
            </View>
          </Expand>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Info
