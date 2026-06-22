/*
 * @Author: czy0729
 * @Date: 2026-06-22 19:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 19:43:53
 */
import React from 'react'

import type { ViewProps } from 'react-native'

interface BlurRootProps extends ViewProps {
  name?: string
}

interface BlurProps extends ViewProps {
  blurNode?: string
  radius?: number
}

export class BlurRootView extends React.Component<BlurRootProps> {}
export class BlurView extends React.Component<BlurProps> {}
