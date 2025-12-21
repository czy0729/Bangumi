/*
 * @Author: czy0729
 * @Date: 2019-09-15 10:54:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:21:51
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function MenuItem({ style, index, iconStyle, pathname, config, title, icon }: Props) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const num = _.portrait(2, 4)
  return (
    <Touchable
      style={stl(styles.container, index % num === 0 && styles.left)}
      onPress={() => {
        navigation.push(pathname, config)

        t('小圣杯.跳转', {
          to: pathname,
          ...config
        })
      }}
    >
      <Flex style={stl(styles.block, style)}>
        <Text type='tinygrailPlain' size={18} bold>
          {title}
        </Text>
        <Iconfont style={stl(styles.icon, iconStyle)} name={icon} size={46} />
      </Flex>
    </Touchable>
  )
}

export default ob(MenuItem, COMPONENT)
