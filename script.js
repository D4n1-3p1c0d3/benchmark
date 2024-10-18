    const questions = [
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Unit",
          "Computer Personal Unit",
          "Central Processor Unit",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
          "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
          "Counter Strike: Source",
          "Corrective Style Sheet",
          "Computer Style Sheet",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
          "Ice Cream Sandwich",
          "Jelly Bean",
          "Marshmallow",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      },
    ];


    // Si Parte

    // variabili globali
    let studente = null
    let punteggio = 0
    let indiceCorrente = 0
    let totDomande = questions.length
    let riassunto = []
    let timerDomanda

    window.onload = function() {
      verificaDimensioniSchermo();
  
      // Aggiunge anche un listener di eventi per il ridimensionamento della finestra
      window.addEventListener('resize', verificaDimensioniSchermo);
    };

    function letsGo() {
      let nome = document.getElementById("nome").value
      let privacy = document.getElementById("privacy").checked

      if (nome && privacy) {
        studente = nome
        document.getElementById("welcome").style.display = 'none'
        document.getElementById("primoLayout").style.display = 'block'
        popolaLayout()
        avviaMonitor()
      } else {
        fatal1()
      }

    }

    function results() {
      document.getElementById("primoLayout").style.display = 'none'
      document.getElementById("risultato").style.display = 'block'
      popolaSchermataFinale()
    }

    function doItAgain() {
      document.getElementById("risultato").style.display = 'none'
      document.getElementById("welcome").style.display = 'block'
      indiceCorrente = 0
      punteggio = 0
      riassunto = []
      studente = null
    }

    function mescolaArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          // Genera un numero casuale tra 0 e i (compresi)
          const j = Math.floor(Math.random() * (i + 1));
          // Scambia gli elementi in posizione i e j
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function popolaLayout () {

      clearTimeout(timerDomanda); // Azzera il timer precedente

      if (indiceCorrente<questions.length) {
        let domanda = questions[indiceCorrente].question
        let risposte = [...questions[indiceCorrente].incorrect_answers] // Crea una copia dell'array
        let generaBottoni = document.getElementById("risposte")
        let valutazioneDomanda = document.getElementById("valutazioneDomanda")
        
        // Pulisci i bottoni precedenti
        generaBottoni.innerHTML = "";
        valutazioneDomanda.innerHTML = '';
        document.getElementById("corrente").innerHTML = indiceCorrente +1
        document.getElementById("totDomande").innerHTML= totDomande
        document.querySelector("#domanda h3").innerHTML = domanda
        risposte.push(questions[indiceCorrente].correct_answer)
        mescolaArray(risposte)

        for (let i = 0; i < risposte.length; i++) {
          let bottone = document.createElement("button")
          bottone.textContent = risposte[i]
          bottone.setAttribute("onclick", "validazione(this.textContent)")
          generaBottoni.appendChild(bottone) 
        }

        // Imposta il timer visibile
        let tempoRimanente = 20; // 20 secondi
        document.getElementById("timer").textContent = tempoRimanente;

        timerDomanda = setInterval(function() {
          tempoRimanente--;
          document.getElementById("timer").textContent = tempoRimanente;

          if (tempoRimanente <= 0) {
            clearInterval(timerDomanda);
            document.getElementById("timer").textContent = ""; // Azzera il testo del timer
            validazione("Tempo scaduto"); // Invoca la validazione con tempo scaduto
          }
        }, 1000); // Aggiorna il timer ogni secondo

      } else {
        results()
      }
    }

    function validazione(risposta) {

      clearInterval(timerDomanda); // Interrompi il timer
      document.getElementById("timer").textContent = ""; // Azzera il testo del timer quando una risposta è data o il tempo scade

      let bottoni = document.querySelectorAll('button');
      bottoni.forEach(function(bottone) {
        bottone.disabled = true;
      });


      let valutazioneDomanda = document.getElementById("valutazioneDomanda")

      let responso = document.createElement("h5")
      let nextTimer = document.createElement("p")

      valutazioneDomanda.appendChild(responso)
      valutazioneDomanda.appendChild(nextTimer)

      if (risposta === questions[indiceCorrente].correct_answer) {
        responso.setAttribute("style","color:green;")
        responso.textContent = "Risposta corretta"
        punteggio++
      } else {
        responso.setAttribute("style","color:red;")
        responso.textContent = "Risposta sbagliata"
      }

      // Aggiunta dell'oggetto al riassunto
      riassunto.push({
        nDomanda: indiceCorrente + 1,
        domanda: questions[indiceCorrente].question,
        rispostaSelezionata: risposta,
        passata: risposta === questions[indiceCorrente].correct_answer ? "s" : "n"
      });
      console.log(riassunto);

      // Inizia il countdown
      let tempoRimanente = 3; // Secondi
      nextTimer.innerText = `Prossima domanda tra ${tempoRimanente}...`;

      let timer = setInterval(function() {
        tempoRimanente--;
        nextTimer.innerText = `Prossima domanda tra ${tempoRimanente}...`;

        if (tempoRimanente <= 0) {
          clearInterval(timer);
          indiceCorrente++; // Passa alla prossima domanda
          if (indiceCorrente < questions.length) {
            popolaLayout(); // Aggiorna il layout con la nuova domanda
          } else {
            // Gestione del caso in cui tutte le domande sono state mostrate
            valutazioneDomanda.innerHTML = "Hai completato tutte le domande!";
            popolaLayout()
          }
        }
      }, 1000); // Aggiorna ogni secondo
    }

    function popolaSchermataFinale() {

      //blocca monitoraggio
      stopMonitor()

      //prendi i dati del voto finale e feedback
      aggiornaFeedback()

      //riabilita i bottoni alla fine del test
      let bottoni = document.querySelectorAll('button');
      bottoni.forEach(function(bottone) {
        bottone.disabled = false;
      });

      // popola i dati superiori
      let datiStudente = document.getElementById('datiStudente');
      datiStudente.innerHTML = '';
      let nomeStudente = document.createElement('h5');
      nomeStudente.innerHTML = 'Nome: <span>' + studente + '</span>';

      // Determina se lo studente è promosso o bocciato
      let statoStudente = document.createElement('h4');
      if (punteggio >= 6) {
          statoStudente.textContent = 'Promosso';
          statoStudente.setAttribute("style","color:green;")
      } else {
          statoStudente.textContent = 'Bocciato';
          statoStudente.setAttribute("style","color:red;")
      }

      datiStudente.appendChild(nomeStudente);
      datiStudente.appendChild(statoStudente);

      //popola la lista delle domande e dei risultati
      let lista = document.getElementById("lista")
      lista.innerHTML = "<li style='font-size: 16px;'><div><strong>#</strong></div><div><strong>Domanda</strong></div><div><strong>Risposta</strong></div><div><strong>Res</strong></div></li>"; // Pulisce la lista prima di popolarla per evitare duplicati

      for (let i = 0; i < riassunto.length; i++) {
        let elemento = riassunto[i];

        let li = document.createElement("li");
        
        let divDomandaNumero = document.createElement("div");
        divDomandaNumero.textContent = elemento.nDomanda;
        li.appendChild(divDomandaNumero);

        let divDomandaTesto = document.createElement("div");
        divDomandaTesto.textContent = elemento.domanda;
        li.appendChild(divDomandaTesto);

        let divRisposta = document.createElement("div");
        divRisposta.textContent = elemento.rispostaSelezionata;
        li.appendChild(divRisposta);

        let divEsito = document.createElement("div");
        divEsito.innerHTML = "&#10070;";
        // Valida il valore di elemento.passata e imposta lo stile di conseguenza
        if (elemento.passata === "s") {
          divEsito.style.color = "green";
        } else if (elemento.passata === "n") {
          divEsito.style.color = "red";
        }

        li.appendChild(divEsito);

        lista.appendChild(li);
      }

    } 

    function guardaReport() {
      document.getElementById("listaRisposte").style.display = "block"
    }

    function nascondiReport() {
      document.getElementById("listaRisposte").style.display = "none"
    }

    function aggiornaFeedback() {
      let imageUrl = ''; // URL dell'immagine da inserire
      let commento = ''; // Testo del commento da inserire
  
      switch(punteggio) {
          case 0:
              imageUrl = 'assets/voti/0.jpg';
              commento = 'Voto 0/10 - Presidente?';
              break;
          case 1:
              imageUrl = 'assets/voti/1.jpg';
              commento = 'Voto 1/10 - Hai fatto un mix?';
              break;
          case 2:
              imageUrl = 'assets/voti/2.jpg';
              commento = 'Voto 2/10 - Spendi meglio i tuoi 5 euro';
              break;
          case 3:
              imageUrl = 'assets/voti/3.jpg';
              commento = 'Voto 3/10 - Smetti di recitare le poesie, sei a un esame!';
              break;
          case 4:
              imageUrl = 'assets/voti/4.jpg';
              commento = 'Voto 4/10 - Puoi sempre chiamare lui per far valutare meglio questo esame';
              break;
          case 5:
              imageUrl = 'assets/voti/5.jpg';
              commento = 'Voto 5/10 - Poteva comunque andare peggio';
              break;
          case 6:
              imageUrl = 'assets/voti/6.jpg';
              commento = 'Voto 6/10 - Ogni tanto però aprila la console';
              break;
          case 7:
              imageUrl = 'assets/voti/7.jpg';
              commento = 'Voto 7/10 - Se migliori ancora, un giorno riderai per queste battute';
              break;
          case 8:
              imageUrl = 'assets/voti/8.jpg';
              commento = 'Voto 8/10 - Hai terminato il tuo addestramento';
              break;
          case 9:
              imageUrl = 'assets/voti/9.jpg';
              commento = 'Voto 9/10 - Ora puoi provare a chiedere uno stipendio dignitoso';
              break;
          case 10:
              imageUrl = 'assets/voti/10.jpg';
              commento = 'Voto 10/10 - Mi congratulo con te o con ChatGPT?';
              break;
          default:
              imageUrl = 'assets/voti/fatalerror.gif';
              commento = 'Che hai combinato???';
      }
  
      // Inserisci l'immagine
      document.getElementById('immagineFinale').innerHTML = `<img src="${imageUrl}" alt="Valutazione">`;
  
      // Aggiorna il commento
      document.getElementById('commentoFinale').innerText = commento;
  }


    function fatal1() {
      document.getElementById("fatalError").style.display = 'block'
      document.getElementById("problema").innerHTML = "Prova ad inserire i dati richiesti la prossima volta!"
      
    }

    function fatal2() {
      document.getElementById("fatalError").style.display = 'block'
      document.getElementById("problema").innerHTML = "Ti avevo detto di non provare a uscire dalla scheda mentre il test è in corso!"
      stopMonitor()
      //riabilita i bottoni per permettere di ricaricare la pagina
      let bottoni = document.querySelectorAll('button');
      bottoni.forEach(function(bottone) {
        bottone.disabled = false;
      });
      
    }

    function ricarica() {
      window.location.reload();
  }


  function verificaDimensioniSchermo() {
    // Ottieni le dimensioni del viewport
    let larghezza = window.innerWidth;
    let altezza = window.innerHeight;

    // Verifica se le dimensioni sono inferiori ai limiti specificati
    if (larghezza < 1280 || altezza < 800) {
        schermoPiccolo();
    }
}

function schermoPiccolo() {
  // Svuota il contenuto del div con ID "welcome"
  document.getElementById('welcome').innerHTML = '';

  // Crea un elemento h2 per l'avviso
  let avvisoH2 = document.createElement('h2');
  avvisoH2.textContent = 'Il programma può funzionare soltanto con una risoluzione minima di 1280x800 pixel.';

  // Aggiunge l'h2 al div "welcome"
  document.getElementById('welcome').appendChild(avvisoH2);

  console.log("Modalità schermo piccolo attivata: risoluzione insufficiente.");
}


  // Funzione handler dell'evento mouseout
  function monitoraggioMouse(event) {
    // Calcola la distanza dal bordo della finestra
    const fromTop = event.clientY;
    const fromBottom = window.innerHeight - event.clientY;
    const fromLeft = event.clientX;
    const fromRight = window.innerWidth - event.clientX;

    // Soglia per determinare il "tentativo di uscita" dalla scheda (in pixel)
    const threshold = 10; // Soglia impostata a 10 pixel dai bordi

    // Controlla se il puntatore esce dai confini della pagina e avvia fatal2 se necessario
    if (fromTop < threshold || fromBottom < threshold || fromLeft < threshold || fromRight < threshold) {
        fatal2();
    }
  }

  // Funzione per iniziare il monitoraggio
  function avviaMonitor() {
    document.addEventListener('mouseout', monitoraggioMouse);
  }

  // Funzione per interrompere il monitoraggio
  function stopMonitor() {
    document.removeEventListener('mouseout', monitoraggioMouse);
  }