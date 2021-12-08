## Airbank Backend

**Switch to backend folder**

```
cd backend
```

**Install dependencies**

```
npm install
```

**Prepare**

```
cp .env.example .env
```

**run migration and seed DB**

```
npx prisma migrate reset
```

**Compiles and Start the local development server**

```
npm run dev
```

**Compiles and minifies for production**

```
npm run build
```
