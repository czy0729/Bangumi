/*
 * @Author: czy0729
 * @Date: 2024-07-28 05:05:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:40:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { MODEL_PRIVATE } from '@constants'
import { styles } from './styles'

import type { Props } from './types'

function Submit({ disabled, privacy, onTogglePrivacy, onSubmit }: Props) {
  const label = MODEL_PRIVATE.getLabel(privacy)
  const isPrivate = label === '私密'

  return (
    <Flex style={_.mt.md}>
      <Flex.Item>
        <Button style={styles.btn} type='main' loading={disabled} onPress={onSubmit}>
          更新
        </Button>
      </Flex.Item>

      <Button
        style={styles.privacy}
        type={isPrivate ? 'ghostPlain' : 'ghostMain'}
        extra={
          isPrivate && (
            <Iconfont style={_.ml.xs} name='md-visibility-off' color={_.colorSub} size={16} />
          )
        }
        onPress={onTogglePrivacy}
      >
        {label}
      </Button>
    </Flex>
  )
}

export default observer(Submit)
