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
        <span></span>
        <div class="main_table">
            <div class="main_row">
                <span class="main_row title">${name}</span>
                <span class="main_row title">${phone}</span>
                <span class="main_row title">${email}</span>
                <span class="main_row title">${bday}</span>
                <span class="main_row title">${address}</span>
            </div>
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
