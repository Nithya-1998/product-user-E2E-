package com.hmproduct.productservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import com.hmproduct.productservice.bean.AllProduct;

@Repository
@EnableMongoRepositories
public interface ProductRepository extends MongoRepository<AllProduct, String> {

}
