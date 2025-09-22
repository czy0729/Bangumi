/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 17:19:29
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Expand } from '@components'
import { InView, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { TITLE_GAME } from '../../ds'
import { Ctx } from '../../types'
import IconHidden from '../icon/hidden'
import IconPic from '../icon/pic'
import IconPS from '../icon/ps'
import Split from '../split'
import Details from './details'
import Thumbs from './thumbs'
import { COMPONENT } from './ds'
import { Props } from './types'

function Game({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showGame[1]) return null

    const { showGameInfo } = systemStore.setting
    return (
      <Component id='screen-subject-game'>
        <View
          ref={ref => onBlockRef(ref, TITLE_GAME)}
          style={_.container.layout}
          collapsable={false}
        />
        <InView style={stl(_.mt.lg, !showGameInfo && _.short)}>
          <Expand>
            <SectionTitle
              style={_.container.wind}
              right={
                !showGameInfo ? (
                  <IconHidden name={TITLE_GAME} value='showGameInfo' />
                ) : (
                  !$.gameInfo?.isADV && <IconPS />
                )
              }
              icon={!showGameInfo && 'md-navigate-next'}
              splitStyles
              onPress={() => $.onSwitchBlock('showGameInfo')}
            >
              {TITLE_GAME}
            </SectionTitle>
            {showGameInfo && (
              <>
                <Thumbs />
                <Details />
              </>
            )}
            <PreventTouchPlaceholder />
          </Expand>
          <View
            style={[
              _.container.wind,
              {
                marginTop: 4,
                marginLeft: -2
              }
            ]}
          >
            <IconPic />
          </View>
        </InView>
        <Split />
      </Component>
    )
  })
}

export default Game
