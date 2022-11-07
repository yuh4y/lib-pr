import Header from "../partner/header";
import { useState,useEffect } from "react";
import axios from "axios";
import './addBook.css'

export default function AddBook(){
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [dateRelease,setDateRealse] = useState("");
    const [totalPage,setTotalPage] = useState("");
    const [typeBook,setTypeBook] = useState("");
    const [files,setFiles] = useState("");
    function submitForm(e){
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append("title",title);
        bodyFormData.append("author",author);
        bodyFormData.append("typeBook",typeBook);
        bodyFormData.append("description",description);
        bodyFormData.append("dateRelease", dateRelease);
        bodyFormData.append("totalPage",totalPage);
        bodyFormData.append("typeBook",typeBook);
        for(let i = 0;i< files.length;i++){
            bodyFormData.append("files",files[i]);
        }

        console.log(bodyFormData)
        axios.post("http://localhost:8080/api/book/insert",bodyFormData,
            {
                headers: { 
                "Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJodXkiLCJpYXQiOjE2Njc4MTU2NDYsImV4cCI6MTY2NzkwMjA0Nn0.HWTzAbuN3TnQzgJXyBxNm-RS_yDzmhFbSs5A33O6JkVWhFQVeTZm1Flf8GBzJUtIaVYE5KELBKpPu0CoVb4zEQ",
                "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log(response)
            window.location.href = "http://localhost:3000/"
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div class="wrapper">
                <div class="book-container">
                    <div class="header">
                        <h3>Thêm sách mới</h3>
                    </div>

                    <form class="body-page row">
                        <div class="col-6">
                            <div>
                                <div class="form-data">
                                    <label for="exampleInputEmail1"></label>
                                    <input onChange={(e)=>setTitle(e.target.value)} type="text" class="input-info" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Tiêu đề" />
                                    <span></span>
                                </div>

                                <div class="form-data">
                                    <label for="exampleInputPassword1"></label>
                                    <input type="text" class="input-info" id="exampleInputPassword1" placeholder="Tác giả" onChange={(e)=>setAuthor(e.target.value)}/>
                                    <span></span>
                                </div>

                                <div class="form-data">
                                    <label for="exampleInputPassword1"></label>
                                    <input type="text" class="input-info" id="exampleInputPassword1" placeholder="Thể loại" onChange={(e)=>setTypeBook(e.target.value)}/>
                                    <span></span>
                                </div>

                                <div class="form-data">
                                    <label for="exampleInputPassword1"></label>
                                    <input type="text" class="input-info" id="exampleInputPassword1" placeholder="Số trang" onChange={(e)=>setTotalPage(e.target.value)}/>
                                    <span></span>
                                </div>

                                <div class="form-data">
                                    <label for="exampleInputPassword1"></label>
                                    <input type="text" class="input-info" id="exampleInputPassword1" placeholder="Ngày phát hành (dd/MM/yyyy)" onChange={(e)=>setDateRealse(e.target.value)}/>
                                    <span></span>
                                </div>

                                <div class="mb-3">
                                    <label for="validationTextarea"></label>
                                    <textarea class="book-desc is-invalid"  id="validationTextarea" placeholder="Mô tả" rows={4} required onChange={(e)=>setDescription(e.target.value)}></textarea>
                                </div>
                                
                            </div>
                        </div>
                        <div class="img-field col-6">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="input" multiple onChange={(e)=>setFiles(e.target.files)} required accept="image/*"/>
                                <label class="custom-file-label" for="input">Choose file...</label>
                                <div class="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                        </div>
                        <div className="btn-save-wrap">
                            <button type="submit" class="btn-save" onClick={submitForm}>Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}