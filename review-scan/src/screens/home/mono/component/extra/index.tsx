/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 00:34:13
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, monoStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Favor from '../favor'
import Extra from './extra'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ExtraWrap() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const picTotal = monoStore.picTotal($.cn)
    return (
      <>
        {$.monoId.includes('character') && (
          <>
            {$.tinygrail && (
              <Extra
                navigation={navigation}
                monoId={$.monoId}
                canICO={$.canICO}
                icoUsers={$.chara.users}
                doICO={$.doICO}
              />
            )}
            {Number($.params._count) >= 8 && (
              <Touchable
                style={styles.pic}
                onPress={() => {
                  navigation.push('Pic', {
                    name: $.cn,
                    keywords: [$.jp, $.params._subjectName]
                  })
                }}
              >
                <Flex>
                  <Iconfont name='icon-image' color={_.colorTitle} size={20} />
                  {!!picTotal && (
                    <Text style={styles.num} size={10} bold>
                      {picTotal > 99 ? '99+' : picTotal}
                    </Text>
                  )}
                </Flex>
              </Touchable>
            )}
          </>
        )}
        <Favor />
      </>
    )
  })
}

export default ExtraWrap
