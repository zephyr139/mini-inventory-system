package com.training.backend.dtos;

import jakarta.validation.constraints.*;
import org.jspecify.annotations.Nullable;

import java.math.BigDecimal;

public record ProductRequestDTO(

        @NotBlank(message = "Product name must not be blank")
        String name,

        @NotNull(message = "Quantity must not be null")
        @Min(value = 0, message = "Quantity cannot be negative")
        Integer quantity,

        @NotNull(message = "Price must not be null")
        @DecimalMin(value = "0.0", inclusive = false,
                message = "Price must be greater than 0")
        BigDecimal price,

        @Nullable
        @Size(max = 250)
        String description

) {
}
