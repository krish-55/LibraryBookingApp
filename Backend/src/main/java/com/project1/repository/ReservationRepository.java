package com.project1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project1.entity.Reservation;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	// Custom query method to find reservations by user ID
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByBookId(Long userId);
}
