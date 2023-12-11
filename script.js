const input = document.querySelector('.input-file input[type=file]');
const main = document.querySelector('.main');

input.addEventListener('change', function(event) {
	let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    // alert(file.name);
    // main.insertAdjacentHTML('beforebegin', '<div class="header"><span>Неправильный формат файла, разрешены только файлы .CSV</span></div>');
    reader.onload = () => {
        let file_text = reader.result;
        arr = file_text.split('\n').map(el => el.split(','));
        let [name, phone, email, bday, address] = arr[0];
        console.log(`name: ${name},\nphone: ${phone},\nemail: ${email},\nbday: ${bday},\naddress: ${address}`);
        main.innerHTML = "";
        main.insertAdjacentHTML('afterbegin', `
        <div class="main_header">
            <button class="main_header_btn">Загрузить новый файл</button>
        </div>
        <div class="main_table">
            <table cellspacing="0">
                <tr>
                    <th class="name">Имя</th>
                    <th class="telephone">Номер телефона</th>
                    <th class="email">Email</th>
                    <th class="bday">Дата рождения</th>
                    <th class="address">Адрес</th>
                </tr>
                <tr class="row">
                    <td class="name">Иванов Максим Викторович</td>
                    <td class="telephone">+78000000000</td>
                    <td class="email">test@example.com</td>
                    <td class="bday">01.01.2001</td>
                    <td class="address">г. Москва, ул. Тверская, д. 4</td>
                </tr>
                <tr class="row">
                    <td class="name">Иванов Максим Викторович</td>
                    <td class="telephone">+78000000000</td>
                    <td class="email">test@example.com</td>
                    <td class="bday">01.01.2001</td>
                    <td class="address">г. Москва, ул. Тверская, д. 4</td>
                </tr>
            </table>
        </div>
        `)
    };

    reader.onerror = () => {
        try{
            console.log(reader.error);
            document.getElementsByClassName('.header').style.visibility = "visible";
        }catch (err){
            console.log(err);
        }
        
    };
	// document.querySelector('.input-file span').next().html(file.name);
});


/* <div class="main_row">
    <span class="main_row title">${name}</span>
    <span class="main_row title">${phone}</span>
    <span class="main_row title">${email}</span>
    <span class="main_row title">${bday}</span>
    <span class="main_row title">${address}</span>
</div> */