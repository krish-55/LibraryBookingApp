package com.project1.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {

	  @NotBlank(message = "Username is required")
	  @Size(min = 3, max = 20,message="The username must be between 3 and 20 character long.")
	  private String username;

	  @NotBlank(message = "Password is required")
	  @Size(min = 6, max = 40,message = "The value must be between 6 and 40 characters long.")
	  private String password;

}
