/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 17:01:29
 */
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { StorybookScroll } from '../../storybook'
import { Flex } from '../../flex'
import { AnyObject, Fn } from '@types'

function List({
  contentContainerStyle,
  keyExtractor,
  sections,
  data,
  pagination,
  numColumns,
  showFooter,
  ListHeaderComponent,
  renderSectionHeader,
  renderItem,
  renderFooter,
  onFooterRefresh,
  onScroll
}: AnyObject<{
  data: any[]
  renderItem: Fn
  renderSectionHeader?: Fn
  onFooterRefresh?: Fn
  onScroll?: Fn
}>) {
  let content: ReactNode
  if (sections) {
    content = sections.map((section: any, index: number) => (
      <View key={`section-${index}`}>
        {renderSectionHeader({ section })}
        {(section.data || [])
          .map(item => {
            const element = renderItem({
              item,
              section
            })

            if (element) {
              const key =
                typeof keyExtractor === 'function'
                  ? `section-item-${keyExtractor(item, index)}`
                  : `section-item-${index}`

              return React.cloneElement(element, {
                key
              })
            }
            return null
          })
          .filter(item => !!item)}
      </View>
    ))
  } else {
    content = data
      .map((item: any, index: number) => {
        const element = renderItem({
          item,
          index
        })
        if (element) {
          const key =
            typeof keyExtractor === 'function'
              ? `list-item-${keyExtractor(item, index)}`
              : `list-item-${index}`

          return React.cloneElement(element, {
            key
          })
        }
        return null
      })
      .filter(item => !!item)
  }

  return (
    <StorybookScroll
      style={contentContainerStyle}
      onScroll={onScroll}
      onFooterRefresh={() => {
        if (pagination?.page < pagination?.pageTotal) onFooterRefresh()
      }}
    >
      {React.isValidElement(ListHeaderComponent) ? (
        ListHeaderComponent
      ) : ListHeaderComponent ? (
        <ListHeaderComponent />
      ) : null}
      {numColumns > 1 ? (
        <Flex style={styles.columnsContainer} wrap='wrap'>
          {content}
        </Flex>
      ) : (
        content
      )}
      {showFooter !== false && renderFooter}
    </StorybookScroll>
  )
}

export default observer(List)

const styles = _.create({
  columnsContainer: {
    alignItems: 'flex-start'
  }
})
