import random 
f=open("C:/Users/tnals/DB/database/week9/insert.sql",'wt',encoding='utf-8')
name='김이장최박언지나연성황병준허고유훈현재선가을원문배지우혜윤선수류혜명홍조종은윤도변진신경한주정곽부인국승영희채서린순'
cn='Math','Database','Python','Java','C'
student_id=10000000
for i in range(0,100000):
    sname=''
    for j in range(0,3):
        sname += random.choice(name)
    st_id=str(student_id)
    Email=str(student_id)+'@inha.edu'
    student_id=student_id+1
    Phone='010-'+ str(random.randrange(1000,9999))+'-'+str(random.randrange(1000,9999))
    Major = str(random.randrange(1,6))
    classname=random.choice(cn)
    data = "INSERT INTO Student (Sname, Email, Phone, Major, student_id, Class) VALUES"
    data= data+ "(\""+sname+"\", \""+Email+"\", \""+Phone+"\",\""+Major+"\", \""+st_id+"\", \""+classname+"\");\n"
    f.write(data)

f.close()
