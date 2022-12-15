/* Fil som ansvarar för att göra api-anrop mot en server.  */

/* Url dit anropet ska göras.  */
const url = 'https://gik2f8-labs.herokuapp.com/books';

/* asynkron funktion vid namn getAll. Anropas i eventlyssnaren för load-eventet hos window. */
async function getAll() {
  /* Data hämtas från ett api på adressen lagrad i variabeln url.  */
  const result = await fetch(url)
    /* Innan det kan skickas vidare behöver det översättas till JSON, för att kunna behandlas som JavaScript. Man kan göra denna översättning i flera steg också för vidare bearbetning.  */
    .then((result) => result.json())
    /* Om  något går fel i anropet fångas e, som motsvarar ett error-objekt.  */
    .catch((e) => e);

  /* Slutligen returneras result, som är ett promise.  */
  return result;
}
