package com.hmproduct.registerservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import com.hmproduct.registerservice.bean.User;


@EnableMongoRepositories
@Repository
public interface UserRepository extends MongoRepository<User,String> {

}
