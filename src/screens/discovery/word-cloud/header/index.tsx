/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:53:17
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2, Iconfont, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { info } from '@utils'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { trend } = $.state

  const handleHeaderRight = useCallback(
    () => (
      <>
        {!$.userId && !!trend && (
          <Touchable
            onPress={() => {
              info(`${trend} 人次访问`)
            }}
          >
            <Flex>
              <Iconfont name='md-whatshot' size={20} color='rgba(255, 255, 255, 0.64)' />
              <Text style={styles.trend} type='__plain__' size={13} bold>
                {trend}
              </Text>
            </Flex>
          </Touchable>
        )}
        <IconTouchable
          name='md-info-outline'
          size={20}
          color='rgba(255, 255, 255, 0.64)'
          onPress={() => {
            navigation.push('Information', {
              title: '词云',
              message: [
                '数据是从官方用户收藏 API 批量获取的。',
                '因参与计算的数据会因收藏条目的递增呈爆炸式增长，所以目前每次批量获取只取了想看前 2 页、在看前 3 页、看过前 5 页，每页 100 个。',
                '瞬间过多的计算可能会导致客户端崩溃闪退，若出现请适当使用筛选减少计算的范围，以得到你需要的结果。'
              ]
            })

            t('词云.跳转', {
              to: 'Information'
            })
          }}
        />
      </>
    ),
    [$, navigation, trend]
  )

  return (
    <HeaderV2
      transparent
      title={$.title ? `${$.title}的词云` : '词云'}
      hm={$.hm}
      color={_.__colorPlain__}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
