/*
 * @Author: czy0729
 * @Date: 2019-09-15 10:54:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:07:04
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function MenuItem(
  {
    style = undefined,
    index = undefined,
    iconStyle = undefined,
    pathname = undefined,
    config = undefined,
    title = undefined,
    icon = undefined
  },
  { navigation }: Ctx
) {
  const styles = memoStyles()
  const num = _.portrait(2, 4)
  return (
    <Touchable
      style={stl(styles.container, index % num === 0 && styles.left)}
      onPress={() => {
        t('小圣杯.跳转', {
          to: pathname,
          ...config
        })

        navigation.push(pathname, config)
      }}
    >
      <Flex style={stl(styles.block, style)}>
        <Text type='tinygrailPlain' size={18} bold>
          {title}
        </Text>
        <Iconfont
          style={iconStyle ? [styles.icon, iconStyle] : styles.icon}
          name={icon}
          size={46}
        />
      </Flex>
    </Touchable>
  )
}

export default obc(MenuItem)
