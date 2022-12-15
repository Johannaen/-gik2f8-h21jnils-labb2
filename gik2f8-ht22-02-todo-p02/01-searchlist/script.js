/* Nedan finns beskrivet hur denna kod förändrats sedan Lektion 3. Lektion 3 har kod som är mer lättläst och lättare att lära sig. Denna kod är optimerad med verktyg som finns i JavaScript, som inte är nybörjarvänliga. För mer förklaringar rörande denna kod jämför med  kod för Lektion 3 och se fler förklaringar i Lektion 4. */

/* Sträng som berättar för JavaScript att vara lite mer tydligt när något är fel */
'use strict';

/* En array som kommer att innehålla böcker hämtade från API */
let bookList = [];

/* DOM-objektet window har en eventtyp - load, som körs när sidan laddats färdigt */
window.addEventListener('load', () => {
  /* I callbackfunktionen hos eventlyssnaren (här en anonym arrow-funktion) görs ett api-anrop via funktionen getAll som finns i api.js. Det som returneras ur getAll är ett promise. När förfrågan är färdig och promiset är färdigt, fångar callbackfunktionen i then() upp en lista av böcker från api:et. Denna lista lagras i variabeln bookList ovan. */
  getAll().then((apiBooks) => (bookList = apiBooks));
});

/* Onödig miss av mig och en sak som jag själv inte visste om JavaScript: 
 
Tydligen behöver man inte hämta upp något element som har ett id med document.getElementById. Det går alltså att nå searchField direkt på dess id-attribut i HTML-koden. Jag visste att det fungerade så med formulär, för de är lite speciella, men detta är nytt för mig och INGET jag rekommenderar. 

Gör hellre 
const searchField = document.getElementById("searchField"); innan ni hade fortsatt. 
 */

/* Koden som följer är en optimerad version från Lektion 3 där denna funktionalitet var uppdelad på flera funktioner. Det är mycket svårare att hänga med i nedanstående kod, men den är mer effektiv och kompakt. Jämför gärna stegen här nedan med koden från lektion 3 som gjorde i stort sett samma sak, men uppdelat på flera funktioner. Håll koll på parenteser och måsvingar - VSCode har bra stöd för detta och markerar parenteser och klamrar som hör ihop. För vidare detaljer se Lektion 4 där detta gås igenom steg för steg 

Övrig hjälp kan finnas i Föreläsning 4 avsnitt om destructuring, array.filter och i Föreläsning 3 avsnitt om arrow-functions. */
searchField.addEventListener(
  'keyup',

  (e) =>
    /* all kommande kod, som inleds med bookList.filter(...) är faktiskt    bara en enda rad - ett enda uttryck, så måsvingar behövs inte här efter pilen! */

    /* I eventhanteraren för keyup-eventet (här en anonym arrow-funktion), tas eventet (e) emot automatiskt */

    /* Sedan anropas renderBooklist direkt i callbackfunktionen 
    renderBookList(
      /* Till renderBookList skickas en färdigfiltrerad array innehållande de böcker som matchade söktermen. Detta uppnås genom att man direkt skickat bookList.filter() till renderbooklist. */
    renderBookList(
      bookList.filter(({ title, author }) => {
        /* I bookList.filter() finns en callbackfunktion som sköter detaljerna hur filtreringen fungerar, dvs. jämför title och author mot söksträngen */
        const searchTerm = e.target.value.toLowerCase();
        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }) //slutparentes för bookList.filter()
    ) //först här är slutparentesen för renderBookList()
); //först här är slutparentesen för metoden addEventListener().

/* Funktion för att skriva ut faktisk HTML utifrån innehåll i array */
function renderBookList(bookList) {
  /* renderBookList tar emot en parameter som här döps till bookList. 
  Notera att detta _inte_ är den bookList som skapas på rad 5, utan en bookList unik för denna funktion. Parametrar som bookList i detta exempel, existerar bara inom måsvingarna { } för sin funktion, dvs. inuti renderBookList. 

  bookList i denna funktion, är den filtrerade lista som skickades in till renderBookList vid anropet inuti callbackfunktionen för addEventListener.
  */

  /* Om ett <ul>-element har skapats tidigare, dvs. någon har fått fram ett sökresultat tidigare, kommer det elementet att finnas i DOM-trädet. Genom att försöka hämta det kan vi senare kontrollera om det redan skapats eller behöver skapas för första gången. */
  const existingElement = document.querySelector('.book-list');

  /* Hämtar förälder-elementet till <ul>-elementet, dvs. det <main>-element som <ul>-elementet ligger i.  */
  const root = document.getElementById('root');

  /* Om existingElement finns, ta bort det från elementet med id root (det element som <ul>-elementet ligger i). 

  Om existingElement är falsy, kommer man aldrig gå vidare till koden på andra sidan om && eftersom båda sidorna om && måste vara truthy (se Föreläsning 2 om truthy falsy och förkortningar av if-satser.

  Nedanstående kod kan översättas till
  if(existingElement != null) {
    root.removeChild(existingElement)
  }
*/
  existingElement && root.removeChild(existingElement);

  /* Vidare kollas om bookList (den som skickades till denna funktion) har en längd större än 0. Har den inte det finns inga böcker i den och det finns ingen anledning att skriva ut listan. Det samma gäller om det inte finns något skrivet i searchField, dvs. något innehåll i value-egenskapen, som innehåller det som står skrivet i fältet. 
  
  detta översätts till 
  if(bookList.length > 0 && searchField.value.length > 0) {
    root.insertAdjacentHTML('beforeend', BookList(bookList));
  }
  */

  bookList.length > 0 &&
    searchField.value &&
    /* Här ska HTML-kod motsvarande en <ul> fylld av <li>-element som vart och ett innehåller information om en bok. 
    Det görs med hjälp av metoden insertAdjacentHTML, som tar två argument. 
    
    Det första är en sträng som beskriver var HTML-koden ska adderas. 

    Andra argumentet i insertAdjacentHTML är ett anrop till funktionen BookList. Funktionen BookList finns i filen Components/BookList.js. Dit skickas den aktuella, filtrerade listan för att skrivas ut i HTML-kod. BookList()-funktionen returnerar färdig HTML-kod som läggs till i <main>-elementet med id "root" genom att skickas till metoden insertAdjacentHTML(). */
    root.insertAdjacentHTML('beforeend', BookList(bookList));
}
