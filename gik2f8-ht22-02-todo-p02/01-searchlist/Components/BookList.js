/* Funktion för att rendera en lista av böcker. Funktionen är skapad som ett function expression. */

const BookList = (bookList) => {
  /* Även här heter parametern bookList (litet b) och även här existerar bara denna specifika bookList inom måsvingarna för funktionen BookList (stort B) */

  /* En variabel för att hålla html-kod skapas. Den får ett antal klasser från Tailwind */
  let html = `<ul class="book-list rounded-md border-2 border-blue-400 bg-white w-full mx-auto">`;
  /* Templatesträngen stängs tillfälligt för nu befinner vi oss inuti <ul>-elementet och där ska varje rad - varje bok - skrivas ut i <li>-element */

  /* Detta görs genom att den inskickade bookList-arrayen */
  for (let i = 0; i < bookList.length; i++) {
    /* För varje varv i loopen - dvs. för varje bok i bookList anropas en funktion för att successivt bygga på html-strängen. += betyder "ta befintligt innehåll i strängen och bygg på med det efter =" */

    /* HTML-strängen byggs på med det som returneras från BookListItem. BookListItem är precis som denna funktion, en funktion som returnerar en liten bit HTML, i detta fall ett <li>-element, innehållande data från det  objekt som skickas in. Här skickas ett specifikt bok-objekt in så att dess innehåll kan skrivas ut i ett <li>-element i funktionen BookListItem. */
    html += BookListItem(bookList[i]);
  }
  /* När alla <li>-element lagts till i HTML-strängen läggs en sista del till html-strängen - sluttaggen för <ul>-elementet. */
  html += `</ul>`;

  /* Sedan returneras den färdiga html-strängen. html-strängen innehåller nu ett komplett <ul>-element, fyllt med <li> element för varje bok som fanns i arrayen bookList (litet b) */
  return html;
};
