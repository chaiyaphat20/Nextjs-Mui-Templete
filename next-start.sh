#!/usr/bin/env bash

# printenv

#0. printenv หมายถึง ดึง env ที่มีทั้งหมดใน docker มา ex 
#AZURE_AD_TENANT_ID=52xxxx
#NEXT_CLIENT_ENV=PRD

#1. grep -o '^NEXT_[A-Za-z0-9_]*' หมายถึง เอา env ที่ NEXT_CLIENT_xxxxx  เมื่อ xxx คือ [A-Za-z0-9_]
#2. sed 's/^/\$/g' หมายถึง แทรก $ หน้า env ทุกตัว
#3. เครื่อง หมาย | คือ ให้ทำ process ต่อๆ กัน ไป
#4. paste -sd, หมายถึง ดึง env ทุกตัวมาต่อกัน ด้วย , 
#5. ผลลัพธ์ ถ้ามี NEXT_ หลายตัว #$NEXT_CLIENT_HOSTNAME,$NEXT_CLIENT_AZURE_AD_CLIENT_SECRET,$NEXT_CLIENT_NEXTAUTH_URL
# รันบน windows จะไม่มาสามารถเห็นค่าได้ ต้องรันบน docker จะได้ค่าด้านล่าง

export EXISTING_VARS=$(printenv | grep -o '^NEXT_[A-Za-z0-9_]*' | sed 's/^/\$/g' | paste -sd, );
echo "Env matches a NEXT format  :: $EXISTING_VARS " # Env matches a NEXT format  :: $NEXT_CLIENT_ENV

for file in $(find /app/.next/ -name '*.js'); #หาไฟล์ นามสกุล.js ทั้งหมด ใน /app/.next/ แล้ว forloop
do
    echo "Processing $file..."
    
    # Perform substitution
    #ตัวแปร $EXISTING_VARS ทั้งหมด เช่น $NEXT_CLIENT_ENV (ที่เกิดจาก process npm run build) ใน $file ที่เจอ จะถูกแทนที่ด้วยค่า envจริง แล้วสร้าง $file.tmp
    #เนื่องจาก $NEXT_CLIENT_ENV=PRD
    envsubst "$EXISTING_VARS" < $file > $file.tmp 
    
    # Check if substitution resulted in any changes
    if ! cmp --silent $file $file.tmp; then #check ว่า code ต่างกันไหม ถ้าต่างจะเข้า if
        echo "Changes detected in $file"
        diff $file $file.tmp #display ว่า code ต่างกันยังไง
    else
        echo "No changes in $file"
    fi

    mv $file.tmp $file #เอาไฟล์ $file.tmp ทับ $file
done
npm start
