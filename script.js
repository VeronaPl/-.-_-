const input = document.querySelector('.input-file input[type=file]');
input.addEventListener('change', function(event) {
	let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    alert(file.name);
    reader.onload = () => {
        console.log(reader.result);
    };
    reader.onerror = () => {
        console.log(reader.error);
    };
	// document.querySelector('.input-file span').next().html(file.name);
});
