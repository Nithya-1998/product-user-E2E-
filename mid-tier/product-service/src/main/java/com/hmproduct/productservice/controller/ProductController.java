package com.hmproduct.productservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmproduct.productservice.bean.AllProduct;
import com.hmproduct.productservice.service.ProductService;

@RestController
@RequestMapping("/allproducts")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping
	public List<AllProduct> getAllProducts() {
		return productService.getAllProducts();
	}
	@GetMapping("/{id}")
	public AllProduct getProduct(@PathVariable String id) {
		return productService.getProduct(id);
	}
	@PostMapping
	public void insertProduct(@RequestBody AllProduct product) {
		productService.insertProduct(product);
	}
	@PutMapping
	public void updateProduct(@RequestBody AllProduct product) {
		productService.updateProduct(product);
	}
	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable String id) {
		productService.deleteProduct(id);
	}
}
