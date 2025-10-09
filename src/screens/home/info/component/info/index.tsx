/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:57:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:54:58
 */
import React, { useCallback } from 'react'
import { Flex, RenderHtml, Text, Touchable } from '@components'
import { _, systemStore, useStore } from '@stores'
import { appNavigate, feedback } from '@utils'
import { useObserver } from '@utils/hooks'
import { processHtml } from '@screens/home/subject/component/info/utils'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleLinkPress = useCallback(
    (href: string) => {
      appNavigate(
        href,
        navigation,
        {},
        {
          id: '条目详情.跳转',
          data: {
            subjectId: $.subjectId
          }
        }
      )
    },
    [$.subjectId, navigation]
  )

  return useObserver(() => {
    const styles = memoStyles()
    const html = $.rawInfo.replace('展开+', '')

    return (
      <>
        <RenderHtml
          style={styles.info}
          baseFontStyle={_.baseFontStyle.md}
          html={processHtml(html)}
          onLinkPress={handleLinkPress}
        />
        <Flex style={styles.settings} justify='end'>
          <Touchable
            style={styles.touch}
            onPress={() => {
              systemStore.switchSetting('subjectPromoteAlias')

              feedback(true)
            }}
          >
            <Text type='sub' size={11} bold>
              关联设置：别名提前 [{systemStore.setting.subjectPromoteAlias ? '开' : '关'}]
            </Text>
          </Touchable>
        </Flex>
      </>
    )
  })
}

export default Info
