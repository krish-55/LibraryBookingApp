package com.project1.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.project1.entity.ReservationStatus;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	 @Autowired
	    private JavaMailSender mailSender;

	    public void sendRegisterConfirmation(String to) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setFrom("Library Bookin System <librarybookingsystem@gmail.com>");
	        message.setTo(to);
	        message.setSubject("Registration successfull");
	        message.setText("Thank you for registration Library Bookin System\n Choose book to read in the library room");
	        mailSender.send(message);
	    }
	    public void sendReservationConfirmation(String to, long reservationId, String isbn, String title, String author, String issueDate, String returnDate, ReservationStatus reservationStatus) throws MessagingException {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);

	        helper.setFrom("Library Booking System <librarybookingsystem@gmail.com>");
	        helper.setTo(to);
	        helper.setSubject("Reservation Successful");

	        String htmlContent = String.format(
	            "<h1 style='color:blue;'>Reservation Confirmation</h1>" +
	            "<p>Thank you for registering with the Library Booking System!</p>" +
	            "<table border='1' style='border-collapse: collapse; width: 100%%;'>" +
	            "<tr><th>Reservation ID</th><td>%s</td></tr>" +
	            "<tr><th>ISBN</th><td>%s</td></tr>" +
	            "<tr><th>Title</th><td>%s</td></tr>" +
	            "<tr><th>Author</th><td>%s</td></tr>" +
	            "<tr><th>Issue Date</th><td>%s</td></tr>" +
	            "<tr><th>Return Date</th><td>%s</td></tr>" +
	            "<tr><th>Status</th><td>%s</td></tr>" +
	            "</table>" +
	            "<p style='color:green;'>Enjoy your reading!</p>",
	            reservationId, isbn, title, author, issueDate, returnDate, reservationStatus
	        );

	        helper.setText(htmlContent, true);
	        mailSender.send(message);
	    }

}