package com.project1.service;

import java.util.List;

import com.project1.entity.Book;


public interface BookService {

	List<Book> getAllBook();
	Book getBookById(long id);
	Book addBook(Book book);
	Book updateBook(Book book);
	void deleteBook(Book book);
}
