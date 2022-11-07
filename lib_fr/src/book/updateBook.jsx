import Header from "../partner/header";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './addBook.css'


export default function UpdateBook(props){
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [dateRelease,setDateRealse] = useState("");
    const [totalPage,setTotalPage] = useState("");
    const [typeBook,setTypeBook] = useState("");
    const [files,setFiles] = useState("");
    const [urls,setUrls] = useState([]);
    const [book,setBook] = useState({});
    let { id } = useParams();
    useEffect(()=>{
        axios.get('http://localhost:8080/api/book/'+id)
        .then(data => 
          {
            setBook(data.data.data);
            let temp = data.data.data;
            setTitle(temp.title)
            setAuthor(temp.author)
            setTotalPage(temp.totalPage)
            setDescription(temp.description)
            setDateRealse(temp.dateRelease)
            setTypeBook(temp.typeBook)
          })
        .catch(err => console.log(err))
    },[]);
    function submitForm(e){
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append("title",title);
        bodyFormData.append("author",author);
        bodyFormData.append("description",description);
        bodyFormData.append("dateRelease", dateRelease);
        bodyFormData.append("totalPage",totalPage);
        bodyFormData.append("typeBook",typeBook);
        if(files != null){
            for(let i = 0;i< files.length;i++){
                bodyFormData.append("files",files[i]);
            }
        }
        console.log(title)
        axios({
            method: 'put',
            url:'http://localhost:8080/api/book/'+id, 
            data: bodyFormData,
            headers: { 
                "Authorization":"Bearer "+localStorage.getItem("token"),
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
            <div className="wrapper">
                {/* <Header></Header> */}
                <div className="book-container">
                    <div className="header">
                        <h3>Cập nhập thông tin sách</h3>
                    </div>
                    <form className="body-page row">
                        <div className="col-6">
                            <div>
                                <div className="form-data">
                                    <label for="title"></label>
                                    <input value={title} onChange={(e)=>setTitle(e.target.value)}  type="text" className="input-info" id="title" aria-describedby="emailHelp" placeholder="Tiêu đề" />
                                    <span></span>
                                </div>

                                <div className="form-data">
                                    <label for="author"></label>
                                    <input type="text" className="input-info" value={author} onChange={(e)=>setAuthor(e.target.value)} id="author" placeholder="Tác giả" />
                                    <span></span>
                                </div>

                                <div className="form-data">
                                    <label for="type"></label>
                                    <input type="text" value={typeBook} onChange={(e)=>setTypeBook(e.target.value)} className="input-info" id="type" placeholder="Thể loại" />
                                    <span></span>
                                </div>

                                <div className="form-data">
                                    <label for="total"></label>
                                    <input type="text" value={totalPage} onChange={(e)=>setTotalPage(e.target.value)} className="input-info" id="total" placeholder="Số trang" />
                                    <span></span>
                                </div>

                                <div className="form-data">
                                    <label for="date"></label>
                                    <input type="text" value={dateRelease} onChange={(e)=>setDateRealse(e.target.value)} className="input-info" id="date" placeholder="Ngày phát hành" />
                                    <span></span>
                                </div>
                            
                                <div className="mb-3">
                                    <label for="validationTextarea"></label>
                                    <textarea className="book-desc is-invalid" value={description} onChange={(e)=>setDescription(e.target.value)}  id="validationTextarea" placeholder="Mô tả" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="img-field col-6">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="validatedCustomFile" multiple onChange={(e)=>setFiles(e.target.files)} required/>
                                <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                        </div>
                        <div className="btn-save-wrap">
                            <button type="submit" className="btn-save" onClick={submitForm}>Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}