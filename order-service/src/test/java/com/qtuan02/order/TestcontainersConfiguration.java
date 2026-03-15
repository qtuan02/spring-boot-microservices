package com.qtuan02.order;

import dasniko.testcontainers.keycloak.KeycloakContainer;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.DynamicPropertyRegistrar;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {
    static String KEYCLOAK_IMAGE = "quay.io/keycloak/keycloak:26.3.0";
    static String realmImportFile = "/ecommerce-realm.json";
    static String realmName = "ecommerce";

    @Bean
    @ServiceConnection
    PostgreSQLContainer<?> postgresContainer() {
        return new PostgreSQLContainer<>(DockerImageName.parse("postgres:18-alpine"));
    }

    @Bean
    KeycloakContainer keycloak() {
        return new KeycloakContainer(KEYCLOAK_IMAGE).withRealmImportFile(realmImportFile);
    }

    @Bean
    DynamicPropertyRegistrar dynamicPropertyRegistrar(KeycloakContainer keycloak) {
        return (registry) -> {
            registry.add(
                    "spring.security.oauth2.resourceserver.jwt.issuer-uri",
                    () -> keycloak.getAuthServerUrl() + "/realms/" + realmName);
        };
    }
}
