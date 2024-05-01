# Backend System Setup DailyPeTask

This guide will help you set up the backend system locally using Node.js, Express, Prisma, and PostgreSQL.

## Getting Started

Follow these steps to set up the project locally:

### 1. Fork the Repository

First, fork this repository to your GitHub account by clicking the "Fork" button at the top right of the page.

### 2. Clone the Repository

Clone the forked repository to your local machine:
```bash
git clone https://github.com/your-username/repository-name.git
```

### 3. Navigate to the Project Directory

Navigate into the project directory:

```bash
cd repository-name
```

### 4. Install Dependencies

Install the project dependencies using npm:
```bash
npm install
```

### Build the project:
```bash
 npm run build
 ```

### 6. Start the Server
```bash
npm start
```


#### why nodejs : I am not comftable in python this time i assure you if you conside me i will become best in python/Django 


# routes :-

## 1. creatUser
## http://localhost:3000/createUser
```bash
body {
    "full_name": "John Doe",
    "mob_num": "1234567892",
    "pan_num": "ABCDE1244G"
}
```

## 2. createManagers

## http://localhost:3000/createManagers

```bash

body [
    { "id": "113", "active": true },
    { "id": "123", "active": true },
    { "id": "122", "active": true }
]
```
## 3. deleteUser 

method delete instand of post

# 4. http://localhost:3000/deleteUser
```bash
body {
    "user_id" : "fb4f78a1-df6c-48d7-b8b0-997063466676"
}
```    



## 5. http://localhost:3000/updateUser

```bash
body {
    "user_ids": ["bd208541-9383-4cf0-8297-d40746cdf626"],
    "update_data": {
        "bd208541-9383-4cf0-8297-d40746cdf626": {
        "full_name": "John Doe",
        "mob_num": "1234567890",
        "pan_num": "ABCDE1234F",
        "manager_id": "122"
        }
    }
}
```

## 6. getUser 

## https://dailype-backend-task.onrender.com/getUser

optional

you can get without any body all user
but specific data you can get mob_num, user_id, manager_id with these cond in body
example : 
```bash
body {
    "mob_num" : +917052355283
}
```