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

export type CategoryMeta = {
  name: string;
  description: string;
  color: string;
  accent: string;
  taskCount: number;
  doneCount: number;
};

export const CATEGORY_META: CategoryMeta[] = [
  {
    name: "Maintenance",
    description: "Pekerjaan perbaikan & perawatan fasilitas kantor.",
    color: "bg-indigo-500",
    accent: "from-indigo-500/30 to-violet-500/10",
    taskCount: 2,
    doneCount: 1,
  },
  {
    name: "Procurement",
    description: "Pengadaan barang, ATK, dan kebutuhan operasional.",
    color: "bg-amber-500",
    accent: "from-amber-500/30 to-orange-500/10",
    taskCount: 1,
    doneCount: 0,
  },
  {
    name: "Event",
    description: "Persiapan town hall, gathering, dan acara internal.",
    color: "bg-fuchsia-500",
    accent: "from-fuchsia-500/30 to-pink-500/10",
    taskCount: 1,
    doneCount: 0,
  },
  {
    name: "Inventaris",
    description: "Audit, mutasi, dan stok opname aset perusahaan.",
    color: "bg-emerald-500",
    accent: "from-emerald-500/30 to-teal-500/10",
    taskCount: 1,
    doneCount: 0,
  },
  {
    name: "Vendor",
    description: "Kontrak, evaluasi, dan koordinasi vendor eksternal.",
    color: "bg-rose-500",
    accent: "from-rose-500/30 to-pink-500/10",
    taskCount: 1,
    doneCount: 0,
  },
  {
    name: "Administrasi",
    description: "Surat menyurat, rekap data, dan pelaporan rutin.",
    color: "bg-sky-500",
    accent: "from-sky-500/30 to-cyan-500/10",
    taskCount: 2,
    doneCount: 1,
  },
];

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  status: "active" | "away" | "offline";
  activeTasks: number;
  completedThisWeek: number;
  workload: number;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-001",
    name: "Andini Putri",
    initials: "AP",
    role: "GA Officer",
    email: "andini.p@perusahaan.co.id",
    status: "active",
    activeTasks: 4,
    completedThisWeek: 6,
    workload: 78,
  },
  {
    id: "tm-002",
    name: "Budi Santoso",
    initials: "BS",
    role: "GA Staff — Maintenance",
    email: "budi.s@perusahaan.co.id",
    status: "active",
    activeTasks: 3,
    completedThisWeek: 4,
    workload: 62,
  },
  {
    id: "tm-003",
    name: "Citra Larasati",
    initials: "CL",
    role: "GA Staff — Event",
    email: "citra.l@perusahaan.co.id",
    status: "away",
    activeTasks: 5,
    completedThisWeek: 3,
    workload: 85,
  },
  {
    id: "tm-004",
    name: "Dimas Rahman",
    initials: "DR",
    role: "GA Staff — Inventaris",
    email: "dimas.r@perusahaan.co.id",
    status: "active",
    activeTasks: 2,
    completedThisWeek: 5,
    workload: 48,
  },
  {
    id: "tm-005",
    name: "Eko Marwoto",
    initials: "EM",
    role: "GA Staff — Administrasi",
    email: "eko.m@perusahaan.co.id",
    status: "offline",
    activeTasks: 1,
    completedThisWeek: 7,
    workload: 32,
  },
  {
    id: "tm-006",
    name: "Fitri Hapsari",
    initials: "FH",
    role: "GA Supervisor",
    email: "fitri.h@perusahaan.co.id",
    status: "active",
    activeTasks: 3,
    completedThisWeek: 9,
    workload: 70,
  },
];

export type WeeklyPoint = {
  label: string;
  completed: number;
  created: number;
};

export const WEEKLY_TREND: WeeklyPoint[] = [
  { label: "Sen", completed: 4, created: 5 },
  { label: "Sel", completed: 6, created: 4 },
  { label: "Rab", completed: 3, created: 7 },
  { label: "Kam", completed: 7, created: 6 },
  { label: "Jum", completed: 5, created: 3 },
  { label: "Sab", completed: 2, created: 1 },
  { label: "Min", completed: 1, created: 0 },
];

export const ASSIGNEES: { value: string; label: string }[] = [
  { value: "me", label: "Saya (Andini Putri)" },
  { value: "bs", label: "Budi S." },
  { value: "cl", label: "Citra L." },
  { value: "dr", label: "Dimas R." },
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
