# merkel-innovation
Install: npm install
</br></br></br>
Tech used:
- express
- nodejs
- prisma -> hosted on planetscale

Start:
node .
</br></br></br>
Task 1:

GET localhost:8080/task1
</br></br></br>
Task 2:

3 tables: admin, user, and note
user has one to many relationship with note, that is user can make many notes

HTTP APIs exposed:

GUEST/USER API
1. POST localhost:8080/task2/guestforms
params: 
- name
- address OPTIONAL
- phone OPTIONAL
- note

example: localhost:8080/task2/guestforms?name=pascal&address=alam sutera&phone=0812&note=hello

create guest and/or note
</br></br></br>
2. GET localhost:8080/task2/note

params: NONE

example: localhost:8080/task2/note

get all notes created with its author
</br></br></br>
ADMIN API

all APIs below are only accesible to admin, must provide admin credentials (name & password), default is 

-name: admin

-password: password
</br></br></br>
3. POST localhost:8080/task2/admin

params: 
- adminname
- password
- newadminname
- newpassword

example: localhost:8080/task2/admin?adminname=admin&password=password&newadminname=admin2&newpassword=password2

create new admin
</br></br></br>
4. GET localhost:8080/task2/admin/note

params: 
- adminname
- password

example: localhost:8080/task2/admin/note?adminname=admin&password=password

get all notes created with its author
</br></br></br>
5. GET localhost:8080/task2/admin/guest

params: 
- adminname
- password

example: localhost:8080/task2/admin/guest?adminname=admin&password=password

get all guests
</br></br></br>
6. DELETE localhost:8080/task2/admin/note

params: 
- adminname
- password
- noteid

example: localhost:8080/task2/admin/note?adminname=admin&password=password&noteid=1

delete specific note based on noteid
</br></br></br>
7. DELETE localhost:8080/task2/admin/guest

params: 
- adminname
- password
- guestname

example: localhost:8080/task2/admin/guest?adminname=admin&password=password&guestname=pascal

delete specific guest based on guestname


