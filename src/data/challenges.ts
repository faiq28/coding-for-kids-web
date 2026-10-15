export interface ChallengeItem {
  id: string;
  title: string;
  level: "Mudah" | "Sedang" | "Sulit";
  xp: number;
  code: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
}

export const challenges: ChallengeItem[] = [
  {
    id: "c1",
    title: "Hitung Cepat",
    level: "Mudah",
    xp: 20,
    code: "tampilkan(2 + 3)",
    question: "Apa yang tampil di layar?",
    options: ["23", "5", "2 + 3"],
    answer: 1,
    hint: "Komputer menghitung dulu, baru menampilkan hasilnya.",
  },
  {
    id: "c2",
    title: "Tag Tebal",
    level: "Mudah",
    xp: 20,
    code: "<__>Halo</__>",
    question: "Tag mana yang membuat tulisan jadi tebal?",
    options: ["<b>", "<p>", "<img>"],
    answer: 0,
    hint: "Huruf b singkatan dari bold.",
  },
  {
    id: "c3",
    title: "Berapa Kali Hai?",
    level: "Mudah",
    xp: 25,
    code: 'ulangi 3 kali:\n  tampilkan("Hai")',
    question: "Tulisan Hai muncul berapa kali?",
    options: ["1", "3", "5"],
    answer: 1,
    hint: "Lihat angka setelah kata ulangi.",
  },
  {
    id: "c4",
    title: "Si Kecil atau Besar",
    level: "Sedang",
    xp: 30,
    code: 'umur = 8\njika umur > 10:\n  tampilkan("Besar")\nlainnya:\n  tampilkan("Kecil")',
    question: "Apa yang tampil di layar?",
    options: ["Besar", "Kecil", "Tidak ada"],
    answer: 1,
    hint: "Apakah 8 lebih besar dari 10?",
  },
  {
    id: "c5",
    title: "Kotak Angka",
    level: "Sedang",
    xp: 30,
    code: "x = 4\nx = x + 2\ntampilkan(x)",
    question: "Berapa nilai x yang tampil?",
    options: ["4", "2", "6"],
    answer: 2,
    hint: "x diganti dengan isi lamanya ditambah 2.",
  },
  {
    id: "c6",
    title: "Daftar Buah",
    level: "Sulit",
    xp: 40,
    code: 'buah = ["apel", "jeruk", "mangga"]\ntampilkan(buah[1])',
    question: "Apa yang tampil di layar?",
    options: ["apel", "jeruk", "mangga"],
    answer: 1,
    hint: "Komputer menghitung urutan mulai dari 0, bukan 1.",
  },
  {
    id: "c7",
    title: "Kali Dua Kali",
    level: "Sulit",
    xp: 40,
    code: "fungsi kali2(n):\n  kembalikan n * 2\n\ntampilkan(kali2(kali2(3)))",
    question: "Berapa hasilnya?",
    options: ["6", "12", "9"],
    answer: 1,
    hint: "Kerjakan kali2(3) dulu, hasilnya dikali dua lagi.",
  },
];
