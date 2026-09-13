package com.training.backend.services;

import com.training.backend.dtos.ProductRequestDTO;
import com.training.backend.model.Product;
import com.training.backend.model.ProductStatus;
import com.training.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    @Autowired
    ProductRepository repository;

    public List<Product> listProducts() {
        return repository.findAll();

    }

    public Product createProduct(ProductRequestDTO request) {
        Product product = new Product();

        product.setName(request.name());
        product.setQuantity(request.quantity());
        product.setPrice(request.price().setScale(2, RoundingMode.HALF_UP));

        ProductStatus status = determineStatus(product.getQuantity());

        product.setDescription(request.description());
        product.setStatus(status);

        return product;
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public Product updateProductPartially(Long id,Map<String,Object> updates) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("No product with id: " + id + " found"));

        updates.forEach((key,value) -> {
            switch (key) {
                case "name":
                    product.setName((String) value);
                    product.setUpdatedAt(LocalDateTime.now());
                    break;
                case "quantity":
                    Integer quantity = ((Number) value).intValue();
                    if (quantity >= 0) {
                        product.setQuantity(quantity);
                        product.setStatus(determineStatus(product.getQuantity()));
                        product.setUpdatedAt(LocalDateTime.now());
                        break;
                    } else {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"wrong value for quantity: " + value);
                    }
                case "price":
                    Number number = (Number) value;
                    if (number.doubleValue() >= 0) {
                        product.setUpdatedAt(LocalDateTime.now());
                        product.setPrice(BigDecimal.valueOf(number.doubleValue()).setScale(2, RoundingMode.HALF_UP));
                        break;
                    } else {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong value for price");
                    }
                case "description":
                    if (value.toString().length() < 250) {
                        product.setDescription((String) value);
                        product.setUpdatedAt(LocalDateTime.now());
                    } else {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Your Description is too long");
                    }
            }
        });

        return saveProduct(product);
    }

    public String deleteProduct(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("No product with id: " + id + " found"));

        repository.delete(product);

        return "Product with id " + id + " was successfully deleted";
    }

    private ProductStatus determineStatus(Integer productQuantity) {
        if (productQuantity > 5) {
            return ProductStatus.IN_STOCK;
        } else if (productQuantity != 0) {
            return ProductStatus.LOW_STOCK;
        } else {
            return ProductStatus.OUT_OF_STOCK; // == 0
        }
    }
}
