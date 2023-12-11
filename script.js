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
        `);

        const table = document.querySelector('#table');
        for (let i=1; i<arr.length-1; i++) {
            let [nameInd, phoneInd, emailInd, bdayInd, ...addressInd] = arr[i];
            let res = "";
            for (let el in addressInd){
                res += addressInd[el].replaceAll('\"', '') + ',';
            }
            addressInd = res.slice(0, -1);
            table.insertAdjacentHTML('beforeend', `
            <tr class="row" style="background-color: white;">
                <td class="name">${nameInd}</td>
                <td class="telephone">${phoneInd}</td>
                <td class="email">${emailInd}</td>
                <td class="bday">${bdayInd}</td>
                <td class="address">${addressInd}</td>
            </tr>
            `);
        }

        main.insertAdjacentHTML('beforebegin',`
        <style>
            tr.row:hover{
                background: rgba(99, 70, 180, 0.25);
            }
        </style>
        `);
    };

    reader.onerror = () => {
        try{
            console.log(reader.error);
            document.getElementsByClassName('.header').style.visibility = "visible";
        }catch (err){
            console.log(err);
        }
        
    };
});
