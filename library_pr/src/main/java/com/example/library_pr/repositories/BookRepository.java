package com.example.library_pr.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library_pr.models.Book;


@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
	List<Book> findByTitle(String bookTitle);
}
