/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 23:26:08
 */
import { observer } from 'mobx-react'
import { Component, flexStyle, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconBackProps } from './types'
export type { IconBackProps }

export const IconBack = observer(
  ({ navigation, style, color = _.colorPlain, shadow }: IconBackProps) => {
    r(COMPONENT)

    return (
      <Component id='icon-back'>
        <Touchable
          style={stl(flexStyle({ justify: 'center' }), styles.touch, style, styles.icon)}
          onPress={navigation.goBack}
        >
          <Iconfont name='md-arrow-back' color={color} shadow={shadow} />
        </Touchable>
      </Component>
    )
  }
)

export default IconBack
