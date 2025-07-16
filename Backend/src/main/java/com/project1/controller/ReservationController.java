package com.project1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project1.entity.Book;
import com.project1.entity.ERole;
import com.project1.entity.Reservation;
import com.project1.entity.User;
import com.project1.model.ReservationRequest;
import com.project1.repository.BookRepository;
import com.project1.repository.UserRepository;
import com.project1.service.EmailService;
import com.project1.service.ReservationService;
import com.project1.service.UserDetailsImpl;

import jakarta.mail.MessagingException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:3000") // Frontend URL
@RestController
public class ReservationController {

	@Autowired
	private ReservationService reservationService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/reservations")
	public ResponseEntity<?> createReservation(@RequestBody ReservationRequest request) throws MessagingException {
	    User user = userRepository.findById(request.getUser_id())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Book book = bookRepository.findById(request.getBook_id())
	            .orElseThrow(() -> new RuntimeException("Book not found"));

	    if (!book.isAvailable()) {
	        return ResponseEntity
	            .badRequest()
	            .body("Book is not available for reservation");
	    }

	    Reservation reservation = new Reservation();
	    reservation.setUser(user);
	    reservation.setBook(book);
	    reservation.setIssueDate(request.getIssue_date());
	    reservation.setReturnDate(request.getReturn_date());
	    reservation.setStatus(request.getStatus());

	    // Mark book as unavailable
	    book.setAvailable(false);
	    bookRepository.save(book);

	    reservationService.bookReservation(reservation);
	    emailService.sendReservationConfirmation(user.getEmail(), reservation.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), reservation.getIssueDate().toString(), reservation.getReturnDate().toString(), reservation.getStatus());

	    return ResponseEntity.ok("Reservation created successfully.");
	}

	@GetMapping("/users/{id}/reservations")
	public ResponseEntity<?> getReservationById(@PathVariable long id)
	{
		List<Reservation> reservation=reservationService.getReservationsByUserId(id);
		if(reservation!=null)
			return ResponseEntity.ok(reservation);
		return ResponseEntity.ok("No reservations found!");
	}
	
	@GetMapping("/admin/reservations")
    public ResponseEntity<?> getAllReservations() {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Check if the user has the admin role
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals(ERole.ROLE_ADMIN.name()));

        if (isAdmin) {
        	List<Reservation> r1=reservationService.getAllReservations();
        	if(r1!=null)
        		return ResponseEntity.ok(r1);
            return ResponseEntity.ok("please provide necessary details of book");
        } else {
            return ResponseEntity.status(403).body("Access Denied");
        }
    }
	
}
