package com.codencode.geofence;

import android.Manifest;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.icu.util.Freezable;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.support.annotation.Nullable;
import android.util.Log;


import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Timer;
import java.util.TimerTask;


public class GoogleService extends Service implements LocationListener {

    boolean isGPSEnable = false;
    boolean isNetworkEnable = false;
    double latitude1, longitude1, latitude, longitude;
    LocationManager locationManager;
    Location location;
    private Handler mHandler = new Handler();
    private Timer mTimer = null;
    long notify_interval = 1000;
    public static String str_receiver = "com.example.myapplication.receiver";
    DatabaseReference locationRef;


    public GoogleService() {

    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {

        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

//        locationRef = FirebaseDatabase.getInstance().getReference().child("devices").child("")
        mTimer = new Timer();
        mTimer.schedule(new TimerTaskToGetLocation(), 5, notify_interval);
//        intent = new Intent(str_receiver);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        latitude1 = intent.getDoubleExtra("latitude" , 18.5973872);
        longitude1 = intent.getDoubleExtra("longitude" , 73.7068244);

        Log.e("services" , ""+longitude+" , " + latitude);
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onLocationChanged(Location location) {

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    private void fn_getlocation() {
        locationManager = (LocationManager) getApplicationContext().getSystemService(LOCATION_SERVICE);
        isGPSEnable = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        isNetworkEnable = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

        if (!isGPSEnable && !isNetworkEnable) {

        } else {

            if (isNetworkEnable) {
                location = null;
                if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    Activity#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for Activity#requestPermissions for more details.
                    return;
                }
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 1000, 0, this);
                if (locationManager!=null){
                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                    if (location!=null){

                        Log.e("latitude4",location.getLatitude()+"");
                        Log.e("longitude5",location.getLongitude()+"");

                        latitude = location.getLatitude();
                        longitude = location.getLongitude();

                        double dist = getDistance(latitude1, longitude1, latitude, longitude);
                        Log.e("dist", dist + " ");
                        if(dist >= 100.00) {
                            Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                v.vibrate(VibrationEffect.createOneShot(500, VibrationEffect.DEFAULT_AMPLITUDE));
                            } else {
                                v.vibrate(500);
                            }
                        }
                    }
                }

            }


            if (isGPSEnable){
                location = null;
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,1000,0,this);
                if (locationManager!=null){
                    location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if (location!=null){
                        Log.e("latitude1",location.getLatitude()+"");
                        Log.e("longitude2",location.getLongitude()+"");
                        Log.e("latitude",latitude1+"");
                        Log.e("longitude",longitude1+"");
                        latitude = location.getLatitude();
                        longitude = location.getLongitude();
                        double dist = getDistance(latitude1, longitude1, latitude, longitude);
                        if(dist >= 50.00) {
                            Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                v.vibrate(VibrationEffect.createOneShot(500, VibrationEffect.DEFAULT_AMPLITUDE));
                            } else {
                                v.vibrate(500);
                            }
                        }
                        Log.e("Distance", dist + " ");
                    }
                }
            }


        }

    }

    private class TimerTaskToGetLocation extends TimerTask{
        @Override
        public void run() {

            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    fn_getlocation();
                }
            });

        }
    }

    public static double getDistance(double lat1, double lon1, double  lat2, double lon2) {
        double p = 0.017453292519943295;    // Math.PI / 180
        double a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
                Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                        (1 - Math.cos((lon2 - lon1) * p))/2;
        System.out.println("########" + 12742 * Math.asin(Math.sqrt(a)));
        return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }


}
