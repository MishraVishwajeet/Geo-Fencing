package com.codencode.geofence;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class SaveMyAppsService extends android.app.Service
{
    String CURRENT_PACKAGE_NAME = "com.codencode.geofence";
    String lastAppPN = "";
    boolean noDelay = false;
    public static SaveMyAppsService instance;

    @Override
    public IBinder onBind(Intent intent) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // TODO Auto-generated method stub

        scheduleMethod();
        CURRENT_PACKAGE_NAME = getApplicationContext().getPackageName();
        Log.e("Current PN", "" + CURRENT_PACKAGE_NAME);

        instance = this;

        return START_STICKY;
    }

    private void scheduleMethod() {
        // TODO Auto-generated method stub

        ScheduledExecutorService scheduler = Executors
                .newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(new Runnable() {

            @Override
            public void run() {
                // TODO Auto-generated method stub
                checkRunningApps();
            }
        }, 0, 100, TimeUnit.MILLISECONDS);
    }

    public void checkRunningApps() {
        ActivityManager mActivityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> RunningTask = mActivityManager.getRunningTasks(1);
        ActivityManager.RunningTaskInfo ar = RunningTask.get(0);
        String activityOnTop = ar.topActivity.getPackageName();
        Log.e("activity on TOp", "" + activityOnTop);

        // Provide the packagename(s) of apps here, you want to show password activity
        if (activityOnTop.contains("whatsapp")  // you can make this check even better
                || activityOnTop.contains(CURRENT_PACKAGE_NAME)) {
            Log.e("From Service" , "We are inside our or whatsapp");
        } else {
            // DO nothing
        }
    }

    public static void stop() {
        if (instance != null) {
            instance.stopSelf();
        }
    }
}