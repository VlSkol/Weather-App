

 // Отримуємо елементи
 const modal = document.getElementById("myModal");
 const openModalBtn = document.getElementById("openModal");
 const closeModalBtn = document.getElementsByClassName("close")[0];

 // Відкрити модальне вікно
 openModalBtn.onclick = function() {
     modal.style.display = "block";
 }

 // Закрити модальне вікно
 closeModalBtn.onclick = function() {
     modal.style.display = "none";
 }

 // Закрити модальне вікно при кліку за межами вікна
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }