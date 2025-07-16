package com.project1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.entity.Book;
import com.project1.entity.ERole;
import com.project1.service.BookService;
import com.project1.service.UserDetailsImpl;



@CrossOrigin(origins = "http://localhost:3000") // Frontend URL
@RestController
@RequestMapping("/books")
public class BookController {

	@Autowired
	private BookService bookService;
	
//	@Autowired
//	private ReservationService reservationService;
	@GetMapping("/")
	public ResponseEntity<?> getAllBooks()
	{
		List<Book> book=bookService.getAllBook();
		if(book!=null)
			return ResponseEntity.ok(book);
		return ResponseEntity.ok("Currently Books are not available");
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getBookById(@PathVariable long id)
	{
		Book book=bookService.getBookById(id);
		if(book!=null)
			return ResponseEntity.ok(book);
		return ResponseEntity.ok("Book is not found!");
	}
	@PostMapping("/")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Check if the user has the admin role
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals(ERole.ROLE_ADMIN.name()));

        if (isAdmin) {
        	Book b1=bookService.addBook(book);
        	if(b1!=null)
        		return ResponseEntity.ok("Book added successfully");
            return ResponseEntity.ok("please provide necessary details of book");
        } else {
            return ResponseEntity.status(403).body("Access Denied");
        }
    }
	@PutMapping("/{id}")
    public ResponseEntity<?> updateBookById(@PathVariable long id,@RequestBody Book book) {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Check if the user has the admin role
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals(ERole.ROLE_ADMIN.name()));

        if (isAdmin) {
        	Book b1=bookService.getBookById(id);
        	if(b1!=null) {
        		b1.setTitle(book.getTitle());
        		b1.setAuthor(book.getAuthor());
        		b1.setIsbn(book.getIsbn());
        		b1.setAvailable(book.isAvailable());
        		bookService.updateBook(b1);
        		return ResponseEntity.ok("Book updated successfully");
               
        	}
            return ResponseEntity.ok("please provide necessary details of book");
        } else {
            return ResponseEntity.status(403).body("Access Denied");
        }
    }
	@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBookById(@PathVariable long id) {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Check if the user has the admin role
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals(ERole.ROLE_ADMIN.name()));

        if (isAdmin) {
        	Book b1=bookService.getBookById(id);
        	if(b1!=null) {
//        		reservationService.deleteReservationsByBookId(id);
        		bookService.deleteBook(b1);
        		return ResponseEntity.ok("Book deleted successfully");
               
        	}
            return ResponseEntity.ok("please provide necessary details of book");
        } else {
            return ResponseEntity.status(403).body("Access Denied");
        }
    }
}
