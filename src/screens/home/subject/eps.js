/*
 * @Author: czy0729
 * @Date: 2021-08-07 07:13:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-27 07:30:43
 */
import React from 'react'
import { Eps as CompEps } from '@screens/_'
import { HoldMenuProvider } from '@components/@/react-native-hold-menu'
import { _ } from '@stores'
import { window, wind } from '@styles'
import { obc } from '@utils/decorators'

const layoutWidth = parseInt(window.width - wind) - 1

function Eps(props, { $, navigation }) {
  rerender('Subject.Eps')

  const canPlay = $.onlinePlayActionSheetData.length >= 2
  const showPlay = !$.isLimit && canPlay
  return (
    <HoldMenuProvider theme='dark'>
      <CompEps
        layoutWidth={layoutWidth}
        marginRight={_.isLandscape ? 0 : _._wind}
        advance
        pagination
        login={$.isLogin}
        subjectId={$.params.subjectId}
        eps={$.toEps}
        userProgress={$.userProgress}
        canPlay={showPlay}
        onSelect={(value, item) => $.doEpsSelect(value, item, navigation)}
        onLongPress={item => $.doEpsLongPress(item)}
      />
    </HoldMenuProvider>
  )
}

export default obc(Eps)
