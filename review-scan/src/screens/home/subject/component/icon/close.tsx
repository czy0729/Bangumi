/*
 * @Author: czy0729
 * @Date: 2021-01-16 19:14:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:45:48
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { confirm, info } from '@utils'
import { ob } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import i18n from '@constants/i18n'
import { Ctx } from '../../types'
import { styles } from './styles'

const HIT_SLOP = {
  top: 6,
  right: _.device(2, 4),
  bottom: 6,
  left: _.device(2, 4)
} as const

function IconClose() {
  const { $ } = useStore<Ctx>()
  if (SHARE_MODE) return null

  return (
    <IconTouchable
      style={styles.close}
      name='md-close'
      color={_.colorIcon}
      hitSlop={HIT_SLOP}
      onPress={() => {
        const { status = { name: '未收藏' } } = $.collection
        if (status.name === '未收藏') {
          info('当前未收藏')
          return
        }

        if (!$.subjectFormHTML.formhash) {
          info(`无法操作, 请检查${i18n.login()}状态`)
          return
        }

        confirm('确定删除收藏?', () => $.doEraseCollection())
      }}
    >
      <Heatmap id='条目.删除收藏' />
    </IconTouchable>
  )
}

export default ob(IconClose)
