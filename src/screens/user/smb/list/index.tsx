/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 09:52:28
 */
import React from 'react'
import { Empty, ScrollView } from '@components'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import Top from '../top'
import Filter from '../filter'
import Item from '../item'
import Pagination from '../pagination'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { uuid, sort, tags, page, refreshKey } = $.state
  return (
    <>
      <Top />
      {$.pageList.length ? (
        <>
          <ScrollView
            key={`${uuid}|${sort}|${JSON.stringify(tags)}|${page}|${refreshKey}`}
          >
            <Filter />
            {$.pageList.map((item, index) => (
              <Item key={String(item?.name || index)} {...item} />
            ))}
          </ScrollView>
          <Pagination />
        </>
      ) : (
        <Empty
          text={
            $.smbs.length
              ? `当前没有文件夹数据\n${
                  STORYBOOK
                    ? '请确保你选择的文件夹存在文件或者有权限读取'
                    : '请先点击右上方菜单扫描文件夹'
                }`
              : `当前没有服务器数据\n请先点击右上方菜单新增服务`
          }
        />
      )}
    </>
  )
}

export default obc(List)
