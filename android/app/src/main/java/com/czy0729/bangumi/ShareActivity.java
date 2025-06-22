package com.czy0729.bangumi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class ShareActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 1. 获取并解析传入的 Intent
    Intent receivedIntent = getIntent();
    String action = receivedIntent.getAction();
    String type = receivedIntent.getType();
    String sharedText = null;

    // 兼容 ACTION_PROCESS_TEXT (长按菜单) 和 ACTION_SEND (分享菜单)
    if (Intent.ACTION_PROCESS_TEXT.equals(action) && "text/plain".equals(type)) {
      sharedText = receivedIntent.getStringExtra(Intent.EXTRA_PROCESS_TEXT);
    } else if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
      sharedText = receivedIntent.getStringExtra(Intent.EXTRA_TEXT);
    }

    // 2. 创建启动 MainActivity 的新 Intent
    if (sharedText != null) {
      Intent mainActivityIntent = new Intent(this, MainActivity.class);

      // 关键！设置 Flags
      // FLAG_ACTIVITY_NEW_TASK: 在新任务栈中启动，解决了覆盖当前应用的问题
      // FLAG_ACTIVITY_CLEAR_TOP 和 FLAG_ACTIVITY_SINGLE_TOP:
      // 如果 MainActivity 已存在，则将其带到前台并调用 onNewIntent，而不是创建新实例
      mainActivityIntent.addFlags(
        Intent.FLAG_ACTIVITY_NEW_TASK |
        Intent.FLAG_ACTIVITY_CLEAR_TOP |
        Intent.FLAG_ACTIVITY_SINGLE_TOP
      );

      // 使用自定义的 Action 和 Extra，让 MainActivity 的处理逻辑更清晰
      mainActivityIntent.setAction("com.czy0729.bangumi.ACTION_SHARE_TEXT");
      mainActivityIntent.putExtra("shared_text", sharedText);

      startActivity(mainActivityIntent);
    }

    // 3. 无论成功与否，都立即销毁这个中转 Activity
    finish();
  }
}
