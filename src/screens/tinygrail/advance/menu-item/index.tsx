/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:41:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:39:25
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props } from './types'

function MenuItem({ navigation, style, pathname, config, title, icon }: Props) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        t('高级分析.跳转', {
          to: pathname,
          ...config
        })

        navigation.push(pathname, config)
      }}
    >
      <Flex style={[styles.block, style]}>
        <Text type='tinygrailPlain' size={18} bold>
          {title}
        </Text>
        <Iconfont style={styles.icon} name={icon} size={46} />
      </Flex>
    </Touchable>
  )
}

export default ob(MenuItem)
