/*
 * @Author: czy0729
 * @Date: 2026-09-09 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { colors } from '../utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** 模式头部 (transition / float): Transition 渐显层 + 返回键 + 左右节点 */
function HeaderMode({
  fixed,
  title,
  statusBarEventsType,
  onBackPress,
  headerLeft,
  headerTitle,
  color,
  headerRight
}: Props) {
  r(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const backColor = color || colors[statusBarEventsType]?.(fixed)

  return (
    <Flex
      style={stl(styles.header, {
        height: headerHeight,
        paddingTop: statusBarHeight
      })}
    >
      <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
      <Back style={styles.back} color={backColor} onPress={onBackPress} />
      {headerLeft}
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Flex>
  )
}

export default observer(HeaderMode)
