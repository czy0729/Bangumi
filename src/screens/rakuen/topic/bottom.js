/*
 * @Author: czy0729
 * @Date: 2022-03-14 22:47:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 23:18:27
 */
import React from 'react'
import { FixedTextarea, Flex, Text } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'

function Bottom({ fixedTextareaRef }, { $, navigation }) {
  const styles = memoStyles()
  const { placeholder, value } = $.state
  const { tip, close } = $.topic
  if (tip.includes('半公开')) {
    return (
      <Flex style={styles.fixedBottom}>
        <Text>半公开小组只有成员才能发言, </Text>
        <Text type='main' onPress={() => appNavigate($.groupHref, navigation)}>
          点击加入
        </Text>
      </Flex>
    )
  }

  if (close) {
    return (
      <Flex style={styles.fixedBottom}>
        <Text>主题已被关闭: </Text>
        <Text type='sub'>{close}</Text>
      </Flex>
    )
  }

  if (!$.isWebLogin || $.isLimit) return null

  return (
    <FixedTextarea
      ref={fixedTextareaRef}
      placeholder={placeholder ? `回复 ${placeholder}` : undefined}
      value={value}
      source
      onChange={$.onChange}
      onClose={$.closeFixedTextarea}
      onSubmit={$.doSubmit}
    />
  )
}

export default obc(Bottom)

const memoStyles = _.memoStyles(() => ({
  fixedBottom: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    paddingVertical: 12,
    paddingHorizontal: _.wind,
    marginBottom: -4,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    ...(IOS
      ? {
          paddingBottom: 32,
          shadowColor: _.colorShadow,
          shadowOffset: {
            height: -2
          },
          shadowOpacity: 0.06,
          shadowRadius: 6
        }
      : {
          elevation: 8
        })
  }
}))
