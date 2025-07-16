package com.project1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project1.entity.Reservation;
import com.project1.repository.ReservationRepository;


@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;
	@Override
	public Reservation bookReservation(Reservation reservation) {
		return reservationRepository.save(reservation);
	}

	@Override
	public List<Reservation> getAllReservations() {
		return reservationRepository.findAll();
	}

	@Override
	public List<Reservation> getReservationsByUserId(Long userId) {
		return reservationRepository.findByUserId(userId);
	}

	@Override
	public void deleteReservationsByBookId(Long userId) {
		List<Reservation> bookByReservations=reservationRepository.findByBookId(userId);
		for(Reservation reserve:bookByReservations)
		{
			reservationRepository.delete(reserve);
		}
	}

}
