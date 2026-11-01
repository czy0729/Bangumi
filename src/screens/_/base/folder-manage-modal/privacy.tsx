/*
 * @Author: czy0729
 * @Date: 2026-11-02 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 12:00:00
 *
 * 目录隐私设置选择行, 目录表单共用
 */
import { Flex, SegmentedControl, Text } from '@components'
import { _ } from '@stores'
import { feedback } from '@utils'
import { PRIVACY_DS } from './ds'

import type { Privacy } from './types'

const VALUES = PRIVACY_DS.map(item => item.label)

function PrivacyRow({ value, onChange }: { value: Privacy; onChange: (value: Privacy) => void }) {
  return (
    <Flex style={_.mt.md}>
      <Text type='sub' size={11} bold>
        隐私
      </Text>
      <SegmentedControl
        style={[_.ml.md, { width: _.r(88), height: _.r(28) }]}
        size={11}
        values={VALUES}
        selectedIndex={PRIVACY_DS.findIndex(item => item.value === value)}
        onValueChange={label => {
          const find = PRIVACY_DS.find(item => item.label === label)
          if (!find || find.value === value) return

          feedback(true)
          onChange(find.value)
        }}
      />
    </Flex>
  )
}

export default PrivacyRow
