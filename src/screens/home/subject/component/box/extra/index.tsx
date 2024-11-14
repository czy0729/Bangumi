/*
 * @Author: czy0729
 * @Date: 2023-06-29 14:15:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:33:48
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Iconfont } from '@components'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import IconActions from '../../icon/actions'
import IconGame from '../../icon/game'
import IconOnline from '../../icon/online'
import IconSearch from '../../icon/search'
import IconSearchDisc from '../../icon/search-disc'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Extra() {
  const { $ } = useStore<Ctx>()
  if (!systemStore.setting.focusOrigin) return null

  // 设置的实现: [自定义跳转] 和 [若有自定义跳转隐藏通用源头按钮]
  const hasActions = !!$.actions.length
  let Component: typeof IconOnline | typeof IconSearch | typeof IconGame | typeof IconSearchDisc
  let elOrigin: React.ReactNode
  if (!(systemStore.setting.focusAction && hasActions)) {
    if ($.type === '动画' || $.type === '三次元') {
      Component = IconOnline
    } else if ($.type === '书籍') {
      Component = IconSearch
    } else if ($.type === '游戏') {
      Component = IconGame
    } else if ($.type === '音乐') {
      Component = IconSearchDisc
    }
    if (Component)
      elOrigin = (
        <View style={styles.container}>
          <Component>
            <Flex style={stl(styles.extra, !hasActions && styles.extraLg)}>
              <Button
                style={styles.btn}
                type={_.select('ghostPlain', 'plain')}
                extra={<Iconfont name='md-airplay' size={17} />}
              />
            </Flex>
          </Component>
        </View>
      )
  }

  return (
    <>
      {elOrigin}
      {hasActions && (
        <View style={styles.container}>
          <IconActions>
            <Flex style={[styles.extra, !elOrigin && styles.extraLg]}>
              <Button
                style={styles.btn}
                type={_.select('ghostPlain', 'plain')}
                extra={<Iconfont name='md-read-more' size={25} />}
              />
            </Flex>
          </IconActions>
        </View>
      )}
    </>
  )
}

export default ob(Extra, COMPONENT)
