import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
const PaginationTable = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        // "https://lobster-app-ddwng.ondigitalocean.app/product/list",
        "https://jsonplaceholder.typicode.com/todos",
        {
          // headers: {
          //   api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
          // },
        }
      );

      const { data } = response;
      console.log(data);

      if (response?.status===200) {
        setTodos(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
console.log('todos',todos)
  const pageSelectHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(todos.length / 10) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const renderPageButtons = () => {
    const totalPages = Math.ceil(todos.length / 10);
    const maxButtons = 5;

    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = Math.min(startPage + maxButtons - 1, totalPages);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const pageButtons = [];

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          className={`btn ${page === i ? "btn-danger" : "btn-info"} mr-3 me-2`}
          key={i}
          onClick={() => pageSelectHandler(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="container-fluid mt-5 mb-3">

 

      {todos.length > 0 && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Status</th>
          
            </tr>
          </thead>
          <tbody>
            {todos
              .slice((page - 1) * 10, page * 10)
              .map((product, index) => (
                <tr key={product.id}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.completed?'Completed':'Not Completed'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
           {todos.length > 0 && (
        <div className="d-flex justify-content-end">
          <button
            className={` mr-3  btn  ${
              page > 1 ? "" : "btn-disabled"
            }`}
            onClick={() => setPage(1)}
          >
            <FaAngleDoubleLeft/>
          </button>
          <button
            className={` mr-3 btn  ${
              page > 1 ? "" : "btn-disabled"
            }`}
            onClick={() => pageSelectHandler(page - 1)}
          >
            <MdArrowBackIos/>
          </button>
          {renderPageButtons()}
          <button
            className={` ml-3  btn   ${
              page < Math.ceil(todos.length / 10) ? "" : "opacity-0"
            }`}
            onClick={() => pageSelectHandler(page + 1)}
          >
            <IoIosArrowForward/>
          </button>
          <button
            className={` btn  ml-5 ${
              page < Math.ceil(todos.length / 10) ? "" : "opacity-0"
            }`}
          onClick={() => setPage(Math.ceil(todos.length / 10))}
          >
            <FaAngleDoubleRight/>
          </button>
        </div>
      )}
    </div>
  );
};

export default  PaginationTable;