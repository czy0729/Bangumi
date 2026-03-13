/*
 * @Author: czy0729
 * @Date: 2025-03-08 21:20:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:40:32
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Avatar, Popover } from '@components'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Mono({ id }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const detail = $.detail(id)
    const data = useMemo(
      () =>
        [detail?.monoName, detail?.monoIcoId && 'ICO', '买入', '卖出', 'K线', '资产重组'].filter(
          item => !!item
        ),
      [detail?.monoIcoId, detail?.monoName]
    )
    const el = useMemo(
      () => <Avatar src={detail?.monoAvatar} size={40} round />,
      [detail?.monoAvatar]
    )
    const handleSelect = useCallback(
      (title: string) => {
        switch (title) {
          case 'ICO':
            navigation.push('TinygrailICODeal', {
              monoId: String(detail?.monoId)
            })
            break

          case '买入':
            navigation.push('TinygrailDeal', {
              monoId: String(detail?.monoId),
              type: 'bid'
            })
            break

          case '卖出':
            navigation.push('TinygrailDeal', {
              monoId: String(detail?.monoId),
              type: 'ask'
            })
            break

          case 'K线':
            navigation.push('TinygrailTrade', {
              monoId: String(detail?.monoId)
            })
            break

          case '资产重组':
            navigation.push('TinygrailSacrifice', {
              monoId: String(detail?.monoId)
            })
            break

          default:
            navigation.push('Mono', {
              monoId: `character/${detail?.monoId}`,
              _name: detail?.monoName
            })
            break
        }
      },
      [detail?.monoId, detail?.monoName]
    )

    return (
      <View style={styles.mono}>
        <Popover data={data} onSelect={handleSelect}>
          {el}
        </Popover>
      </View>
    )
  })
}

export default Mono
