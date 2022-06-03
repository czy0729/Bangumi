/*
 * @Author: czy0729
 * @Date: 2022-06-03 12:34:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 16:31:46
 */
import React from 'react'
import { Pagination as CompPagination, KeyboardSpacer } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const heatmaps = {
  prev: '排行榜.上一页',
  next: '排行榜.下一页',
  search: '排行榜.页码跳转'
} as const

function Pagination(props, { $ }) {
  const { type, ipt } = $.state
  return (
    <>
      <CompPagination
        style={styles.pagination}
        input={ipt[type]}
        heatmaps={heatmaps}
        onPrev={$.onPrev}
        onNext={$.onNext}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
      <KeyboardSpacer />
    </>
  )
}

export default obc(Pagination)

const styles = _.create({
  pagination: {
    marginTop: _.xs,
    marginBottom: _.ios(_.md + _.sm, _.md)
  }
})
