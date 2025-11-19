/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 16:58:09
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, monoStore, tinygrailStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Favor from '../favor'
import Extra from './extra'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function ExtraWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const isCharacter = $.monoId.includes('character')
    const showTinygrail = $.tinygrail
    const level = isCharacter && showTinygrail ? tinygrailStore.characters($.id)?.level : 0

    const showPic = isCharacter && Number($.commentLength) >= 8
    const picTotal = showPic ? monoStore.picTotal($.cn) : 0

    return (
      <>
        {isCharacter && (
          <>
            {showTinygrail && (
              <Extra
                navigation={navigation}
                monoId={$.monoId}
                level={level}
                canICO={$.canICO}
                icoUsers={$.chara.users}
                doICO={$.doICO}
              />
            )}
            {showPic && (
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
