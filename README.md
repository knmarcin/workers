# Workers

### Requirements
- docker, docker-compose

### Run instructions:

1. ```git clone https://github.com/knmarcin/workers```
2. ```cd workers```
3. ```docker-compose up```

Frontend:
- http://127.0.0.1:8000 - Django
- http://127.0.0.1:3000 - React frontend 
- http://127.0.0.1:8000/api/ - DRF with endpoints:

  | Endpoint         | Allowed methods.                 | 
  | ---------------- | -------------------------------- | 
  | workers          | ```GET``` ```POST```             |  
  | workers/{id}     | ```GET``` ```PUT``` ```DELETE``` |  
  | report           | ```GET```                        |  
