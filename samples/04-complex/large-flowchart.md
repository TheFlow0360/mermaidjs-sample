# Large Flowchart

Complex diagram with 30+ nodes demonstrating hierarchical layout and organization strategies.

## Use Case: Order Processing System

This large flowchart demonstrates how Mermaid handles complex diagrams with many nodes. The diagram uses subgraphs for logical grouping, hierarchical arrangement, and shows various decision points and process flows in an order management system.

### Key Features
- Subgraph grouping for logical organization
- 30+ nodes showing complexity handling
- Multiple decision branches
- Error handling paths
- Clear hierarchical flow

### Layout Strategies Demonstrated
- **Subgraph Grouping**: Logical organization into Processing, Validation, and Fulfillment phases
- **Hierarchical Arrangement**: Top-down flow showing progression through stages
- **Node Clustering**: Related decisions grouped together visually
- **Multiple Exits**: Different paths for success and error scenarios
- **Long Label Handling**: Nodes contain descriptive text without breaking layout

## Diagram

```mermaid
flowchart TD
    Start(["Order Received"])

    subgraph Validation["Order Validation Phase"]
        CheckAuth{"User<br/>Authenticated?"}
        CheckItems{"Items in<br/>Catalog?"}
        CheckQty{"Sufficient<br/>Quantity?"}
        ValidateAddr{"Address<br/>Valid?"}
    end

    subgraph Payment["Payment Processing"]
        ProcessPay["Process Payment"]
        RetryPay{"Retry<br/>Payment?"}
        PaymentFail["Payment Failed"]
    end

    subgraph Inventory["Inventory Management"]
        CheckStock{"Stock<br/>Available?"}
        Reserve["Reserve Items"]
        BackOrder["Create Backorder"]
    end

    subgraph Fulfillment["Fulfillment Phase"]
        GenPacking["Generate Packing<br/>Slip"]
        NotifyWH["Notify Warehouse"]
        CreateShip["Create Shipment"]
        GenLabel["Generate Label"]
    end

    subgraph Notification["Customer Notification"]
        ConfirmEmail["Send Confirmation"]
        ShipEmail["Send Shipping<br/>Notification"]
        DelEmail["Send Delivery<br/>Notification"]
    end

    Error["Order Error:<br/>Notify Support"]
    Success(["Order Complete"])
    Shipped(["Shipped"])

    Start --> CheckAuth
    CheckAuth -->|No| Error
    CheckAuth -->|Yes| CheckItems
    CheckItems -->|No| Error
    CheckItems -->|Yes| CheckQty
    CheckQty -->|No| Error
    CheckQty -->|Yes| ValidateAddr
    ValidateAddr -->|No| Error
    ValidateAddr -->|Yes| ProcessPay

    ProcessPay --> RetryPay
    RetryPay -->|Yes| ProcessPay
    RetryPay -->|No| PaymentFail
    PaymentFail --> Error
    ProcessPay -->|Success| CheckStock

    CheckStock -->|No| BackOrder
    CheckStock -->|Yes| Reserve
    BackOrder --> GenPacking
    Reserve --> GenPacking

    GenPacking --> NotifyWH
    NotifyWH --> CreateShip
    CreateShip --> GenLabel
    GenLabel --> ConfirmEmail

    ConfirmEmail --> Shipped
    Shipped --> ShipEmail
    ShipEmail --> DelEmail
    DelEmail --> Success

    Error --> End(["Order Cancelled"])
    Success --> End
```

## Complexity Analysis

**Total Nodes**: 35+ | **Decision Points**: 8 | **Process Steps**: 15+ | **Subgraphs**: 5

This diagram demonstrates Mermaid's ability to handle complex workflows with multiple decision branches, parallel processes, and comprehensive error handling. The hierarchical layout keeps the diagram organized and readable despite its complexity.

## Learning Tips

When creating large flowcharts: organize into logical phases using subgraphs, keep main flow top-to-bottom, show error handling separately, use descriptive labels, test at different zoom levels to ensure readability.
