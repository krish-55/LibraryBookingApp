package com.project1.model;


import lombok.Data;

import java.time.LocalDate;

import com.project1.entity.ReservationStatus;

import jakarta.validation.constraints.NotNull;
@Data
public class ReservationRequest {
  private Long user_id;
  private Long book_id;
  private LocalDate issue_date;
  private LocalDate return_date;
  private ReservationStatus status;

  // Getters and Setters
}
