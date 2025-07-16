package com.project1.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.project1.entity.Book;



public interface BookRepository extends JpaRepository<Book, Long> {

}
