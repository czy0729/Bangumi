package com.czy0729.bangumi.restart;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.util.Log;

import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 应用重启与原生崩溃接管
 *  - restart(): 进程内重建 ReactContext (不退出应用); 拿不到 ReactInstanceManager 时回退为
 *    AlarmManager 挂 launch intent (100ms 后触发) 再杀进程
 *  - initialize(): 安装 UncaughtExceptionHandler, 原生崩溃把堆栈写入 files/crash/native_crash.txt
 *    (JS 侧下次启动读取并 err 上报) 后自动重启; 崩溃时间滚动记录在 crash/crash_times.txt,
 *    判定窗口期内达到上限不再自动重启, 防止稳定复现的崩溃陷入无限重启
 */
public class RestartModule extends ReactContextBaseJavaModule {
  private static final String TAG = "RestartModule";
  private static final String NAME = "RestartModule";
  private static final String CRASH_LOG_FILE = "crash/native_crash.txt";
  private static final String CRASH_TIMES_FILE = "crash/crash_times.txt";
  /** React Native DialogModule 的 Fragment tag (用于关闭残留的 Alert) */
  private static final String DIALOG_FRAGMENT_TAG = "com.facebook.catalyst.react.dialog.DialogModule";
  /**
   * 首次安装 handler 后 5s 内的原生崩溃不自动重启 (handler 只装一次, 以首个模块实例构造时刻为基准),
   * 疑似安装即崩溃, 交回系统默认处理
   */
  private static final long BOOT_GRACE_MS = 5000;
  /** 崩溃循环判定窗口: 窗口期外的历史崩溃不再计入 */
  private static final long CRASH_LOOP_WINDOW_MS = 10 * 60 * 1000;
  /** 窗口期内第 N 次崩溃起不再自动重启 (前 N-1 次重启之间给瞬时故障恢复的机会) */
  private static final int CRASH_RESTART_MAX = 3;
  private static final AtomicBoolean CRASH_HANDLER_INSTALLED = new AtomicBoolean(false);

  private final long initializedAt;

  RestartModule(ReactApplicationContext reactContext) {
    super(reactContext);
    initializedAt = SystemClock.elapsedRealtime();
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public void initialize() {
    super.initialize();
    if (CRASH_HANDLER_INSTALLED.getAndSet(true)) {
      return;
    }

    final Thread.UncaughtExceptionHandler original = Thread.getDefaultUncaughtExceptionHandler();
    final Context appContext = getReactApplicationContext().getApplicationContext();
    Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
      @Override
      public void uncaughtException(Thread thread, Throwable throwable) {
        try {
          Log.e(TAG, "Uncaught exception", throwable);
          saveCrashLog(appContext, throwable);

          // 先记录本次崩溃再判定, 启动保护期内的崩溃同样计入循环次数
          boolean crashLoop = isCrashLoop(appContext);
          boolean withinBootGrace = SystemClock.elapsedRealtime() - initializedAt < BOOT_GRACE_MS;

          // 崩溃循环保护或启动初期: 交回系统默认处理, 由用户决定是否重开
          if (crashLoop || withinBootGrace) {
            fallbackToOriginal(original, thread, throwable);
            return;
          }

          // 重启调度失败 (launch intent 拿不到 / AlarmManager 缺失) 同样回退,
          // 崩溃线程已死, 不能让进程既不退出也无系统崩溃框
          if (!scheduleRestart(appContext)) {
            fallbackToOriginal(original, thread, throwable);
          }
        } catch (Throwable handlerError) {
          Log.e(TAG, "Crash handler failed", handlerError);
          fallbackToOriginal(original, thread, throwable);
        }
      }
    });
  }

  /**
   * 进程内重建 ReactContext (等同 dev Reload), 不退出应用:
   * Android 10+ 后台启动限制下, 进程退出后由 AlarmManager 拉起 Activity 会被系统拦截
   */
  @ReactMethod
  public void restart() {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
        dismissAlertDialog();

        try {
          ReactInstanceManager manager = getReactInstanceManager();
          if (manager != null) {
            manager.recreateReactContextInBackground();
            return;
          }
        } catch (Throwable t) {
          Log.e(TAG, "Recreate ReactContext failed", t);
        }

        restartProcess();
      }
    });
  }

  /** 拿不到 ReactInstanceManager 时回退为进程重启 */
  private void restartProcess() {
    try {
      if (!scheduleRestart(getReactApplicationContext())) {
        Log.e(TAG, "Restart schedule failed");
      }
    } catch (Throwable t) {
      Log.e(TAG, "Restart failed", t);
    }
  }

  private ReactInstanceManager getReactInstanceManager() {
    Context appContext = getReactApplicationContext().getApplicationContext();
    if (appContext instanceof ReactApplication) {
      return ((ReactApplication) appContext).getReactNativeHost().getReactInstanceManager();
    }

    return null;
  }

  /** 关闭 RN 的 Alert 弹窗, 避免 ReactContext 重建后残留 */
  private void dismissAlertDialog() {
    Activity activity = getCurrentActivity();
    if (!(activity instanceof FragmentActivity)) return;

    FragmentManager manager = ((FragmentActivity) activity).getSupportFragmentManager();
    Fragment fragment = manager.findFragmentByTag(DIALOG_FRAGMENT_TAG);
    if (fragment instanceof DialogFragment) {
      ((DialogFragment) fragment).dismissAllowingStateLoss();
    }
  }

  /** 调试用: 主线程抛未捕获异常, 走 UncaughtExceptionHandler 链路 (开发菜单调用) */
  @ReactMethod
  public void testNativeCrash() {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
        throw new RuntimeException("Native Crash Test");
      }
    });
  }

  /** 交回系统默认处理; original 缺失或自身再抛时直接退出, 保证进程不假死 */
  private static void fallbackToOriginal(
      Thread.UncaughtExceptionHandler original,
      Thread thread,
      Throwable throwable) {
    if (original == null) {
      System.exit(1);
      return;
    }

    try {
      original.uncaughtException(thread, throwable);
    } catch (Throwable ignored) {
      System.exit(1);
    }
  }

  /** @return false 表示调度失败, 调用方需自行回退 (调度成功时进程已在 System.exit 退出) */
  private static boolean scheduleRestart(Context context) {
    Intent launchIntent = context.getPackageManager()
        .getLaunchIntentForPackage(context.getPackageName());
    if (launchIntent == null) {
      return false;
    }

    launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
    // targetSdk 31+ 要求显式声明 mutability, 启动 intent 无 extras 用 IMMUTABLE
    PendingIntent pendingIntent = PendingIntent.getActivity(
        context,
        0,
        launchIntent,
        PendingIntent.FLAG_CANCEL_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    if (alarmManager == null) {
      return false;
    }

    // WAKEUP: 进程被杀后设备立刻休眠时也能按时触发重启
    alarmManager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + 100, pendingIntent);
    System.exit(0);
    return true;
  }

  /** 只留最近一次, 供 JS 侧下次启动读取上报 */
  private static void saveCrashLog(Context context, Throwable throwable) {
    try {
      File file = new File(context.getFilesDir(), CRASH_LOG_FILE);
      file.getParentFile().mkdirs();
      try (FileWriter writer = new FileWriter(file, false)) {
        writer.write(String.valueOf(System.currentTimeMillis()));
        writer.write('\n');
        writer.write(Log.getStackTraceString(throwable));
      }
    } catch (Throwable t) {
      Log.e(TAG, "Save crash log failed", t);
    }
  }

  /**
   * 记录本次崩溃时间, 并判定窗口期内是否已达自动重启上限;
   * 读取或写入失败时按已达上限处理, 避免统计失效导致无限重启
   */
  private static boolean isCrashLoop(Context context) {
    long now = System.currentTimeMillis();
    List<Long> times = readRecentCrashTimes(context, now);
    if (times == null || !saveRecentCrashTimes(context, times, now)) {
      return true;
    }

    return times.size() + 1 >= CRASH_RESTART_MAX;
  }

  /** @return null 表示读取失败 (与没有历史记录的空列表区分) */
  private static List<Long> readRecentCrashTimes(Context context, long now) {
    List<Long> times = new ArrayList<>();
    try {
      File file = new File(context.getFilesDir(), CRASH_TIMES_FILE);
      if (!file.exists()) {
        return times;
      }

      try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
        String line;
        while ((line = reader.readLine()) != null) {
          try {
            long time = Long.parseLong(line.trim());
            if (now - time < CRASH_LOOP_WINDOW_MS) {
              times.add(time);
            }
          } catch (NumberFormatException ignored) {
            // 跳过脏行
          }
        }
      }
    } catch (Throwable t) {
      Log.e(TAG, "Read crash times failed", t);
      return null;
    }
    return times;
  }

  /** @return false 表示写入失败 */
  private static boolean saveRecentCrashTimes(Context context, List<Long> times, long now) {
    try {
      File file = new File(context.getFilesDir(), CRASH_TIMES_FILE);
      file.getParentFile().mkdirs();
      try (FileWriter writer = new FileWriter(file, false)) {
        for (long time : times) {
          writer.write(String.valueOf(time));
          writer.write('\n');
        }
        writer.write(String.valueOf(now));
        writer.write('\n');
      }
      return true;
    } catch (Throwable t) {
      Log.e(TAG, "Save crash times failed", t);
      return false;
    }
  }
}
