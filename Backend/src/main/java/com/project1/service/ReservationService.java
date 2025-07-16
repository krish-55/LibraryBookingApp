package com.project1.service;

import java.util.List;

import com.project1.entity.Reservation;


public interface ReservationService {

	Reservation bookReservation(Reservation reservation);
	List<Reservation> getAllReservations();
	List<Reservation> getReservationsByUserId(Long userId);
	void deleteReservationsByBookId(Long userId);
}
