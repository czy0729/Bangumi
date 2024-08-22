/*
 * @Author: czy0729
 * @Date: 2024-08-22 16:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:09:11
 */
import { Fn } from '@types'

export function postTask(
  callback: Fn,
  delay: number = 1000,
  /**
   * 优先级
   *  - user-blocking 最高优先级是用于阻止用户与页面交互的任务，例如渲染核心体验或响应用户输入。
   *  - user-visible  第二高优先级是用于用户可见但不一定阻止用户操作的任务，例如呈现页面的次要部分。这是默认优先级。
   *  - background    最低优先级是用于不是时间紧迫的任务，例如后台日志处理或初始化某些第三方库
   */
  priority: 'user-blocking' | 'user-visible' | 'background' = 'background'
) {
  // @ts-ignore
  if (typeof window?.scheduler === 'undefined') {
    setTimeout(() => {
      callback()
    }, delay)
    return
  }

  // @ts-ignore
  window.scheduler.postTask(callback, {
    delay: priority === 'background' ? Math.max(160, delay) : delay,
    priority
  })
}
