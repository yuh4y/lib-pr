import { useState,useEffect } from "react";
import Header from "../partner/header";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './listBook.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function BookList({itemsPerPage}) {
    const [books,setBooks] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [idDelete,setIdDelete] = useState(null)
    function linkImg(post) {
        let url = "http://localhost:8080/api/files/"+post;
        return url;
    }
    function IdDelete(id){
        setIdDelete(id);
    }
    function deleteBook(){
        if(idDelete != null){
            axios({
                method: 'delete',
                url:'http://localhost:8080/api/book/'+idDelete, 
                data:null,
                headers: { 
                    "Authorization":"Bearer "+ localStorage.getItem("token"),
            }})
            .then(response => {
                console.log(response)
                window.location.href = "http://localhost:3000/"
            })
            .catch(err => console.log(err))
            setIdDelete(null)
        }
    }
    function Items({ currentItems }) {
        return (
            <table class="table table-bordered">
            <thead className="thead-cus thead-dark">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Index</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Type of book</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date release</th>
                    <th scope="col">Total page</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                { currentItems &&
                currentItems.map(book => {
                    return (
                    <tr key={book.id}>
                    <th className="th-cus" scope="col-2">
                        <img  src={
                            linkImg(book.imageFeatureBooks[0].url)
                        } style={{width:"80px", objectFit:"cover"}} alt="" />    
                    </th>
                    <th scope="row">
                        <Link to={`book/${book.id}`} style={{textDecoration:"none",color:"black",fontWeight:"normal"}}>{book.id}</Link>
                    </th>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.typeBook}</td>
                    <td>{book.description}</td>
                    <th className="th-cus" scope="col">{book.dateRelease}</th>
                    <th className="th-cus" scope="col">{book.totalPage}</th>
                    <th scope="col" className="action">
                        <Link to={`update-book/${book.id
                        }`} className="btn-view btn-cus">
                            Edit
                        </Link>
                        <button onClick={()=> IdDelete(book.id)} className="btn-delete btn-cus" data-toggle="modal" data-target={`#exampleModal${book.id}`}>
                            Delete
                        </button>
                        <div class="modal fade" id={`exampleModal${book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Delete confirm</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Do you want delete book?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button"  onClick={()=>deleteBook()} class="btn btn-primary">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </th>
                    </tr>)
                })
            }
            </tbody>
        </table>
        );
      }
    useEffect( ()=>{
        axios.get('http://localhost:8080/api/books')
        .then(data => {
            setBooks(data.data.reverse())
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(data.data.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(data.data.length / itemsPerPage));
        })
        .catch(err => console.log(err));
    },[itemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
    return (
        <div>
            <div className="container mt-5">
                <div class="d-flex justify-content-between">
                    <h2>Danh sách</h2>
                    <div className="btn-add-wrap">
                        <Link to="/insert-book" className="btn-add">
                            Add book
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <Items currentItems={currentItems} />
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}