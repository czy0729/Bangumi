/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 05:08:59
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { useNavigation } from '@utils/hooks'
import { flexStyle } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { COMPONENT, HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Back({ style, color, onPress }: Props) {
  const navigation = useNavigation(COMPONENT)

  return (
    <Touchable
      style={stl(flexStyle({ justify: 'center' }), style, styles.icon)}
      hitSlop={HIT_SLOP}
      onPress={onPress || navigation?.goBack}
    >
      <Iconfont name='md-arrow-back' color={color || _.colorTitle} />
    </Touchable>
  )
}

export default observer(Back)
