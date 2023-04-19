package com.sample.doctorsdemo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "app")
@ConstructorBinding
public class ApplicationProperties {
    private final FrontendProperties frontend;

    public ApplicationProperties(FrontendProperties frontend) {
        this.frontend = frontend != null ? frontend : new FrontendProperties("");
    }

    public FrontendProperties getFrontend() {
        return frontend;
    }

    public static class FrontendProperties {
        private final String baseUrl;

        public FrontendProperties(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getBaseUrl() {
            return baseUrl;
        }
    }
}
