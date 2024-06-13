import React, { useState, useEffect } from "react";
import { useDebounce } from "../customHooks/UseDebounce";
import { Link } from "react-router-dom";

const BookSearchPage = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const debouncedTerm = useDebounce(term, 500); // Adjust the delay as needed
  const [BookShelf, setBookShelf] = useState(() => {
    // Initialize state from localStorage
    const savedBooks = localStorage.getItem('myBookShelf');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });


  useEffect(() => {
    if (debouncedTerm) {
      fetch(
        `https://openlibrary.org/search.json?q=${debouncedTerm}&limit=10&page=1`
      )
        .then((response) => response.json())
        .then((data) => setResults(data.docs || []))
        .catch((error) => console.log("Error:", error));
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  const changeHandler = (e) => {
    setTerm(e.target.value);
  };
  const clickHandler = ({ title, edition_count }) => {
    setBookShelf(prevBookshelf => {
      const newBookshelf = [{ title, edition_count }, ...prevBookshelf];
      localStorage.setItem("myBookShelf", JSON.stringify(newBookshelf));
      return newBookshelf;
    });
  };

  return (
    <div>
      <div className="header-container">
        <div className="booksearch">
          <h4>Search By Book Name</h4>
          <input type="text" value={term} onChange={changeHandler} />
        </div>
        <Link to={"/myshelf"}><button>My BookShelf</button></Link>
      </div>
      <div className="search-results-container">
        {results.map((book,index) => (
          <div key={index} className="book-container">
            {" "}
            <div className="bookdetails">
              <p>
                <b>Book Title:</b>
                {book.title}
              </p>
              <p>
                <b>Edition Count:</b>
                {book.edition_count}
              </p>
            </div>
            <button className="add-shelf-btn" onClick={()=>clickHandler(book)}>
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;
