import React, { useEffect, useState } from "react";

const MyBookShelf = () => {
  const [shelfItems, setShelfItems] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("myBookShelf"));
    if (data) {
      setShelfItems(data);
    }
    console.log(data); // Check the retrieved data from localStorage
  }, []);

  return (
    <div>
      <h3>My Book Shelf</h3>
      <div className="search-results-container">
      {shelfItems && shelfItems.length > 0 ? (
        shelfItems.map((book, index) => (
          <div key={index} className="book-container">
            <div className="bookdetails">
              <p>
                {" "}
                <b>Book Title:</b>
                {book.title}
              </p>
              <p>Edition Count:{book.edition_count}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No books in the bookshelf.</p>
      )}
      </div>

     
    </div>
  );
};

export default MyBookShelf;
