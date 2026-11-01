/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 03:54:00
 *
 * 目录列表 (工具栏 + 可展开的目录分组)
 */
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { Collapsible, Divider, Empty } from '@components'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { memoStyles } from '../styles'
import Catalog from '../catalog'
import Subjects from '../subjects'
import ToolBar from '../tool-bar'

import type { SubjectId } from '@types'
import type { UseFolderManageModalReturn } from '../hooks/useFolderManageModal'

function List({ id, vm }: { id: SubjectId; vm: UseFolderManageModalReturn }) {
  const styles = memoStyles()

  return (
    <>
      <ToolBar sortType={vm.sortType} sortOrder={vm.sortOrder} onSortType={vm.onSortType} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.list}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {vm.list.map(item => {
          const detail = vm.catalogDetail(item.id)
          const expanded = vm.expand.includes(item.id) || vm.create == item.id
          return (
            <View key={item.id}>
              <Catalog
                id={id}
                expand={vm.expand}
                create={vm.create}
                edit={vm.edit}
                desc={vm.desc}
                privacy={vm.privacy}
                item={item}
                detail={detail}
                onChange={vm.onChange}
                onExpand={vm.onExpand}
                onToggle={vm.onToggle}
                onControl={vm.onControl}
                onCreate={vm.onCreate}
                onSubmitCatalog={vm.onSubmitCatalog}
              />
              <Collapsible collapsed={!expanded}>
                <Subjects
                  id={id}
                  create={vm.create}
                  edit={vm.edit}
                  content={vm.content}
                  order={vm.order}
                  item={item}
                  detail={detail}
                  forwardRef={vm.forwardRef}
                  onChange={vm.onChange}
                  onOrder={vm.onOrder}
                  onSubjectEdit={vm.onSubjectEdit}
                  onSubjectControl={vm.onSubjectControl}
                  onSubmit={vm.onSubmit}
                />
              </Collapsible>
              {vm.expand.includes(item.id) && <Divider style={styles.divider} />}
            </View>
          )
        })}
        {!vm.create && !vm.list.length && <Empty text='还没有创建过目录' />}
      </ScrollView>
    </>
  )
}

/** 目录详情在渲染期从 store 读取, 需要订阅才能在首次拉取完成时刷新 */
export default observer(List)
