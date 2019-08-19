package com.codencode.geofence;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {

    ArrayList<String> contactList;
    Context context;

    MyAdapter(Context context , ArrayList<String> contactList)
    {
        this.contactList = contactList;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(context).inflate(R.layout.single_contact_layout , viewGroup , false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, final int i) {
        viewHolder.mPhoneNumber.setText(contactList.get(i));
        viewHolder.mCallButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String phoneNumber = contactList.get(i);
                Intent callIntent = new Intent(Intent.ACTION_CALL);
                callIntent.setData(Uri.parse("tel:" + phoneNumber));
                context.startActivity(callIntent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return contactList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{
        TextView mPhoneNumber;
        ImageView mCallButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            mPhoneNumber = itemView.findViewById(R.id.contactNum);
            mCallButton = itemView.findViewById(R.id.callButton);
        }
    }
}
