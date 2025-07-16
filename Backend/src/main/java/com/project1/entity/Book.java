package com.project1.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "books", 
uniqueConstraints = { 
  @UniqueConstraint(columnNames = "title"),
  @UniqueConstraint(columnNames = "isbn") 
})
@Data
public class Book {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Title is required")
  private String title;
  @NotBlank(message = "Author is required")
  private String author;
  @NotBlank(message = "isbn is required")
  private String isbn;
  @NotNull
  private boolean available;

  public Book() {
  }

  public Book(String title, String author, String isbn, boolean available) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.available = available;
  }

}
