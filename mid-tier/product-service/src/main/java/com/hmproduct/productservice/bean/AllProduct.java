package com.hmproduct.productservice.bean;

import java.util.Arrays;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "allproduct")
public class AllProduct {
	@Id
	private String id;
	private String productName;
	private String imageUrl;
	private String price;
	private String[] benefits;
	private String[] ingredients;

	public AllProduct() {
		super();
	}

	public AllProduct(String id, String product_name, String image_url, String price, String[] benefits,
			String[] ingredients) {
		super();
		this.id = id;
		this.productName = product_name;
		this.imageUrl = image_url;
		this.price = price;
		this.benefits = benefits;
		this.ingredients = ingredients;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String[] getBenefits() {
		return benefits;
	}

	public void setBenefits(String[] benefits) {
		this.benefits = benefits;
	}

	public String[] getIngredients() {
		return ingredients;
	}

	public void setIngredients(String[] ingredients) {
		this.ingredients = ingredients;
	}

	@Override
	public String toString() {
		return "AllProduct [id=" + id + ", productName=" + productName + ", imageUrl=" + imageUrl + ", price=" + price
				+ ", benefits=" + Arrays.toString(benefits) + ", ingredients=" + Arrays.toString(ingredients) + "]";
	}


}
