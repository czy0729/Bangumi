/*
 * @Author: czy0729
 * @Date: 2024-08-22 16:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 08:23:47
 */

/**
 * 执行一个任务，根据优先级和延迟调度
 * @param callback - 要执行的回调函数
 * @param delay - 延迟时间（毫秒，默认为1000）
 * @param priority - 任务优先级，默认为 'background'
 */
export function postTask(
  callback: () => void,
  delay: number = 1000,

  /**
   * 优先级
   *  - user-blocking 最高优先级是用于阻止用户与页面交互的任务，例如渲染核心体验或响应用户输入。
   *  - user-visible  第二高优先级是用于用户可见但不一定阻止用户操作的任务，例如呈现页面的次要部分。这是默认优先级。
   *  - background    最低优先级是用于不是时间紧迫的任务，例如后台日志处理或初始化某些第三方库
   */
  priority: 'user-blocking' | 'user-visible' | 'background' = 'background'
): void {
  // 检查浏览器是否支持 scheduler.postTask
  // @ts-ignore
  if (typeof window?.scheduler?.postTask === 'function') {
    // 调整 background 任务的最小延迟为 160ms
    const adjustedDelay = priority === 'background' ? Math.max(160, delay) : delay

    // @ts-ignore
    window.scheduler.postTask(callback, {
      delay: adjustedDelay,
      priority
    })
  } else {
    // 如果浏览器不支持 scheduler.postTask，使用 Promise 或 setTimeout 作为回退
    if (delay === 0) {
      // 使用微任务队列，确保尽快执行
      Promise.resolve().then(callback)
    } else {
      // 使用 setTimeout 模拟延迟
      setTimeout(callback, delay)
    }
  }
}
