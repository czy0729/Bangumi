/*
 * @Author: czy0729
 * @Date: 2024-08-14 06:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-14 07:22:18
 */
import React from 'react'
import { _ } from '@stores'
import ToggleImage from '../toggle-image'

export function img({ key, src, autoSize, show, onImageFallback }) {
  return (
    <ToggleImage
      key={key}
      style={_.mt.xs}
      src={src || ''}
      autoSize={autoSize}
      placeholder={false}
      imageViewer
      show={show}
      onImageFallback={() => onImageFallback(src)}
    />
  )
}
