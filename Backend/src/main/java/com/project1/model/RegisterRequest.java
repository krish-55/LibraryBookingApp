package com.project1.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

	 @NotBlank(message = "Username is required")
	  @Size(min = 3, max = 20,message="The username must be between 3 and 20 character long.")
	  private String username;

	  @NotBlank(message = "Email is required")
	  @Size(max = 100,message="The email must be below 100 characters long.")
	  @Email(message = "Invalid email")
	  private String email;


	  @NotBlank(message = "Password is required")
	  @Size(min = 6, max = 40,message = "The value must be between 6 and 40 characters long.")
	  private String password;
	  
	  public String getUsername() {
		    return username;
		  }

		  public void setUsername(String username) {
		    this.username = username;
		  }

		  public String getEmail() {
		    return email;
		  }

		  public void setEmail(String email) {
		    this.email = email;
		  }

		  public String getPassword() {
		    return password;
		  }

		  public void setPassword(String password) {
		    this.password = password;
		  }

		  
}
