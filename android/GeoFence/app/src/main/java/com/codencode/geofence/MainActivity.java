package com.codencode.geofence;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import com.google.firebase.database.ValueEventListener;

import io.nlopez.smartlocation.OnLocationUpdatedListener;
import io.nlopez.smartlocation.SmartLocation;


public class MainActivity extends AppCompatActivity {


    Button button;
    DatabaseReference mRef , logRef , deviceLocationRef;

    double longitude , latitude;
    boolean flag = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = findViewById(R.id.scanBarCodeBTN);

        final String deviceToken = Settings.Secure.getString(this.getContentResolver(),
                Settings.Secure.ANDROID_ID);

        if(!flag)
        {
            SmartLocation.with(this).location().oneFix().start(new OnLocationUpdatedListener() {
                @Override
                public void onLocationUpdated(Location location) {
                    longitude = location.getLongitude();
                    latitude = location.getLatitude();

                    Log.e("Location" , "Longitude " + longitude + "latitude " + latitude);
                    deviceLocationRef = FirebaseDatabase.getInstance().getReference().child("devices").child(deviceToken).child("location");
                    deviceLocationRef.child("longitude").setValue(longitude);
                    deviceLocationRef.child("latitude").setValue(latitude);

                    Intent intent = new Intent(MainActivity.this , GoogleService.class);
                    intent.putExtra("longitude" , longitude);
                    intent.putExtra("latitude" , latitude);
                    flag = true;
                    startService(intent);
                }
            });
        }


//        startService(new Intent(this, SaveMyAppsService.class));
        mRef = FirebaseDatabase.getInstance().getReference().child("deviceList").child(deviceToken);
        logRef = FirebaseDatabase.getInstance().getReference().child("devices").child(deviceToken);
        logRef.child("devName").setValue(deviceToken);
        logRef.child("timeStamp").setValue(ServerValue.TIMESTAMP);
        mRef.setValue("1");

        mRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if(dataSnapshot.getValue().toString().equals("0"))
                {
                    finish();
                    System.exit(0);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent QRIntent = new Intent(MainActivity.this , QRScanActivity.class);
                startActivity(QRIntent);
            }
        });

    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        return false;
    }


    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        Intent intent = new Intent(MainActivity.this , MainActivity.class);
        startActivity(intent);
    }
}
