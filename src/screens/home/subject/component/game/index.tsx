/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 07:35:14
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Expand, Flex, Iconfont, Text } from '@components'
import { InView, Popover, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, systemStore, useStore } from '@stores'
import { open, stl } from '@utils'
import { TITLE_GAME } from '../../ds'
import IconHidden from '../icon/hidden'
import IconPS from '../icon/ps'
import Split from '../split'
import Details from './details'
import ExternalThumbs from './externalThumbs'
import Thumbs from './thumbs'
import { getVideoSearchUrl } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Game({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { cn, jp } = $
  const isADV = $.gameInfo?.isADV

  const memoData = useMemo(() => {
    const data = [cn || jp]
    if (cn && jp && jp !== cn) data.push(jp)
    return data
  }, [cn, jp])
  const handleSelect = useCallback(
    (title: string) => {
      open(getVideoSearchUrl(title, isADV))
    },
    [isADV]
  )

  if (!$.showGame[1]) return null

  const { showGameInfo } = systemStore.setting

  const shouldWrapExpand = !!$.gameInfo?.i
  const elContent = (
    <>
      <SectionTitle
        style={_.container.wind}
        right={!showGameInfo && <IconHidden name={TITLE_GAME} value='showGameInfo' />}
        icon={!showGameInfo && 'md-navigate-next'}
        splitStyles
        onPress={() => $.onSwitchBlock('showGameInfo')}
      >
        {TITLE_GAME}
      </SectionTitle>

      {showGameInfo && (
        <>
          {$.hasExternalScreenshots ? <ExternalThumbs /> : <Thumbs />}
          <Details />
        </>
      )}

      <PreventTouchPlaceholder />
    </>
  )

  return (
    <Component id='screen-subject-game'>
      <View
        ref={ref => onBlockRef(ref, TITLE_GAME)}
        style={_.container.layout}
        collapsable={false}
      />

      <InView style={stl(_.mt.lg, !showGameInfo && _.short)}>
        {shouldWrapExpand ? <Expand ratio={1.6}>{elContent}</Expand> : elContent}

        <Flex style={[_.container.wind, _.mt.sm]}>
          <Popover style={_.mr.sm} data={memoData} onSelect={handleSelect}>
            <Flex>
              <Text type='sub' lineHeight={22}>
                相关视频
              </Text>
              <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} lineHeight={19} />
            </Flex>
          </Popover>
          {!$.gameInfo?.isADV && <IconPS />}
        </Flex>
      </InView>

      <Split />
    </Component>
  )
}

export default observer(Game)
