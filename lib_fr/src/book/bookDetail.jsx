import Header from "../partner/header";
import { useState,useEffect } from "react";
import axios from "axios";
import './bookDetail.css'
function linkImg(img) {
  let url = "http://localhost:8080/api/files/"+img;
  return url;
}
export default function BookDetail(){
    const [book,setBook] = useState({});
    const [imgs,setImgs] = useState([])
    function getSecondPart(str) {
      return str.split('/')[2];
    }
    const pathID = getSecondPart(window.location.pathname);

    useEffect( ()=>{
        axios.get('http://localhost:8080/api/book/'+pathID)
        .then(data => 
          {
            setBook(data.data.data);
            setImgs(data.data.data.imageFeatureBooks)
          })
        .then(data => console.log(data.data.data))
        .catch(err => console.log(err))
    },[]);
    return (
      <div>
        {/* <Header></Header> */}
        <div class="container mt-5">
          <h1 className="row mt-5 headerr">
              Detail book
          </h1>
            <div class="container row">
              <div class="card col-6">
              <div class="container-fliud">
                <div class="wrapper row">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    {
                      imgs.map(img => {
                        return (
                          <div class="carousel-item active img-cus" key={img.url}>
                            <img  class="d-block active" style={{objectFit:"cover"}} src={linkImg(img.url)} alt="First slide"/>
                          </div>
                        )
                      })
                    }
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
                
                </div>
              </div>
              </div>
              <div className="row col-6">
                <div class="book-info mt-3 ml-3 col-6">
                  <h4 class="font-weight-bold text-uppercase">Title: {book.title}</h4>
                  <p>Author: {book.author} </p>
                  <p>Date release:{book.dateRelease}</p>
                  <p>Category: {book.typeBook}</p>
                  <p>Description: {book.description}</p>
                  <p>Total page: {book.totalPage}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}