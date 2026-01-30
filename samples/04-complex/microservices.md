# Microservices Architecture

15+ interconnected services showing layered architecture and communication patterns.

## Use Case: Enterprise Microservices Platform

This diagram visualizes a complex microservices architecture with 15+ interconnected services across multiple layers. It demonstrates real-world service dependencies, communication patterns, and data flow in a modern distributed system.

### Key Features
- Layered architecture (API Gateway → Services → Data)
- Service grouping by business domain
- Bidirectional communication
- Multiple relation types (sync/async)
- External integrations
- 11+ core services plus 4 supporting services

### Layout Strategies Demonstrated
- **Layered Architecture**: Clear separation between API Gateway, Core Services, and Data Layer
- **Service Grouping**: Related services grouped by business domain
- **Bidirectional Communication**: Services calling each other
- **Multiple Relation Types**: Different arrow styles for sync/async
- **External Integration**: Third-party services distinguished visually

## Diagram

```mermaid
graph TB
    Client["👥 Clients<br/>(Web, Mobile, Desktop)"]

    subgraph Gateway["API Gateway Layer"]
        LB["⚙️ Load Balancer"]
        Gateway_Service["🚪 API Gateway<br/>(Auth & Routing)"]
        RateLimit["🛡️ Rate Limiter"]
        Cache["⚡ Cache<br/>(Redis)"]
    end

    subgraph Core["Core Services"]
        AuthSvc["🔐 Auth Service<br/>(OAuth, JWT)"]
        UserSvc["👤 User Service<br/>(Profiles)"]
        ProductSvc["📦 Product Service<br/>(Catalog)"]
        OrderSvc["🛒 Order Service<br/>(Transactions)"]
        PaymentSvc["💳 Payment Service<br/>(Billing)"]
        ShippingSvc["🚚 Shipping Service<br/>(Logistics)"]
    end

    subgraph Support["Supporting Services"]
        NotifSvc["📧 Notification Service<br/>(Email, SMS)"]
        LoggingSvc["📊 Logging Service<br/>(Observability)"]
        SearchSvc["🔍 Search Service<br/>(Elasticsearch)"]
        ReportSvc["📈 Reporting Service<br/>(Analytics)"]
    end

    subgraph MessageQueue["Message Queue"]
        Queue["📬 Event Bus<br/>(RabbitMQ/Kafka)"]
    end

    subgraph Data["Data Layer"]
        UserDB[("👥 User DB<br/>PostgreSQL")]
        ProductDB[("📦 Product DB<br/>PostgreSQL")]
        OrderDB[("🛒 Order DB<br/>PostgreSQL")]
        PaymentDB[("💰 Payment DB<br/>PostgreSQL")]
        SearchDB[("🔍 Search Index<br/>Elasticsearch")]
    end

    subgraph External["External Services"]
        PaymentGw["💳 Payment Gateway<br/>(Stripe, etc)"]
        EmailSvc["📧 Email Provider<br/>(SendGrid)"]
        SmsSvc["📱 SMS Provider<br/>(Twilio)"]
        ShippingGw["🚚 Shipping API<br/>(FedEx, UPS)"]
    end

    Client --> LB
    LB --> Gateway_Service
    Gateway_Service --> RateLimit
    RateLimit --> Cache

    Cache --> AuthSvc
    Cache --> UserSvc
    Cache --> ProductSvc
    Cache --> OrderSvc

    AuthSvc --> UserDB
    UserSvc --> UserDB

    ProductSvc --> ProductDB
    ProductSvc --> SearchDB
    ProductSvc --> SearchSvc

    OrderSvc --> OrderDB
    OrderSvc --> UserSvc
    OrderSvc --> ProductSvc
    OrderSvc --> PaymentSvc
    OrderSvc --> ShippingSvc

    PaymentSvc --> PaymentDB
    PaymentSvc --> PaymentGw

    ShippingSvc --> ShippingGw

    OrderSvc --> Queue
    PaymentSvc --> Queue
    ShippingSvc --> Queue

    Queue --> NotifSvc
    Queue --> ReportSvc
    Queue --> LoggingSvc

    NotifSvc --> EmailSvc
    NotifSvc --> SmsSvc

    LoggingSvc --> UserDB
    ReportSvc --> OrderDB

    SearchSvc --> SearchDB
```

## Architecture Metrics

**Services**: 11 core + 4 supporting | **Data Stores**: 5 | **External Integrations**: 4 | **Communication Patterns**: Sync (REST), Async (Events)

This complex architecture demonstrates real-world patterns including API Gateway pattern, service-to-service communication, event-driven architecture with message queues, and multi-database approach (polyglot persistence).

## Learning Tips

Design for scalability: each service can scale independently. Use API Gateway for cross-cutting concerns. Implement event-driven communication for loose coupling. Consider data consistency patterns (eventual consistency vs strong consistency). Monitor service health and communication patterns.
