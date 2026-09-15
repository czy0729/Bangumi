/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 04:32:42
 */
import { observer } from 'mobx-react'
import { Flex, Image, Squircle, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT, COVER_WIDTH } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function HeaderTitle() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Flex style={styles.container}>
      {!!$.groupThumb && (
        <Squircle width={COVER_WIDTH} height={COVER_WIDTH} radius={_.radiusXs}>
          <Image size={COVER_WIDTH} src={$.groupThumb} radius={0} />
        </Squircle>
      )}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {$.groupInfo.title}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(HeaderTitle)
