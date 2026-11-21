package com.czy0729.bangumi;

/**
 * 系统长按文字菜单入口 (ACTION_PROCESS_TEXT)
 *  - 独立组件, 便于按设置开关整个入口 (PackageManager.setComponentEnabledSetting)
 *  - 转发逻辑复用 ShareActivity 的 onCreate
 */
public class ProcessTextActivity extends ShareActivity {}
