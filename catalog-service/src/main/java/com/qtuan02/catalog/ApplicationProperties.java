package com.qtuan02.catalog;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "catalog")
public record ApplicationProperties(String inventoryServiceUrl) {}
