/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 21:38:13
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { B, M } from '@constants'
import { MODEL_TINYGRAIL_CACULATE_RICH_TYPE } from '@constants/model'

const caculateTypeData = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.data.map(
  item => item.label
)

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { caculateType, total = 0, filterItems } = $.state
  const caculateTypeLabel = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getLabel(
    caculateType
  )
  let totalText
  if (total > B) {
    totalText = `${toFixed(total / B, 1)}亿`
  } else if (total > M) {
    totalText = `${toFixed(total / M, 1)}万`
  } else {
    totalText = toFixed(parseFloat(total || 0), 1)
  }
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover
          data={caculateTypeData}
          onSelect={title => $.onCaculateTypeSelect(title)}
        >
          <Flex style={styles.item} justify='center'>
            <Text type='warning'>{caculateTypeLabel || '计算类型'}</Text>
            <Text style={_.ml.xs} type='warning' size={12}>
              {totalText}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover
          data={[
            '重置',
            ...filterItems.map(item => `${item.name} #${item.id}`)
          ]}
          onSelect={title => {
            t('前百首富.选择筛选', {
              title
            })

            if (title === '重置') {
              $.reset()
              return
            }

            const [name, id] = title.split(' #')
            $.onToggleItem({
              id,
              name
            })
          }}
        >
          <Flex style={styles.item} justify='center'>
            <Iconfont
              style={{
                color: filterItems.length
                  ? _.colorWarning
                  : _.colorTinygrailText
              }}
              name='filter'
              size={14}
            />
            <Text
              style={_.ml.sm}
              type={filterItems.length ? 'warning' : 'tinygrailText'}
            >
              {filterItems.length || '-'}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
    </Flex>
  )
}

ToolBar.contextTypes = {
  $: PropTypes.object
}

export default observer(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    height: _.isPad ? 50 : 44,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingVertical: _.sm + 4
  },
  touchable: {
    paddingHorizontal: _.lg
  }
}))
