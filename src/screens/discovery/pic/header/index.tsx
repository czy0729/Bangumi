/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 20:36:07
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import Menu from '../component/menu'
import { COMPONENT, HM } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { fetching, percent } = $.state
  const hasData = !!$.list.length

  const elHeaderTitleAppend = useMemo(
    () =>
      hasData &&
      fetching && (
        <Flex style={styles.loading}>
          <Loading.Medium color={_.colorSub} />
          {!!percent && (
            <Text style={_.ml.xs} type='sub' size={12} bold>
              {percent}
            </Text>
          )}
        </Flex>
      ),
    [fetching, hasData, percent, styles]
  )

  const handleHeaderRight = useCallback(
    () => (
      <>
        {/* <IconTouchable
          style={_.mr.xs}
          name='md-star-outline'
          color={_.colorDesc}
          onPress={$.onToggleFavor}
        /> */}
        <Menu />
      </>
    ),
    []
  )

  return (
    <HeaderV2
      backgroundStyle={styles.background}
      title={$.keyword || '图集'}
      headerTitleAppend={elHeaderTitleAppend}
      headerRight={handleHeaderRight}
      hm={HM}
    />
  )
}

export default observer(Header)
