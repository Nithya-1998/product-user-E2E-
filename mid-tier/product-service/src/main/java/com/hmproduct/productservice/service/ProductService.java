package com.hmproduct.productservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmproduct.productservice.bean.AllProduct;
import com.hmproduct.productservice.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Transactional
	public List<AllProduct> getAllProducts() {
		System.out.println("AllProducts " + productRepository.findAll());
		return productRepository.findAll();
	}

	@Transactional
	public AllProduct getProduct(String id) {
		System.out.println("Product " + productRepository.findById(id).get());
		return productRepository.findById(id).get();
	}

	@Transactional
	public void updateProduct(AllProduct product) {
		System.out.println("Update product " + product);
		productRepository.save(product);
	}

	@Transactional
	public void insertProduct(AllProduct product) {
		System.out.println("Insert product " + product);
		productRepository.save(product);
	}

	@Transactional
	public void deleteProduct(String id) {
		System.out.println("Product Id " + id);
		productRepository.deleteById(id);
	}

	@Transactional
	public void deleteSelectedProduct(String[] ids) {
		for (String id : ids) {
			System.out.println("Product Id "+id);
			productRepository.deleteById(id);
		}
	}
}