/*
 * @Author: czy0729
 * @Date: 2024-07-28 05:05:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 10:20:00
 */
import { observer } from 'mobx-react'
import { Button, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { MODEL_PRIVATE } from '@constants'
import FlipBtn from './flip-btn'
import { styles } from './styles'

import type { Props } from './types'

function Submit({
  disabled,
  flipLabel = '',
  flipKey = 0,
  privacy,
  onTogglePrivacy,
  onSubmit
}: Props) {
  const label = MODEL_PRIVATE.getLabel(privacy)
  const isPrivate = label === '私密'

  return (
    <Flex style={_.mt.md}>
      <Flex.Item>
        <FlipBtn
          key={flipKey}
          style={styles.btn}
          disabled={disabled}
          flipLabel={flipLabel}
          onSubmit={onSubmit}
        />
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
