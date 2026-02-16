/*
 * @Author: czy0729
 * @Date: 2025-06-14 01:34:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-14 01:43:06
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, monoStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const { name } = $.chara
    const picTotal = name ? monoStore.picTotal(name) : 0
    return (
      <TinygrailHeader
        title='ICO'
        hm={$.hm}
        headerRight={() =>
          !!name && (
            <Touchable
              style={styles.touch}
              onPress={() => {
                navigation.push('Pic', {
                  name
                })
              }}
            >
              <Flex>
                <Iconfont name='icon-image' size={19} color={_.colorTinygrailPlain} />
                {!!picTotal && (
                  <Text style={styles.num} type='tinygrailPlain' size={10} bold>
                    {picTotal > 99 ? '99+' : picTotal}
                  </Text>
                )}
              </Flex>
            </Touchable>
          )
        }
      />
    )
  })
}

export default Header
