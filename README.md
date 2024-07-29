# Perpustakaan_Online_Backend

_Tech Stack:_

- NodeJs
- PostgreSQL

_Fitur Utama:_

- Untuk mencatat peminjaman buku
- Admin dapat mengetahui bahwa buku telat dikembalikan / masih dalam
  peminjaman
- Setiap user hanya bisa meminjam 1 buku & jika sedang meminjam buku harus
  dikembalikan terlebih dahulu agar dapat meminjam Kembali

## Instruksi Persiapan

1.  **Clone Repository**

    ```bash
    git clone
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Create, Migrate, Seed Database**
    ```bash
    npx sequelize db:create
    npx sequelize db:migrate
    npx sequelize db:seed:all
    ```

4. **Running**
    ```bash
    npx nodemon app
    ```