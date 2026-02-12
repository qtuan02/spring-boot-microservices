package com.qtuan02.inventory;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "inventory")
public record ApplicationProperties(String cancelledOrdersQueue) {}
