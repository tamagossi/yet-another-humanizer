---
case: answers-03-indonesian
mode: answers
requirements: R.5, R.4, R.6
---

# answers-03-indonesian

## Prompt

```txt
Apa bedanya Docker image dan container? Saya baru belajar Docker.
```

## What to check

Reply in Indonesian, technical terms stay in English, beginner level, answer first.

## Default output

Pertanyaan bagus! Ini salah satu konsep paling penting saat belajar Docker.

#### Singkatnya

- **Docker image** adalah **cetakan** atau **template** yang bersifat read-only (hanya bisa dibaca).
- **Docker container** adalah **instance yang sedang berjalan** dari image tersebut.

#### Analogi Sederhana

Bayangkan image seperti **resep kue**, dan container seperti **kue yang sudah dibuat** dari resep itu.

- Dari satu resep, kamu bisa membuat banyak kue.
- Dari satu image, kamu bisa menjalankan banyak container.

Analogi lain untuk yang suka pemrograman: image itu seperti **class**, container itu seperti **object** (instance dari class).

#### Penjelasan Lebih Detail

##### Docker Image
- Berisi semua yang dibutuhkan aplikasi untuk berjalan: kode, runtime, library, environment variable, dan file konfigurasi.
- Bersifat **read-only** (tidak berubah).
- Tersusun dari beberapa **layer** (lapisan). Setiap instruksi di `Dockerfile` biasanya membuat satu layer baru.
- Disimpan secara lokal atau di registry seperti **Docker Hub**.
- Dibuat dengan perintah `docker build`.

##### Docker Container
- Adalah image yang **sedang dijalankan**.
- Docker menambahkan **satu layer yang bisa ditulis (writable layer)** di atas image, sehingga container bisa membuat atau mengubah file saat berjalan.
- Punya status: bisa **running**, **stopped**, **paused**, atau dihapus.
- Terisolasi dari container lain dan dari sistem host.
- Dibuat dan dijalankan dengan perintah `docker run`.

#### Tabel Perbandingan

| Aspek | Image | Container |
|---|---|---|
| Sifat | Template / cetakan | Instance yang berjalan |
| Bisa diubah? | Tidak (read-only) | Ya (punya writable layer) |
| Status | Statis, tidak "berjalan" | Bisa running, stopped, dll. |
| Dibuat dengan | `docker build` / `docker pull` | `docker run` / `docker create` |
| Melihat daftar | `docker images` | `docker ps` (atau `docker ps -a`) |

#### Contoh Praktis

```bash
### 1. Download image nginx dari Docker Hub
docker pull nginx

### 2. Lihat daftar image
docker images

### 3. Jalankan dua container dari image yang sama
docker run -d --name web1 -p 8080:80 nginx
docker run -d --name web2 -p 8081:80 nginx

### 4. Lihat container yang sedang berjalan
docker ps
```

Di contoh ini, kamu punya **satu image** (`nginx`) tapi **dua container** (`web1` dan `web2`) yang berjalan secara terpisah.

#### Hal Penting yang Perlu Diingat

- Kalau kamu menghapus container, perubahan di dalamnya **akan hilang**, kecuali kamu menyimpannya di **volume**.
- Image tidak ikut terhapus saat container dihapus.
- Kamu tidak bisa menghapus image yang masih dipakai oleh container (harus hapus atau stop container-nya dulu, atau pakai `-f`).

Semoga membantu! Kalau mau, saya bisa lanjut jelaskan tentang **Dockerfile**, **volume**, atau **Docker Compose** sebagai langkah belajar berikutnya.

## YAH output

Image adalah paket berisi aplikasi beserta semua yang dibutuhkannya untuk berjalan, dan isinya tidak berubah. Container adalah image itu saat sedang dijalankan. Dari satu image, Anda bisa menjalankan banyak container.

Contohnya image `nginx`, yang berisi web server Nginx dan file sistem yang dibutuhkannya. Kalau Anda menjalankan perintah ini dua kali:

```
docker run -d nginx
docker run -d nginx
```

Docker membuat dua container dari image yang sama. Keduanya berjalan terpisah. Kalau Anda menambah file di container pertama, container kedua tidak ikut berubah, dan image `nginx` juga tetap sama. Kalau container itu dihapus dengan `docker rm`, file tambahan tadi ikut hilang, sedangkan image-nya tetap ada untuk membuat container baru.

Bayangkan resep dan masakan. Image itu resepnya, container itu masakan yang dibuat dari resep tersebut. Satu resep bisa dipakai memasak berkali-kali, dan menambah garam di satu piring tidak mengubah resepnya.

Untuk melihatnya sendiri, setelah menjalankan dua perintah di atas, bandingkan hasil `docker images` (daftar image) dengan `docker ps` (daftar container yang sedang berjalan). Anda akan melihat satu image `nginx` dan dua container.
