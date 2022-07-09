/*
 * @Doc: https://github.com/Flipkart/recyclerlistview
 * @Author: czy0729
 * @Date: 2022-07-07 21:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 02:03:44
 */
import React from 'react'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
// import isEqual from 'lodash.isequal'
import { _ } from '@stores'
import { Flex } from '../flex'
import { devLog } from '../dev'
import { getData } from './utils'
import { VIEW_TYPES, SCROLL_VIEW_PROPS, DIMENSION } from './ds'
import { ListViewRecyclerProps } from './types'
import { ListEmpty } from '@types'

export { ListViewRecyclerProps }

class ListViewRecycler extends React.Component<
  ListViewRecyclerProps,
  {
    dataProvider: DataProvider
  }
> {
  constructor(props) {
    super(props)

    const { keyExtractor, data, ListHeaderComponent, renderItem } = props
    this.layoutProvider = new LayoutProvider(
      index => {
        if (ListHeaderComponent && index === 0) return VIEW_TYPES.HEADER
        return VIEW_TYPES.ROW
      },
      (type, dim) => {
        dim.width = _.window.width
        if (type === VIEW_TYPES.HEADER) {
          dim.height = _.window.height
        } else {
          dim.height = 100
        }
      }
    )

    this.rowRenderer = (type, data, index) => {
      if (type === VIEW_TYPES.HEADER) {
        return <Flex.Item>{ListHeaderComponent}</Flex.Item>
      }

      return (
        <Flex.Item>
          {renderItem({
            item: data,
            index
          })}
        </Flex.Item>
      )
    }

    this.state = {
      dataProvider: new DataProvider((a, b) => {
        return keyExtractor(a) !== keyExtractor(b)
      }).cloneWithRows(getData(data, ListHeaderComponent))
    }
  }

  componentDidMount() {}

  layoutProvider: LayoutProvider

  rowRenderer: (type: string, data: ListEmpty, index: number) => JSX.Element

  onEndReached = () => {
    devLog('onEndReached')
  }

  render() {
    const { onScroll } = this.props
    const { dataProvider } = this.state
    return (
      <RecyclerListView
        layoutProvider={this.layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={this.rowRenderer}
        forceNonDeterministicRendering
        // initialRenderIndex={0}
        // renderAheadOffset={0}
        layoutSize={DIMENSION}
        scrollViewProps={SCROLL_VIEW_PROPS}
        onScroll={onScroll}
        // onEndReachedThresholdRelative={80}
        onEndReachedThreshold={80}
        onEndReached={this.onEndReached}
      />
    )
  }
}

export { ListViewRecycler }
