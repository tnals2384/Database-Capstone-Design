# Database-Capstone-Design
데이터베이스설계

## 실행 방법
1. 레포지토리 복사
    > 1. git clone <원격저장소 주소>
    > 2. 해당 폴더 이동 (EX) cd week10
    > 3. npm install
    > 4. npm run start

2. database/sql.js 파일 내부에서 본인의 데이터베이스 정보 입력
<pre>
<code>
    const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'database name',
        password: 'password',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
        }
    );
</code>
</pre>

<br>

## 최종설계 프로젝트
Car_dealer Database 생성 및 서버 연결
<br>

1. 관리자페이지
    >1. 차량 정보 수정/삭제/확인 가능
    >2. 예약 수정/확인 가능
2. 사용자페이지
    >1. 차량 확인 및 예약 가능
    >2. 예약 취소 가능
    

