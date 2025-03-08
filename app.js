const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "No Telepon",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

//menampilkan daftar semua nama contacts
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no kontak baru",
  handler() {
    contacts.listContact();
  },
});

//menampilkan detail kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah kontak berdasarkan nama ",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

//menghapus kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menampilkan sebuah kontak berdasarkan nama ",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});
yargs.parse();
