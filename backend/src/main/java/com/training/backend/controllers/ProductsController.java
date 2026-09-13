package com.training.backend.controllers;

import com.training.backend.dtos.ProductRequestDTO;
import com.training.backend.model.Product;
import com.training.backend.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/products")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
})
public class ProductsController {

    @Autowired
    private ProductService service;

    @GetMapping
    public ResponseEntity<List<Product>> listProducts() {
        List<Product> productList = service.listProducts();
        return new ResponseEntity<>( productList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@Valid @RequestBody ProductRequestDTO request) {
        Product created = service.createProduct(request);
        Product saved = service.saveProduct(created);

        return new ResponseEntity<>(saved,HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Product updated = service.updateProductPartially(id,updates);

        return new ResponseEntity<>(updated,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteProduct(id), HttpStatus.OK);
    }
}
