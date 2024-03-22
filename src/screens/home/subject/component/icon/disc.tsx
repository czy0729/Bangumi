/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-17 07:34:18
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconDisc(props, { $ }: Ctx) {
  return (
    <IconTouchable style={styles.disc} name='md-g-translate' size={18} onPress={$.doDiscTranslate}>
      <Heatmap id='条目.翻译曲目' />
    </IconTouchable>
  )
}

export default obc(IconDisc)

const styles = _.create({
  disc: {
    marginLeft: _.sm,
    marginRight: -_.sm
  }
})
