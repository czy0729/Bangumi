/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 15:00:13
 */
import React from 'react'
import { Heatmap, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnFavor({ index, subjectId, subject }, { $ }) {
  return (
    <Touchable
      style={styles.btn}
      onPress={() =>
        $.showManageModal(subjectId, {
          title: subject.name_cn || subject.name,
          desc: subject.name
        })
      }
    >
      <Iconfont name='star' size={18} />
      {index === 1 && <Heatmap id='首页.显示收藏管理' />}
    </Touchable>
  )
}

export default obc(BtnFavor)

const styles = _.create({
  btn: {
    paddingLeft: _.sm,
    paddingRight: _.sm + 2,
    marginLeft: _.sm
  }
})
