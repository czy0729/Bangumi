/*
 * @Author: czy0729
 * @Date: 2023-06-29 14:15:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 04:39:21
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Iconfont } from '@components'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { ReactComponent, ReactNode, SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import IconActions from '../../icon/actions'
import IconGame from '../../icon/game'
import IconOnline from '../../icon/online'
import IconSearch from '../../icon/search'
import IconSearchDisc from '../../icon/search-disc'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!systemStore.setting.focusOrigin) return null

    // 设置的实现: [自定义跳转] 和 [若有自定义跳转隐藏通用源头按钮]
    const hasActions = $.actions.length > 0

    // 类型映射表
    const typeMap: Record<SubjectTypeCn, ReactComponent> = {
      动画: IconOnline,
      三次元: IconOnline,
      书籍: IconSearch,
      游戏: IconGame,
      音乐: IconSearchDisc
    } as const

    let elOrigin: ReactNode
    if (!(systemStore.setting.focusAction && hasActions)) {
      const Component = typeMap[$.type]
      if (Component) {
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
    }

    return (
      <>
        {elOrigin}
        {hasActions && (
          <View style={styles.container}>
            <IconActions>
              <Flex style={stl(styles.extra, !elOrigin && styles.extraLg)}>
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
  })
}

export default Extra
