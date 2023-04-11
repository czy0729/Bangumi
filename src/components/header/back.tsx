/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:57:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Navigation, ColorValue } from '@types'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { styles } from './styles'

type Props = {
  navigation: Navigation

  /** 箭头颜色 */
  color?: ColorValue
}

function Back({ navigation, color }: Props) {
  return (
    <Touchable style={styles.touch} onPress={navigation.goBack}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-arrow-back' color={color || _.colorTitle} />
      </Flex>
    </Touchable>
  )
}

export default observer(Back)
