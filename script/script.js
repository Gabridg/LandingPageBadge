document.addEventListener('DOMContentLoaded', function () {
  // Carosello Logic
    const carouselImgs = document.querySelectorAll('.carouselImgs img');
    const totalImagesMobile = 6; // Numero di immagini in modalità mobile
    const totalImagesDesktop = 8; // Numero di immagini in modalità desktop
    const visibleImagesMobile = 1; // Numero di immagini visibili in modalità mobile
    const visibleImagesDesktop = 3; // Numero di immagini visibili in modalità desktop
    const scrollInterval = 2500; // Intervallo di scorrimento automatico in millisecondi
    let currentIndex = 0;
    let scrollTimer;

    function updateCarousel() {
        let activeCount = 0; // Contatore per tener traccia delle immagini attive
        carouselImgs.forEach((img, index) => {
          if (index >= currentIndex && index < currentIndex + getVisibleImages()) {
            img.classList.add('active');
            img.classList.remove('inactive');
            if (activeCount === 1) { // Se è la seconda immagine attiva
              img.classList.add('main-image');
            } else {
              img.classList.remove('main-image');
            }
            activeCount++;
          } else {
            img.classList.remove('active', 'main-image');
            img.classList.add('inactive');
          }
        });
      }

    function getVisibleImages() {
        return window.innerWidth <= 990 ? visibleImagesMobile : visibleImagesDesktop; // Determina il numero di immagini visibili in base alla larghezza della finestra
    }

    function getTotalImages() {
        return window.innerWidth <= 990 ? totalImagesMobile : totalImagesDesktop; // Determina il numero totale di immagini in base alla larghezza della finestra
    }

    function scrollNext() {
        if (currentIndex < getTotalImages() - getVisibleImages()) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function startAutoScroll() {
        scrollTimer = setInterval(scrollNext, scrollInterval);
    }

    function stopAutoScroll() {
        clearInterval(scrollTimer);
    }

    function restartAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }

    document.getElementById('left').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Se siamo alla prima immagine e viene premuta la freccia sinistra, vai all'ultima immagine
            currentIndex = getTotalImages() - getVisibleImages();
        }
        updateCarousel();
        restartAutoScroll();
    });

    document.getElementById('right').addEventListener('click', () => {
        if (currentIndex < getTotalImages() - getVisibleImages()) {
            currentIndex++;
        } else {
            // Se l'ultima immagine è attiva, riavvia il ciclo
                currentIndex = 0;
        }
        updateCarousel();
        restartAutoScroll();
    });

    // Avvia lo scorrimento automatico quando la pagina si carica
    startAutoScroll();

    // Aggiungi un ascoltatore per il ridimensionamento della finestra per aggiornare il carosello quando la dimensione della finestra cambia
    window.addEventListener('resize', () => {
        // Aggiorna il carosello solo se la larghezza della finestra supera la soglia mobile
        if (window.innerWidth > 768) {
            updateCarousel();
        }
    });


    // Gestione al primo caricamento per la classe 'exploded' sulla classe 'main-image'

    const closeButton = document.getElementById('closeButton');
    let mainImage = document.querySelector('.carouselImgs img.main-image');
    
        mainImage.addEventListener('click', () => {
            mainImage.classList.add('exploded');
            // Verifica se l'immagine ha la classe exploded
            if (mainImage.classList.contains('exploded')) {
                // Se ha la classe exploded, aggiungi la classe activeButton al pulsante di chiusura e ferma lo scorrimento automatico
                closeButton.classList.add('activeButton');
                stopAutoScroll();
            } else {
                // Se non ha la classe exploded, rimuovi la classe activeButton dal pulsante di chiusura e riavvia lo scorrimento automatico
                closeButton.classList.remove('activeButton');
                restartAutoScroll();
            }
        });

    // Funzione per gestire l'evento di clic sulle immagini con classe main-image dopop lo spostamento dinamico della classe stessa
    // dinamicamente aggiorna la pagina e cerca di nuovo la classe main-image nel carosello per aggiungere la classe 'exploded'

    function handleClick(event) {
        const clickedImage = event.target;
        if (clickedImage.classList.contains('main-image')) {
            clickedImage.classList.add('exploded');
            const closeButton = document.getElementById('closeButton');
            // Verifica se l'immagine cliccata ha la classe exploded
            if (clickedImage.classList.contains('exploded')) {
                closeButton.classList.add('activeButton');
                stopAutoScroll();
            } else {
                closeButton.classList.remove('activeButton');
                restartAutoScroll();
            }
        }
    }




    // Seleziona tutte le immagini con la classe main-image e aggiungi un gestore di eventi clic a ciascuna di esse
    function updateEventListeners() {
        document.querySelectorAll('.carouselImgs img.main-image').forEach(image => {
            image.removeEventListener('click', handleClick);
            image.addEventListener('click', handleClick);
        });
    }

    // Esegui updateEventListeners quando il DOM viene caricato
    document.addEventListener('DOMContentLoaded', () => {
        updateEventListeners();

        // Assicurati che l'immagine con classe main-image sia cliccabile non appena la pagina viene caricata
        const mainImage = document.querySelector('.carouselImgs img.main-image');
        if (mainImage) {
            mainImage.addEventListener('click', handleClick);
        }
    });

    // Aggiorna i gestori degli eventi quando ci sono mutazioni nel DOM che coinvolgono la classe main-image
    const observer = new MutationObserver(updateEventListeners);
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });


    // Gestore di eventi per cliccare al di fuori delle immagini
    document.addEventListener('click', (event) => {
        const target = event.target;
        const imagesContainer = document.querySelector('.carouselImgs');
        if (!imagesContainer.contains(target)) {
            // Clic al di fuori delle immagini, rimuovi la classe exploded e riavvia l'autoscroll
            document.querySelectorAll('.carouselImgs img.exploded').forEach(image => {
                image.classList.remove('exploded');
            });
            restartAutoScroll();
        }
    });


    // Gestore di eventi per cliccare sulla "X"
    closeButton.addEventListener('click', () => {
        const explodedImages = document.querySelectorAll('.carouselImgs img.exploded');
        explodedImages.forEach(image => {
            image.classList.remove('exploded');
            closeButton.classList.remove('activeButton');
        });
        restartAutoScroll();
    });
    
    // Pop-up for Privacy Policy and Terms&Conditions
    
    document.querySelectorAll(".privacy-policy-link").forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById("privacy-policy-popup").style.display = "block";
        });
    });
    
    document.querySelectorAll(".terms-link").forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById("terms-popup").style.display = "block";
        });
    });
    
    document.querySelectorAll(".close").forEach(function(closeButton) {
        closeButton.addEventListener("click", function() {
            document.querySelectorAll(".popup").forEach(function(popup) {
                popup.style.display = "none";
            });
        });
    });

    // Banner pop-up Cookie Policy

    window.addEventListener('DOMContentLoaded', (event) => {
        if (!localStorage.getItem('cookieBannerClosed')) {
            document.getElementById('cookie-banner').style.display = 'block';
        }
    });
    
    document.getElementById('close-cookie-banner').addEventListener('click', function() {
        document.getElementById('cookie-banner').style.display = 'none';
        localStorage.setItem('cookieBannerClosed', 'true');
    });

    // Control on Media Query

    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('subMenu');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('d-none');
    });

    const elemento = document.getElementById('menuBtn');

    // Variabile per tenere traccia dello stato del colore
    let isColored = false;

    // Aggiungi un gestore di eventi per l'evento 'click'
    elemento.addEventListener('click', function() {
        // Verifica lo stato attuale del colore
        if (!isColored) {
            // Se l'elemento non è colorato, coloralo
            elemento.style.backgroundColor = '#063460';
            elemento.style.color = '#ebbc34';
            elemento.style.border = '2px solid #ebbc34';
        } else {
            // Se l'elemento è già colorato, ripristina il colore predefinito
            elemento.style.backgroundColor = ''; // Reimposta il colore di sfondo al valore predefinito
            elemento.style.color = ''; // Reimposta il colore del testo al valore predefinito
            elemento.style.border = ''; // Reimposta il bordo al valore predefinito
        }

        // Cambia lo stato del colore
        isColored = !isColored;
    });

    // Funzione per controllare se tutti i campi sono stati compilati e aggiungere la classe di errore agli input
    
    function validateForm() {
        var name = document.getElementById("name");
        var surname = document.getElementById("surname");
        var email = document.getElementById("email");
        var agency = document.getElementById("agency");
        var tel = document.getElementById("tel");
        var message = document.getElementById("message");
        var privacyPolicy = document.getElementById("privacyPolicy").checked;

        var errorMessages = '';

        if (name.value.trim() === '') {
            errorMessages += 'Il campo Nome è obbligatorio.<br>';
            name.classList.add('input-error');
        } else {
            name.classList.remove('input-error');
        }

        if (surname.value.trim() === '') {
            errorMessages += 'Il campo Cognome è obbligatorio.<br>';
            surname.classList.add('input-error');
        } else {
            surname.classList.remove('input-error');
        }

        if (email.value.trim() === '') {
            errorMessages += 'Il campo E-mail è obbligatorio.<br>';
            email.classList.add('input-error');
        } else {
            email.classList.remove('input-error');
        }

        if (agency.value.trim() === '') {
            errorMessages += 'Il campo Azienda è obbligatorio.<br>';
            agency.classList.add('input-error');
        } else {
            agency.classList.remove('input-error');
        }

        if (message.value.trim() === '') {
            errorMessages += 'Il campo Messaggio è obbligatorio.<br>';
            message.classList.add('input-error');
        } else {
            message.classList.remove('input-error');
        }

        if (errorMessages !== '') {
            // Visualizza i messaggi di errore
            var errorContainer = document.getElementById("errorMessages");
            errorContainer.innerHTML = errorMessages;
            return false;
        }
        return true;
    }

    // Controllo se l'utente ha spuntato la checkbox della Privacy Policy prima di poter inviare una mail
    document.getElementById("contactsForm").addEventListener("submit", function(event) {
        var privacyPolicyCheckbox = document.getElementById("privacyPolicy");
        if (!privacyPolicyCheckbox.checked) {
            // Mostra la finestra modale
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            event.preventDefault(); // Impedisce l'invio del modulo
        } else {
            // Se la checkbox è spuntata, controlla se tutti i campi sono stati compilati
            if (!validateForm()) {
                event.preventDefault(); // Impedisce l'invio del modulo se ci sono errori
            }
        }
    });

    // Ottengo il pulsante di chiusura
    var span = document.getElementsByClassName("close")[0];

    // Quando l'utente clicca sul pulsante di chiusura, chiudo la finestra modale
    span.onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    // Quando l'utente clicca fuori dalla finestra modale, chiudila
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    //  Messaggio di errore o riuscita di invio email
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');

    // Mostra un messaggio di conferma verde o di errore rosso a seconda del valore del parametro 'success'
    if (success === 'true') {
        // Se l'invio ha avuto successo, mostra un messaggio di conferma verde
        document.getElementById('infoMail').innerHTML = 'Mail inviata con successo!';
        document.getElementById('infoMail').style.color = 'green';
    } else if (success === 'false') {
        // Se l'invio ha fallito, mostra un messaggio di errore rosso
        document.getElementById('infoMail').innerHTML = 'La mail non può essere inviata a causa di un errore';
        document.getElementById('infoMail').style.color = '#f00e0e';
        document.getElementById('infoMail').style.backgroundColor = '#ff795d';
    }
});