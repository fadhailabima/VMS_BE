const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function seeder() {
  try {
    const role = await prisma.mst_role.createMany({
      data: [
        {
          nama_role: "Vendor",
        },
        {
          nama_role: "Staff",
        },
        {
          nama_role: "Manager",
        },
        {
          nama_role: "Admin",
        },
      ],
    });

    const jenis_document = await prisma.mst_jenis_document.createMany({
      data: [
        {
          nama_document: "Surat Permohonan menjadi DRM",
        },
        {
          nama_document: "Akta pendirian beserta perubahan terakhir",
        },
        {
          nama_document:
            "Akta perubahan Anggaran Dasar (AD) beserta Surat Keputusan/Surat Penerimaan Pemberitahuan Menteri Hukum dan HAM",
        },
        {
          nama_document:
            "Tanda Daftar Perusahaan (TDP)/ Nomor Induk Berusaha (NIB)",
        },
        {
          nama_document: "Surat Ijin Usaha Perdagangan (SILUP)/ Izin Usaha OSS",
        },
        {
          nama_document:
            "Surat Ijin Tempat Usaha (SITUJ/ Surat Keterangan Domisili Usaha (SKDU)/zin Lokasi OSS",
        },
        {
          nama_document: "Nomor Pokok Wajib Pajak (NPWP)",
        },
        {
          nama_document: "Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)",
        },
        {
          nama_document:
            "Surat Keterangan Fiskal atau SPT Tahunan terakhir dan SPT Masa PPN, dilengkapi bukti setor",
        },
        {
          nama_document:
            "KTP Pimpinan Perusahaan dan Struktur Organisasi Perusahaan",
        },
        {
          nama_document:
            "Daftar Pengalaman pekerjaan dan portofolio pekerjaan minimal 5 thun terakhir",
        },
        {
          nama_document: "Company Profile",
        },
        {
          nama_document: "Document Pendukung Lainya",
        },
      ],
    });

    const jenis_sertifikasi = await prisma.mst_jenis_sertifikasi.createMany({
      data: [
        {
          nama_sertifikasi: "Pengadaan Barang dan Jasa",
        },
        {
          nama_sertifikasi: "Jasa Konsultasi",
        },
        {
          nama_sertifikasi: "Jasa Lainnya",
        },
        {
          nama_sertifikasi: "Lainnya",
        },
      ],
    });

    const satuan = await prisma.mst_satuan.createMany({
      data: [
        {
          nama_satuan: "Unit",
        },
        {
          nama_satuan: "KG",
        },
        {
          nama_satuan: "Ton",
        },
        {
          nama_satuan: "Pcs",
        },
      ],
    });

    const kurs = await prisma.mst_kurs.createMany({
      data: [
        {
          nama_kurs: "USD",
        },
        {
          nama_kurs: "IDR",
        },
      ],
    });

    const jenis_product = await prisma.mst_jenis_product.createMany({
      data: [
        {
          nama_jenis_product: "Alat Medis Diagnostik",
        },
        {
          nama_jenis_product: "Peralatan Bedah & Instrumen Medis",
        },
        {
          nama_jenis_product: "Peralatan Rumah Sakit & Klinik",
        },
        {
          nama_jenis_product: "Alat Kesehatan Umum",
        },
        {
          nama_jenis_product: "Reagen & Bahan Medis Habis Pakai",
        },
        {
          nama_jenis_product: "Perangkat Digital & Telemedisin",
        },
      ],
    });

    const status = await prisma.mst_status.createMany({
      data: [
        {
          kode_status: "SMS00001",
          nama_status: "Terverifikasi",
          group_status: "status_verifikasi_drm",
        },
        {
          kode_status: "SMS00002",
          nama_status: "Tolak",
          group_status: "status_verifikasi_drm",
        },
        {
          kode_status: "SMS00003",
          nama_status: "Penawaran Diajukan",
          group_status: "status_proses_penawaran",
        },
        {
          kode_status: "SMS00004",
          nama_status: "Penawaran Dipilih Staff",
          group_status: "status_proses_penawaran",
        },
        {
          kode_status: "SMS00005",
          nama_status: "Penawaran Dipilih Manager",
          group_status: "status_proses_penawaran",
        },
        {
          kode_status: "SMS00006",
          nama_status: "Penawaran Ditolak Staff",
          group_status: "status_proses_penawaran",
        },
        {
          kode_status: "SMS00007",
          nama_status: "Penawaran Ditolak Manager",
          group_status: "status_proses_penawaran",
        },
        {
          kode_status: "SMS00008",
          nama_status: "Berlaku",
          group_status: "status_penawaran",
        },
        {
          kode_status: "SMS00009",
          nama_status: "Tidak Berlaku",
          group_status: "status_penawaran",
        },
        {
          kode_status: "SMS00010",
          nama_status: "Sudah Upload",
          group_status: "status_upload_document",
        },
        {
          kode_status: "SMS00011",
          nama_status: "Belum Upload",
          group_status: "status_upload_document",
        },
      ],
    });

    const hashedPassword = await bcrypt.hash("p@ssw0rd", 10);

    const user = await prisma.user.createMany({
      data: [
        {
          nip: "001",
          email: "staff@ptpbn.co.id",
          username: "staff",
          password: hashedPassword,
          nama_perusahaan: "PT Parikesit Brayan Nusantara",
          nama_pic: "Hafiz",
          no_telephone: "085710116209",
          id_role: 2,
        },
        {
          nip: "002",
          email: "manager@ptpbn.co.id",
          username: "manager",
          password: hashedPassword,
          nama_perusahaan: "PT Parikesit Brayan Nusantara",
          nama_pic: "Fadhail A Bima",
          no_telephone: "085710116209",
          id_role: 3,
        },
        {
          nip: "003",
          email: "admin@ptpbn.co.id",
          username: "admin",
          password: hashedPassword,
          nama_perusahaan: "PT Parikesit Brayan Nusantara",
          nama_pic: "Randi Parikesit",
          no_telephone: "085710116209",
          id_role: 4,
        },
      ],
    });

    console.log("Seeding success");
  } catch (error) {
    console.error("Failed to seed database", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seeder();
