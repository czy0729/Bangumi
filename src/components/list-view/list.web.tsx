/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 17:11:42
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { StorybookScroll } from '../storybook'
import { Flex } from '../flex'

function List({
  contentContainerStyle,
  keyExtractor,
  sections,
  data,
  pagination,
  numColumns,
  ListHeaderComponent,
  renderSectionHeader,
  renderItem,
  renderFooter,
  onFooterRefresh,
  onScroll
}) {
  let content: unknown
  if (sections) {
    content = sections.map((section: any, index: number) => (
      <View key={`section-${index}`}>
        {renderSectionHeader({ section })}
        {renderItem({
          item: section.data[0],
          section
        })}
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
          return React.cloneElement(element, {
            key:
              (typeof keyExtractor === 'function' ? keyExtractor(item, index) : '') ||
              `item-${index}`
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
      {renderFooter}
    </StorybookScroll>
  )
}

export default observer(List)

const styles = _.create({
  columnsContainer: {
    alignItems: 'flex-start'
  }
})
