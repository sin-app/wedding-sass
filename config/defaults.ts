import type { InvitationData } from "@/lib/types";

export const defaultInvitationData: InvitationData = {
  greeting:
    "Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  couple: {
    groom: {
      name: "Rangga Pratama",
      shortName: "Rangga",
      parents: "Putra dari Bapak Suryanto & Ibu Kartika",
      instagram: "https://instagram.com/",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    bride: {
      name: "Sinta Maharani",
      shortName: "Sinta",
      parents: "Putri dari Bapak Hendra & Ibu Ratna",
      instagram: "https://instagram.com/",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    },
  },
  date: "2026-12-20T08:00:00+07:00",
  events: [
    {
      name: "Akad Nikah",
      date: "Sabtu, 20 Desember 2026",
      time: "08.00 - 10.00 WIB",
      venue: "Masjid Agung Al-Falah",
      address: "Jl. Merdeka No. 1, Jakarta Pusat",
    },
    {
      name: "Resepsi",
      date: "Sabtu, 20 Desember 2026",
      time: "11.00 - 14.00 WIB",
      venue: "Grand Ballroom Hotel Nusantara",
      address: "Jl. Sudirman No. 45, Jakarta Pusat",
    },
  ],
  maps: {
    url: "https://maps.google.com/?q=-6.200000,106.816666",
    embed: "https://www.google.com/maps?q=-6.200000,106.816666&z=15&output=embed",
  },
  story: [
    {
      date: "2019",
      title: "Pertama Bertemu",
      description:
        "Kami dipertemukan di sebuah acara dan mulai saling mengenal.",
    },
    {
      date: "2021",
      title: "Menjalin Hubungan",
      description: "Setelah lama berteman, kami memutuskan melangkah bersama.",
    },
    {
      date: "2025",
      title: "Lamaran",
      description: "Dengan restu keluarga, kami resmi bertunangan.",
    },
    {
      date: "2026",
      title: "Menikah",
      description: "Kini kami siap mengikat janji suci untuk selamanya.",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
  ],
  gift: {
    banks: [
      { bank: "Bank BCA", number: "1234567890", holder: "Rangga Pratama" },
      { bank: "Bank Mandiri", number: "0987654321", holder: "Sinta Maharani" },
    ],
    address: {
      label: "Kirim Kado",
      value: "Jl. Melati No. 10, RT 01/RW 02, Jakarta Selatan, 12345",
    },
  },
  music: { src: "", title: "Backsound" },
  hero: {
    background:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
};
