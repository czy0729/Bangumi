/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:15:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useNavigation } from '@utils/hooks'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { Props } from './type'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Back({ style, color, onPress }: Props) {
  r(COMPONENT)

  const navigation = useNavigation()
  return (
    <Touchable style={stl(styles.touch, style)} onPress={onPress || navigation?.goBack}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-arrow-back' color={color || _.colorTitle} />
      </Flex>
    </Touchable>
  )
}

export default observer(Back)
