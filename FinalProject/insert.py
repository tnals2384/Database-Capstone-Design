import random

Vin = 0;
Cartype = 'Car', 'Suv', 'Truck'
carmodel = '아반떼', '그랜저','쏘나타','SM6','모닝', '레이', 'K8', 'K5','K3', '스파크', 'G70', 'G80', 'G90'
Suvmodel = '팰리세이드', '싼타페', '투싼','코나','XM3', '쏘렌토', '카니발', '스포티지' ,'코란도','렉스턴','GV60','GV70'
Truckmodel = '포터2', '봉고3','다니고', '젤라', '라보'
Plate='거너더러머버서교부구두루가나다라마바사아자차카타파하'
color='white','black','gray','silver','brown'
engine='가솔린','디젤','전기'
carsize='경형','소형','준중형','중형','준대형'
suvsize='경형','소형','중형','대형'
platelist=[]

f=open("C:/Users/tnals/DB/DATABASE_CAPSTONE_DESIGN/project/insert.sql",'wt',encoding='utf-8')

for i in range(100000):
    Vin= Vin+1; 
    Price = random.randrange(500,10000)
    Car_type=random.choice(Cartype)
    
    #Plate_number는 아래와 같이 중복체크
    Plate_number=str(random.randrange(100,999))+random.choice(Plate)+str(random.randrange(1000,9999))
    while Plate_number in platelist:
        Plate_number=str(random.randrange(100,999))+random.choice(Plate)+str(random.randrange(1000,9999))
    platelist.append(Plate_number)
    
    Model_year= random.randrange(2010,2022)
    Color=random.choice(color)
    Mileage=random.randrange(100,5000);
    Engine=random.choice(engine)
    
    if(Car_type == 'Car'):
        Model = random.choice(carmodel)
        Size = random.choice(carsize)
        Max_speed = random.randrange(150,250,10)
        insertCar="INSERT INTO CAR VALUES "+'("' + str(Vin) + '", "' + Size + '", "' + str(Max_speed)+'");\n'
    elif(Car_type=='Suv'):
        Model=random.choice(Suvmodel)
        Size = random.choice(suvsize)
        No_seats= random.randrange(4,10)
        insertSuv="INSERT INTO SUV VALUES "+'("' + str(Vin) + '", "' + str(No_seats) + '", "' + Size+'");\n'
    elif(Car_type=='Truck'):
        Model= random.choice(Truckmodel)
        Tonnage=random.randrange(1,5)
        No_of_axles=random.randrange(1,5)
        insertTruck="INSERT INTO Truck VALUES "+'("' + str(Vin) + '", "' + str(Tonnage) + '", "' + str(No_of_axles)+'");\n'
        
    query = "INSERT INTO Vehicle VALUES " + '("' + str(Vin) + '", "' + str(Price) + '", "' + Car_type + '", "'+ Model + '", "' 
    + Plate_number + '", "' + str(Model_year) +'", "' + Color +'", "' + str(Mileage)+'", "' +Engine +'");\n'
    f.write(query)
    
    if(Car_type == 'Car'):
        f.write(insertCar)
    elif(Car_type == 'Suv'):
        f.write(insertSuv)
    elif(Car_type == 'Truck'):
        f.write(insertTruck)
f.close()