Ini adalah database diagram yang saya gunakan pada challenge 4:
![Alt text](./public/images/entity_cars.png)

Tata cara untuk membuka file ini:

1. clone repository ini
2. npm install express morgan pg pg-hstore sequelize sequelize-cli nodemon
3. buat file .env sesuai dengan contoh .env.example
4. edit package.json
5. edit config.json sesuai dengan database yang kamu gunakan
6. npm run dev

buka browser dengan menuliskan url:
localhost:postkamu/dashboard/admin (maka akan membuka ui dashboard)
jika menambahkan /dashboard/admin/create (maka akan membuka ui untuk membuat data baru)
jika menambahkan /dashboard/admin/edit atau memencet tombol edit maka akan mengedit data
jika memencet tombol hapus maka akan menghapus data data
