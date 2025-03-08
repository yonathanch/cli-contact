const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// buat folder data jika blm ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contacts json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  //   const file = fs.readFileSync("data/contacts.json", "utf-8");
  //   const contacts = JSON.parse(file);
  const contacts = loadContact();

  //cek duplikat pada json
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.blue.inverse.bold("Kontak sudah terdaftar! Gunakan nama lain!")
    );
    return false;
  }

  //cek validator email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.blue.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  //cek no hp
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.blue.inverse.bold("No Handphone tidak valid (ID:+62)!"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terimah Kasih sudah mengisi data kontak");
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.green.inverse.bold("Daftar Kontak : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.green.inverse.bold(contact.nama));
  console.log(contact.noHP);

  if (contact.email) {
    console.log(contact.email);
  }
  console.log(contact.email);
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(
    chalk.green.inverse.bold(`data kontak ${nama} berhasil dihapus!`)
  );
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
