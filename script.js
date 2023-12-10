const input = document.querySelector('.input-file input[type=file]');
// const main = document.querySelector('.main');
input.addEventListener('change', function(event) {
	let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    // alert(file.name);
    // main.insertAdjacentHTML('beforebegin', '<div class="header"><span>Неправильный формат файла, разрешены только файлы .CSV</span></div>');
    reader.onload = () => {
        console.log(reader.result);
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
