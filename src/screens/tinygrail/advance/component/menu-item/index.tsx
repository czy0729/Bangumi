/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:41:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:03:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { memoStyles } from './styles'

import type { Props } from './types'

function MenuItem({ navigation, style, pathname, title, icon }: Props) {
  const styles = memoStyles()

  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push(pathname as any)

        t('高级分析.跳转', {
          to: pathname
        })
      }}
    >
      <Flex style={stl(styles.block, style)}>
        <Text type='tinygrailPlain' size={18} bold>
          {title}
        </Text>
        <Iconfont style={styles.icon} name={icon} size={46} />
      </Flex>
    </Touchable>
  )
}

export default observer(MenuItem)
