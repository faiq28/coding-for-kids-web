export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  xp: number;
  story: string;
  code?: string;
  question: { q: string; options: string[]; answer: number; explain: string };
}

export interface World {
  id: string;
  icon: string;
  title: string;
  desc: string;
  bg: string;
  lessons: Lesson[];
}

export const worlds: World[] = [
  {
    id: "starter",
    icon: "🌱",
    title: "Starter Village",
    desc: "Kenalan dengan coding",
    bg: "bg-green-100",
    lessons: [
      {
        id: "s1",
        title: "Apa itu coding?",
        emoji: "💡",
        xp: 20,
        story:
          "Coding itu seperti menulis resep untuk komputer. Komputer sangat patuh, tapi dia tidak bisa menebak. Jadi kita harus menulis perintah satu per satu, berurutan, dan jelas.",
        question: {
          q: "Apa yang kita berikan ke komputer saat coding?",
          options: ["Makanan", "Perintah", "Mainan"],
          answer: 1,
          explain:
            "Betul! Coding artinya menulis perintah agar komputer tahu apa yang harus dikerjakan.",
        },
      },
      {
        id: "s2",
        title: "Kenalan dengan Q-Bot",
        emoji: "🤖",
        xp: 20,
        story:
          "Q-Bot adalah robot yang menurut pada program. Program adalah kumpulan perintah yang dijalankan dari atas ke bawah. Kalau urutannya diubah, hasilnya bisa berbeda!",
        code: "maju()\nbelokKanan()\nmaju()\nlompat()",
        question: {
          q: "Q-Bot menjalankan perintah dengan cara...",
          options: ["Dari atas ke bawah", "Acak", "Dari bawah ke atas"],
          answer: 0,
          explain:
            "Tepat! Komputer membaca program berurutan dari baris paling atas.",
        },
      },
      {
        id: "s3",
        title: "Halo, Dunia!",
        emoji: "👋",
        xp: 20,
        story:
          'Program pertama hampir semua programmer adalah menampilkan tulisan "Halo". Di web, kita memakai tag HTML. Coba tulis ini di Playground nanti!',
        code: "<h1>Halo, Dunia!</h1>",
        question: {
          q: "Tag <h1> dipakai untuk membuat...",
          options: ["Judul besar", "Gambar", "Tombol"],
          answer: 0,
          explain:
            "Benar! <h1> adalah judul paling besar di sebuah halaman web.",
        },
      },
    ],
  },
  {
    id: "logic",
    icon: "🌲",
    title: "Logic Forest",
    desc: "Belajar algoritma dan logika",
    bg: "bg-emerald-100",
    lessons: [
      {
        id: "l1",
        title: "Urutan (Sequence)",
        emoji: "🔢",
        xp: 20,
        story:
          "Algoritma adalah langkah-langkah untuk menyelesaikan masalah. Contohnya cuci tangan: buka keran, pakai sabun, gosok, bilas. Kalau langkahnya tertukar, hasilnya jadi aneh!",
        question: {
          q: "Mana urutan yang benar untuk memakai sepatu?",
          options: [
            "Ikat tali, pakai sepatu",
            "Pakai sepatu, ikat tali",
            "Ikat tali, lepas sepatu",
          ],
          answer: 1,
          explain: "Yes! Urutan langkah sangat penting dalam algoritma.",
        },
      },
      {
        id: "l2",
        title: "Perulangan (Loop)",
        emoji: "🔁",
        xp: 20,
        story:
          "Malas menulis perintah yang sama berkali-kali? Pakai perulangan! Dengan loop, komputer mengulang perintah sebanyak yang kita mau.",
        code: "ulangi 5 kali:\n  lompat()",
        question: {
          q: "Q-Bot harus lompat 5 kali. Cara paling singkat?",
          options: ["Tulis lompat() 5 baris", "Pakai perulangan", "Menyerah"],
          answer: 1,
          explain: "Mantap! Perulangan membuat kode lebih singkat dan rapi.",
        },
      },
      {
        id: "l3",
        title: "Pilihan (If / Else)",
        emoji: "🔀",
        xp: 20,
        story:
          "Komputer bisa memilih! Kalau hujan, bawa payung. Kalau tidak, tidak perlu. Itulah if dan else: program mengambil keputusan berdasarkan syarat.",
        code: "jika hujan:\n  bawaPayung()\nlainnya:\n  pakaiTopi()",
        question: {
          q: "Kalau tidak hujan, program di atas akan...",
          options: ["Bawa payung", "Pakai topi", "Tidur"],
          answer: 1,
          explain:
            'Betul! Bagian "lainnya" dijalankan kalau syaratnya tidak terpenuhi.',
        },
      },
    ],
  },
  {
    id: "web",
    icon: "🏰",
    title: "Web Castle",
    desc: "Membuat website pertama",
    bg: "bg-indigo-100",
    lessons: [
      {
        id: "w1",
        title: "Tag HTML",
        emoji: "🏗️",
        xp: 20,
        story:
          "HTML adalah kerangka sebuah website, seperti tulang pada tubuh. Setiap bagian dibungkus tag: ada pembuka dan penutup.",
        code: "<h1>Judul</h1>\n<p>Ini paragraf.</p>\n<button>Klik aku</button>",
        question: {
          q: "Tag untuk membuat paragraf adalah...",
          options: ["<p>", "<h1>", "<img>"],
          answer: 0,
          explain: "Benar! <p> singkatan dari paragraph.",
        },
      },
      {
        id: "w2",
        title: "Warna dengan CSS",
        emoji: "🎨",
        xp: 20,
        story:
          "Kalau HTML adalah tulang, CSS adalah pakaian dan warnanya. Dengan CSS kita mengubah warna, ukuran, dan gaya tampilan.",
        code: "h1 {\n  color: blue;\n  font-size: 40px;\n}",
        question: {
          q: "Properti CSS untuk mengubah warna tulisan?",
          options: ["size", "color", "paint"],
          answer: 1,
          explain: "Tepat! Properti color mengatur warna tulisan.",
        },
      },
      {
        id: "w3",
        title: "Tombol Interaktif",
        emoji: "🖱️",
        xp: 20,
        story:
          "Supaya web bisa bergerak dan merespons klik, kita pakai JavaScript. Ia adalah otak yang membuat halaman jadi hidup!",
        code: "<button onclick=\"alert('Halo!')\">\n  Klik aku\n</button>",
        question: {
          q: "Bahasa yang membuat web merespons klik adalah...",
          options: ["JavaScript", "Bahasa Inggris", "Kalkulator"],
          answer: 0,
          explain: "Keren! JavaScript membuat halaman web interaktif.",
        },
      },
    ],
  },
  {
    id: "future",
    icon: "🚀",
    title: "Future City",
    desc: "Menjadi developer",
    bg: "bg-yellow-100",
    lessons: [
      {
        id: "f1",
        title: "Variabel",
        emoji: "📦",
        xp: 20,
        story:
          "Variabel adalah kotak berlabel untuk menyimpan data. Isinya boleh diganti kapan saja, tapi labelnya tetap sama.",
        code: 'nama = "Dika"\numur = 8\nskor = skor + 10',
        question: {
          q: "Variabel itu seperti...",
          options: ["Kotak berlabel", "Layar", "Kabel"],
          answer: 0,
          explain: "Betul! Variabel menyimpan nilai dan bisa dipakai lagi.",
        },
      },
      {
        id: "f2",
        title: "Fungsi",
        emoji: "🧰",
        xp: 20,
        story:
          "Fungsi adalah kumpulan perintah yang diberi nama, jadi bisa dipakai berulang kali. Tulis sekali, panggil kapan saja.",
        code: 'fungsi sapa(nama):\n  tampilkan("Halo " + nama)\n\nsapa("Dika")',
        question: {
          q: "Keuntungan memakai fungsi?",
          options: [
            "Kode bisa dipakai ulang",
            "Komputer jadi lambat",
            "Kode jadi hilang",
          ],
          answer: 0,
          explain: "Tepat! Fungsi menghemat waktu dan membuat kode rapi.",
        },
      },
      {
        id: "f3",
        title: "Debugging",
        emoji: "🐞",
        xp: 20,
        story:
          "Bug adalah kesalahan di dalam program. Programmer hebat bukan yang tidak pernah salah, tapi yang sabar mencari dan memperbaikinya. Baca pesan error, cek baris demi baris, coba lagi!",
        question: {
          q: "Apa yang dilakukan saat debugging?",
          options: [
            "Menghapus semua kode",
            "Mencari dan memperbaiki kesalahan",
            "Menyalakan lampu",
          ],
          answer: 1,
          explain: "Hebat! Debugging adalah mencari dan memperbaiki bug.",
        },
      },
    ],
  },
];

export const allLessons = worlds.flatMap((w) => w.lessons);
