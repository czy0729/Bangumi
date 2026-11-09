/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 游戏信息区块 (截图 / 详情 / 相关视频)
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Component, Expand, Flex, Iconfont, Text } from '@components'
import { InView, Popover, PreventTouchPlaceholder } from '@_'
import { _, useStore } from '@stores'
import { open, stl } from '@utils'
import { getVideoSearchUrl } from '@utils/bilibili'
import { TITLE_GAME } from '../../ds'
import BlockAnchor from '../block-anchor'
import BlockTitle from '../block-title'
import IconPS from '../icon/ps'
import Split from '../split'
import Details from './details'
import ExternalThumbs from './externalThumbs'
import Thumbs from './thumbs'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Game({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { cn, jp } = $
  const isADV = $.gameInfo?.isADV

  const data = [cn || jp]
  if (cn && jp && jp !== cn) data.push(jp)
  const handleSelect = useCallback(
    (title: string) => {
      open(getVideoSearchUrl(title, isADV))
    },
    [isADV]
  )

  if (!$.showGame[1]) return null

  // 折叠态取纯布局值, 不混入 showGame 的 nsfw / 数据存在性判断
  const showGameInfo = $.layoutValue('showGameInfo') === true

  const shouldWrapExpand = !!$.gameInfo?.i
  const elContent = (
    <>
      <BlockTitle
        layoutKey='showGameInfo'
        style={_.container.wind}
        icon={!showGameInfo && 'md-navigate-next'}
        splitStyles
      >
        {TITLE_GAME}
      </BlockTitle>

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
      <BlockAnchor title={TITLE_GAME} onBlockRef={onBlockRef} />

      <InView style={stl(_.mt.lg, !showGameInfo && _.short)}>
        {shouldWrapExpand ? <Expand ratio={1.6}>{elContent}</Expand> : elContent}

        <Flex style={stl(_.container.wind, _.mt.sm)}>
          <Popover style={_.mr.sm} data={data} onSelect={handleSelect}>
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
