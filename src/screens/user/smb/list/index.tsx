/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 17:31:42
 */
import React from 'react'
import { View } from 'react-native'
import { Empty, Flex, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { SubjectId } from '@types'
import Top from '../top'
import Filter from '../filter'
import Item from '../item'
import ItemGrid from '../item-grid'
import Pagination from '../pagination'
import { Ctx, MergeListItem } from '../types'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  const { uuid, sort, tags, page, refreshKey, configs } = $.state
  if (
    `${uuid}|${sort}|${JSON.stringify(tags)}|${page}|${refreshKey}` &&
    !$.pageList.length
  ) {
    return (
      <>
        {!!$.smbs.length && (
          <>
            <Top />
            <Filter />
          </>
        )}
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
      </>
    )
  }

  // 合并同一条目的文件夹
  const indexMap: Record<SubjectId, number> = {}
  const mergeList: MergeListItem[] = []
  $.pageList.forEach(item => {
    const { subjectId } = item
    if (!subjectId || !(subjectId in indexMap)) {
      mergeList.push(item)
      indexMap[subjectId] = mergeList.length - 1
      return
    }

    // 使用新的 merge 归并同类项
    const index = indexMap[subjectId]
    if (mergeList[index].merge) {
      mergeList[index].merge.push(item)
    } else {
      mergeList[index] = {
        ...mergeList[index],
        merge: [item]
      }
    }
  })

  const { layoutGridNums } = configs
  return (
    <>
      <Top />
      <ScrollView
        key={`${uuid}|${sort}|${JSON.stringify(tags)}|${page}|${refreshKey}`}
        contentContainerStyle={styles.scrollView}
      >
        <Filter />
        {configs.layoutList ? (
          mergeList.map((item, index) => (
            <Item key={String(item?.name || index)} {...item} />
          ))
        ) : (
          <Flex style={styles.grids} justify='between' wrap='wrap'>
            {mergeList.map((item, index) => (
              <ItemGrid key={String(item?.name || index)} {...item} />
            ))}
            {Array(layoutGridNums - 1)
              .fill('')
              .map((item, index) => (
                <View
                  key={index}
                  style={{
                    width:
                      (_.window.contentWidth - _.md * (layoutGridNums - 1)) /
                      layoutGridNums
                  }}
                />
              ))}
          </Flex>
        )}
      </ScrollView>
      <Pagination />
    </>
  )
}

export default obc(List)
