/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 17:32:42
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { TITLE_INFO } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Info from './info.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function InfoWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showInfo[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-info'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_INFO)} />
        <Info
          navigation={navigation}
          styles={memoStyles()}
          subjectId={$.subjectId}
          showInfo={systemStore.setting.showInfo}
          subjectHtmlExpand={systemStore.setting.subjectHtmlExpand}
          info={$.rawInfo.replace('展开+', '')}
          name={cnjp($.cn, $.jp)}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split />
      </Component>
    </Suspense>
  )
}

export default ob(InfoWrap, COMPONENT)
