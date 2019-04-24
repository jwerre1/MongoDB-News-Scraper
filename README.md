# MongoDB-News-Scraper
An NPR news website scraper utilizing MongoDB, Mongoose, and Cheerio. 

---

## Functionality

Upon visiting the [website](https://hidden-harbor-40562.herokuapp.com/), the user sees a navbar links to the two pages within the website ('Home' and 'Saved Articles), as well as two buttons. The 'Scrape New Articles' scrapes the articles from NPR's website's main page; the 'Clear Scraped Articles' removes all of the scraped articles.

When no scraped articles are present, a notice appears on the page. 

![main-page](/public/images/imgOne.jpeg)

Clicking on an article generates a drop down with a summary and a 'Save Article' button. Clicking on the summary will open the appropriate NPR webpage. Clicking the 'Save Article' button appropriately saves the article and removes it from the scraped articles.

![click-on-scraped](/public/images/imgTwo.jpeg)

Selecting the 'Saved Articles' link in the navbar brings you to a page showing all of the saved articles. Clicking on a given article generates a drop down with the summary and two buttons - 'Add Note' and 'Delete From Saved.'

![saved-articles](/public/images/imgThree.jpeg)

'Delete From Saved' deletes the article from the saved database. Clicking 'Add Note' generates a modal where you can see any notes that have been added previously, delete old notes (by clicking on the red 'x' button, if present), or add a new note.

To add a note, simply type the note where prompted and click 'SAVE NOTE' within the modal. 

![add-a-note](/public/images/imgFour.jpeg)

The user can also clear all saved notes by clicking on the 'CLEAR SAVED NOTES' button at the top right of the page. Similar to the home page, when no saved articles are present a message appears on the page. 

## Built With

* [npm Cheerio](https://www.npmjs.com/package/cheerio) - a scraping tool the provides an API for traversing the resulting data structure.
* [Mongoose](https://mongoosejs.com/) - a MongoDB object modeling for node.js.
* [npm Express](https://www.npmjs.com/package/express) - web framework for Node.
* [npm Express Handlebars](https://www.npmjs.com/package/express-handlebars) - a Handlebars view engine for Express.
* [npm Axios](https://www.npmjs.com/package/axios) - a promise based HTTP client for the browser and node.js.
* [Materialize](https://materializecss.com/) - a CSS framework.

## Authors
* **Jordan Werre**
