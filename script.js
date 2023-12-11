const input = document.querySelector(".input-file input[type=file]");
const main = document.querySelector(".main");

if (
  localStorage.getItem("flag") == null ||
  localStorage.getItem("flag") == undefined
) {
  localStorage.setItem("flag", "true");
}
if (
  typeof JSON.parse(localStorage.getItem(0)) == "undefined" ||
  localStorage.getItem("flag") == "true" ||
  typeof JSON.parse(localStorage.getItem(0)) == null
) {
  input.addEventListener("change", function (event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    // alert(file.name);
    // main.insertAdjacentHTML('beforebegin', '<div class="header"><span>Неправильный формат файла, разрешены только файлы .CSV</span></div>');
    reader.onload = () => {
      let file_text = reader.result;
      arr = file_text.split("\n").map((el) => el.split(","));
      let [name, phone, email, bday, address] = arr[0];
      // console.log(`name: ${name},\nphone: ${phone},\nemail: ${email},\nbday: ${bday},\naddress: ${address}`);
      main.innerHTML = "";
      // В БД есть данные
      localStorage.setItem("flag", "false");
      main.insertAdjacentHTML(
        "afterbegin",
        `
                    <div class="main_header">
                        <button class="main_header_btn" onclick="resetData()">Загрузить новый файл</button>
                    </div>
                    <div class="main_table">
                        <table cellspacing="0" id="table">
                            <tr>
                                <th class="name">Имя</th>
                                <th class="telephone">Номер телефона</th>
                                <th class="email">Email</th>
                                <th class="bday">Дата рождения</th>
                                <th class="address">Адрес</th>
                            </tr>
                        </table>
                    </div>
                    `
      );

      const table = document.querySelector("#table");
      for (let i = 1; i < arr.length - 1; i++) {
        let [nameInd, phoneInd, emailInd, bdayInd, ...addressInd] = arr[i];
        let res = "";
        for (let el in addressInd) {
          res += addressInd[el].replaceAll('"', "") + ",";
        }
        addressInd = res.slice(0, -1);
        table.insertAdjacentHTML(
          "beforeend",
          `
                        <tr class="row" style="background-color: white;">
                            <td class="name">${nameInd}</td>
                            <td class="telephone">${phoneInd}</td>
                            <td class="email">${emailInd}</td>
                            <td class="bday">${bdayInd}</td>
                            <td class="address">${addressInd}</td>
                        </tr>
                        `
        );

        localStorage.setItem("length", arr.length);
        // console.log(localStorage.getItem('name'));
        const user = {
          name: nameInd,
          phone: phoneInd,
          email: emailInd,
          bday: bdayInd,
          address: addressInd,
        };
        localStorage.setItem(`${i}`, JSON.stringify(user));
        console.log(JSON.parse(localStorage.getItem(`${i}`)));
        // console.log(typeof JSON.parse(localStorage.getItem(`${i}`)) != "undefined");
        // console.log(localStorage.getItem(`${i}`));
      }

      // // Открываем нашу базу данных; она создаётся, если её ещё не существует
      // let request = window.indexedDB.open("notes", 1);
      // // обработчик onerror означает, что база данных не открылась успешно
      // request.onerror = function () {
      //     console.log("Database failed to open");
      // };

      // // обработчик onsuccess означает, что база данных открыта успешно
      // request.onsuccess = function () {
      //     console.log("Database opened successfully");

      //     // Сохраните открытую базу данных в переменной db. Она будет использована ниже
      //     db = request.result;

      //     // Выполните функцию displayData() для отображения тех заметок, которые уже находятся в IDB
      //     displayData();
      // };

      // // Настройка таблиц баз данных, если это ещё не было сделано
      // request.onupgradeneeded = function (e) {
      //     // Захват ссылки на открытую базу данных
      //     let db = e.target.result;

      //     // Создайте objectStore, где мы сможем хранить заметки (фактически как единая таблица)
      //     // включая автоматически увеличивающееся значение ключа
      //     let objectStore = db.createObjectStore("notes", {
      //         keyPath: "id",
      //         autoIncrement: true,
      //     });

      //     // Обозначьте, какие элементы данных будет содержать objectStore
      //     objectStore.createIndex("nameInd", "nameInd", { unique: false });
      //     objectStore.createIndex("phoneInd", "phoneInd", { unique: false });
      //     objectStore.createIndex("emailInd", "emailInd", { unique: false });
      //     objectStore.createIndex("bdayInd", "bdayInd", { unique: false });
      //     objectStore.createIndex("addressInd", "addressInd", { unique: false });

      //     console.log("Database setup complete");
      // };

      main.insertAdjacentHTML(
        "beforebegin",
        `
                    <style>
                        tr.row:hover{
                            background: rgba(99, 70, 180, 0.25);
                        }
                    </style>
                    `
      );
    };

    reader.onerror = () => {
      try {
        console.log(reader.error);
        document.getElementsByClassName(".header").style.visibility = "visible";
      } catch (err) {
        console.log(err);
      }
    };
  });
} else {
  main.innerHTML = "";
  main.insertAdjacentHTML(
    "afterbegin",
    `
                    <div class="main_header">
                        <button class="main_header_btn" onclick="resetData()">Загрузить новый файл</button>
                    </div>
                    <div class="main_table">
                        <table cellspacing="0" id="table">
                            <tr>
                                <th class="name">Имя</th>
                                <th class="telephone">Номер телефона</th>
                                <th class="email">Email</th>
                                <th class="bday">Дата рождения</th>
                                <th class="address">Адрес</th>
                            </tr>
                        </table>
                    </div>
            `
  );

  const table = document.querySelector("#table");
  let len = Number(localStorage.getItem("length"));
  for (let i = 1; i < len + 1; i++) {
    let data = JSON.parse(localStorage.getItem(`${i}`));
    let [nameInd, phoneInd, emailInd, bdayInd, addressInd] = [
      data.name,
      data.phone,
      data.email,
      data.bday,
      data.address,
    ];
    table.insertAdjacentHTML(
      "beforeend",
      `
                <tr class="row" style="background-color: white;">
                    <td class="name">${nameInd}</td>
                    <td class="telephone">${phoneInd}</td>
                    <td class="email">${emailInd}</td>
                    <td class="bday">${bdayInd}</td>
                    <td class="address">${addressInd}</td>
                </tr>
                `
    );
  }
}

document.getElementsByClassName("main_header_btn").onclick = resetData;
function resetData() {
  localStorage.clear();
  localStorage.setItem("flag", "true");
  location.reload();
}
