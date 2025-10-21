document.addEventListener('DOMContentLoaded', () => {
    
    const usernameEl = document.getElementById('username-input');
    const passwordEl = document.getElementById('password-input');
    const userCursor = document.getElementById('user-cursor');
    const passCursor = document.getElementById('pass-cursor');
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const skipPrompt = document.getElementById('skip-prompt');

    const username = "Utente_ideologo";
    const password = "•".repeat(7); // Uso "•" che è più carino di "*"
    const typeSpeed = 100; // Millisecondi per carattere
    
    let skip = false;
    let timer1, timer2;

    // Funzione per "scrivere" il testo
    function typeWriter(text, element, speed, callback) {
        let i = 0;
        function typing() {
            if (skip) {
                element.innerHTML = text;
                if (callback) callback();
                return;
            }
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                return setTimeout(typing, speed);
            } else {
                if (callback) callback();
            }
        }
        typing();
    }

    // Funzione per mostrare il contenuto principale
    function showMainContent() {
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
        skipPrompt.style.display = 'none';
    }
    
    // Funzione per saltare l'animazione
    function skipAnimation() {
        skip = true;
        // Pulisce i timeout se sono ancora in esecuzione
        if (timer1) clearTimeout(timer1);
        if (timer2) clearTimeout(timer2);
        
        usernameEl.innerHTML = username;
        passwordEl.innerHTML = password;
        userCursor.style.display = 'none';
        passCursor.style.display = 'none';
        
        showMainContent();
    }
    
    // Avvia l'ascoltatore per il tasto SPAZIO
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !skip) {
            skipAnimation();
        }
    });

    // Avvia la sequenza di animazione
    function startAnimation() {
        // 1. Scrivi username
        timer1 = typeWriter(username, usernameEl, typeSpeed, () => {
            userCursor.style.display = 'none';
            passCursor.style.display = 'inline-block';
            
            // 2. Scrivi password
            timer2 = typeWriter(password, passwordEl, typeSpeed, () => {
                passCursor.style.display = 'none';
                
                // 3. Attendi un po' e mostra il contenuto
                setTimeout(showMainContent, 1000);
            });
        });
    }

    // Inizia dopo un breve ritardo per far caricare la pagina
    setTimeout(startAnimation, 500);
});
