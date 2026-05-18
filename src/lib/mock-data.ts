export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Task = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string;
  createdAt: string;
  assignee: { name: string; initials: string };
  progress: number;
  attachments: number;
  comments: number;
};

export const STATUSES: { value: TaskStatus; label: string; color: string }[] = [
  { value: "todo", label: "To Do", color: "bg-slate-500" },
  { value: "in-progress", label: "In Progress", color: "bg-indigo-500" },
  { value: "review", label: "Review", color: "bg-amber-500" },
  { value: "done", label: "Done", color: "bg-emerald-500" },
];

export const PRIORITIES: {
  value: TaskPriority;
  label: string;
  dot: string;
  badge: string;
}[] = [
  {
    value: "low",
    label: "Rendah",
    dot: "bg-slate-400",
    badge: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  },
  {
    value: "medium",
    label: "Sedang",
    dot: "bg-sky-400",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  {
    value: "high",
    label: "Tinggi",
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    value: "urgent",
    label: "Mendesak",
    dot: "bg-rose-400",
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
];

export const CATEGORIES = [
  "Maintenance",
  "Procurement",
  "Event",
  "Inventaris",
  "Vendor",
  "Administrasi",
];

export const MOCK_TASKS: Task[] = [
  {
    id: "TSK-001",
    title: "Pengadaan ATK untuk lantai 5",
    description:
      "Order ulang stok alat tulis kantor termasuk kertas A4, tinta printer, dan map untuk tim Finance.",
    requirements: [
      "List item dari Finance manager",
      "Quotation minimal 3 vendor",
      "Approval budget dari direksi",
      "PO ditandatangani sebelum Jumat",
    ],
    status: "in-progress",
    priority: "high",
    category: "Procurement",
    dueDate: "2026-05-22",
    createdAt: "2026-05-15",
    assignee: { name: "Andini P.", initials: "AP" },
    progress: 55,
    attachments: 3,
    comments: 4,
  },
  {
    id: "TSK-002",
    title: "Servis AC ruang meeting besar",
    description:
      "Koordinasi dengan vendor AC untuk servis berkala 4 unit AC di ruang meeting utama.",
    requirements: [
      "Jadwal saat ruangan tidak terpakai",
      "Konfirmasi vendor 1 hari sebelumnya",
      "Form maintenance ditandatangani",
    ],
    status: "todo",
    priority: "medium",
    category: "Maintenance",
    dueDate: "2026-05-25",
    createdAt: "2026-05-16",
    assignee: { name: "Budi S.", initials: "BS" },
    progress: 0,
    attachments: 1,
    comments: 0,
  },
  {
    id: "TSK-003",
    title: "Persiapan town hall meeting Q2",
    description:
      "Setup ruang aula, sound system, konsumsi, dan dokumentasi untuk town hall karyawan kuartal 2.",
    requirements: [
      "Booking aula konfirmasi",
      "Brief vendor catering (150 pax)",
      "Cek sound system & proyektor H-1",
      "Koordinasi tim dokumentasi",
      "Backdrop & banner siap H-2",
    ],
    status: "in-progress",
    priority: "urgent",
    category: "Event",
    dueDate: "2026-05-20",
    createdAt: "2026-05-10",
    assignee: { name: "Citra L.", initials: "CL" },
    progress: 72,
    attachments: 6,
    comments: 11,
  },
  {
    id: "TSK-004",
    title: "Audit inventaris gudang lantai B1",
    description:
      "Cek fisik dan rekonsiliasi stok inventaris di gudang B1 sesuai sistem.",
    requirements: [
      "Akses ke sistem inventory",
      "Tim minimal 2 orang",
      "Lembar audit dicetak",
      "Laporan selisih ke Finance",
    ],
    status: "review",
    priority: "medium",
    category: "Inventaris",
    dueDate: "2026-05-19",
    createdAt: "2026-05-12",
    assignee: { name: "Dimas R.", initials: "DR" },
    progress: 90,
    attachments: 2,
    comments: 3,
  },
  {
    id: "TSK-005",
    title: "Renewal kontrak vendor kebersihan",
    description:
      "Review draft kontrak baru dengan vendor cleaning service dan negosiasi harga.",
    requirements: [
      "Draft kontrak dari Legal",
      "Bandingkan dengan 2 vendor alternatif",
      "Meeting negosiasi terjadwal",
    ],
    status: "todo",
    priority: "high",
    category: "Vendor",
    dueDate: "2026-05-30",
    createdAt: "2026-05-17",
    assignee: { name: "Andini P.", initials: "AP" },
    progress: 10,
    attachments: 2,
    comments: 1,
  },
  {
    id: "TSK-006",
    title: "Input absensi tamu minggu lalu",
    description:
      "Rekap dan input data buku tamu ke spreadsheet bulanan untuk laporan ke HRD.",
    requirements: ["Akses ke spreadsheet", "Buku tamu fisik dari security"],
    status: "done",
    priority: "low",
    category: "Administrasi",
    dueDate: "2026-05-17",
    createdAt: "2026-05-14",
    assignee: { name: "Eko M.", initials: "EM" },
    progress: 100,
    attachments: 0,
    comments: 2,
  },
  {
    id: "TSK-007",
    title: "Distribusi seragam baru karyawan",
    description:
      "Bagikan seragam baru ke karyawan sesuai size yang sudah didata, mulai dari divisi Operasional.",
    requirements: [
      "Data size dari HRD",
      "Tanda terima per karyawan",
      "Stok seragam dari gudang",
    ],
    status: "in-progress",
    priority: "medium",
    category: "Administrasi",
    dueDate: "2026-05-28",
    createdAt: "2026-05-13",
    assignee: { name: "Citra L.", initials: "CL" },
    progress: 40,
    attachments: 1,
    comments: 5,
  },
  {
    id: "TSK-008",
    title: "Perbaikan keran wastafel toilet pria L3",
    description:
      "Laporan dari user: keran bocor. Koordinasi dengan vendor plumbing internal.",
    requirements: ["Tiket maintenance dibuat", "Vendor plumbing siap"],
    status: "done",
    priority: "low",
    category: "Maintenance",
    dueDate: "2026-05-16",
    createdAt: "2026-05-15",
    assignee: { name: "Budi S.", initials: "BS" },
    progress: 100,
    attachments: 0,
    comments: 1,
  },
];
