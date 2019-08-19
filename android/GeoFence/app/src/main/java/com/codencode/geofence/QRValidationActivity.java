package com.codencode.geofence;

import android.content.Intent;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.util.Patterns;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class QRValidationActivity extends AppCompatActivity {

    String rawResult;
    String mName , mPhone , mEMail;
    RecyclerView mRecyclerView;
    DatabaseReference mRef , contactRef;
    ArrayList<String> contactList;
    MyAdapter adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qrvalidation);


        rawResult = getIntent().getStringExtra("RawData");
        if(isValid(rawResult))
        {
            Login();
        }
        else
        {
            Toast.makeText(this, "Error : Something went wrong, Try scanning again", Toast.LENGTH_SHORT).show();
            Intent mainIntent = new Intent(this , MainActivity.class);
            startActivity(mainIntent);
        }
    }

    boolean isValid(String rawResult)
    {
        if(!initData())
        {
            return false;
        }
        return true;
    }

    public void Login()
    {
         String deviceToken = Settings.Secure.getString(this.getContentResolver(),
                Settings.Secure.ANDROID_ID);
        Toast.makeText(this, "Name = " + mName + "\nPhone = " + mPhone + "\nEmail = "+mEMail, Toast.LENGTH_SHORT).show();
        mRef = FirebaseDatabase.getInstance().getReference().child("devices").child(deviceToken).child("logTable");
        DatabaseReference message_push = mRef.push();
        String push_key = message_push.getKey();

        Log.e("QR Validation" , mRef.getKey());
        Map dataMap = new HashMap();
        dataMap.put("name" , mName);
        dataMap.put("phone" , mPhone);
        dataMap.put("email" , mEMail);
        dataMap.put("timeStamp" , ServerValue.TIMESTAMP);

        Map userMap = new HashMap();
        userMap.put("/" + push_key , dataMap);
        mRef.updateChildren(userMap);


        mRecyclerView = findViewById(R.id.contactListRecyclerView);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        contactList = new ArrayList<>();
        adapter = new MyAdapter(this , contactList);
        mRecyclerView.setAdapter(adapter);
        contactRef = FirebaseDatabase.getInstance().getReference().child("devices").child(deviceToken).child("contactList");
        contactRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                for (DataSnapshot ds : dataSnapshot.getChildren())
                    contactList.add(ds.getKey());

                adapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    public boolean isValidEmail(String target) {
        return (!TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches());
    }

    public boolean initData()
    {
        int cnt = 0;
        for(int i=0;i<rawResult.length();i++){
            if(rawResult.charAt(i) == ',')
                cnt++;
        }

        if(cnt != 2)
            return false;

        String[] data = rawResult.split(",");
        mName = data[0];
        mPhone = data[1];
        mEMail = data[2];

        if(mName == null || mPhone == null || mEMail == null || mName.isEmpty() || mPhone.isEmpty() || mEMail.isEmpty())
            return false;

        if(!isValidEmail(mEMail))
            return false;

        if(mPhone.length() != 10)
            return false;

        return true;
    }
}
