---
title: 'Setting up Next.JS With MongoDB'
description: Learn how to set up MongoDB via Next.js integrated API routes and Prisma ORM.
date: '2022-06-30'
type: 'blog'
---

We will be using Prisma's ORM for working with our database, alongside MongoDB's Atlas Database (make sure to have an [account](https://www.mongodb.com/atlas/database)).

Let us now start our Next.js project by running the following command in our CLI:

```
npx create-next-app@latest --ts
```

We also need Prisma's CLI to initialize the required files:

```
npm install prisma --save-dev
npx prisma init
```

Go ahead and create your free cluster in the Atlas Database. Make sure to copy the username and password to be able to access the database, alongside setting the IP access to your IP (though you will need to allow access from everywhere once you deploy your application).

Once you have this, we can proceed further.

Inside the newly created `prisma` folder, navigate to `prisma/schema.prisma`.

Change the `provider` to `"mongodb"` and `url` to `env("DATABASE_URL")`:

```typescript
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

Set up your environmental variables inside a `.env` file (note: the `.env` file will not be shared with the client, as its execution will operate on the server-side):

```env
DATABASE_URL="mongodb+srv://<user>:<password>@<host>.<port>/<database_name>"
```

This part is important, as the `URL` that the Atlas provides you with will not work with this setup. Make sure to change the `database_name` after the last forward slash to **your** database name.

Your `schema.prisma` file should look like the following:

```typescript
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

We can now start creating our models. For this project, we will create a User model:

```typescript
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  username String  @unique
}
```

Inside the `prisma` folder, create a new file `prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default prisma;
```

This will allow us to use the Prisma client to perform any type of operation in our database.

We will also create a file within this same folder called `user.ts`:

```typescript
import { Prisma, User } from '@prisma/client';
import prisma from './prisma';
```

Notice that we import the `User` from `@prisma/client`. As we created our model, Prisma generated the types for us.

```typescript
import { Prisma, User } from '@prisma/client';
import prisma from './prisma';

export function createUser(username: string): Prisma.Prisma__UserClient<User> {
  return prisma.user.create({
    data: {
      username,
    },
  });
}

export function getUser(username: string): Prisma.Prisma__UserClient<User> {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}
```

We are not performing any type of validation here as that will be done with our API handling.

Navigate to `pages/api/hello.ts` and rename it to `user.ts`. We can now create our first endpoint:

```typescript
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { createUser, getUser } from '../../prisma/user';
```

For this, notice the use of `NextCors`. Where did that come from? Well, when you deploy your application, CORS will not allow you to access your endpoints. So for this, make sure to add `NextCors`:

```
npm i nextjs-cors
```

We can now start creating our handlers:

```typescript
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { createUser, getUser} from '../../prisma/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case 'POST':
      try {
        const { username } = req.body;
        if (typeof username !== 'string' || !username.length >= 3 || !username.length <= 12 || /^[A-Za-z0-9]+$/.test(username)) return res.status(400).json({ message: 'Invalid username' });

        const userAlreadyExists = await getUser();
        if (userAlreadyExists) return res.status(400).json({ message: 'User already exists });

        await createUser(username);
        return res.status(200).json({ message: 'User created' });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
      }
     default:
       return res.status(400).json({ message: 'Whoops!' })
  }
```

As simple as that, we were able to create our endpoint on `api/user`. You can now test it by performing HTTP requests with the `POST` method:

```typescript
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form(): JSX.Element {
  const [username, setUsername] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (username.length < 3 || username.length > 12 || !/^[A-Za-z0-9]+$/.test(username)) return;

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (result.status === 200) {
      console.log('success');
    } else {
      console.log('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='user' value={username} onChange={handleChange} />
      <button type='submit'>Create user</button>
    </form>
  );
}
```

Notice I used `process.env.NEXT_PUBLIC_API_ENDPOINT` instead of hardcoding the endpoint. That is because when we deploy our application, it is way easier to handle all of our requests this way.

So make sure to create a `.env.local` file that will hold all of your client-side environmental variables. Remember, you need to specify at the start `NEXT_PUBLIC` if you want your variables to be accessed by the client (so that they can perform HTTP requests). Without this, they will only live on the server. So remember to never reveal anything secret via the `NEXT_PUBLIC` environmental variables as anyone can see them.

For anything related to passwords, authentication, hashing, or something of the like, it is best to keep them in your `.env` file (but you cannot access them from the client).

With this done, you can now deploy your application and add any functionality you wish.
