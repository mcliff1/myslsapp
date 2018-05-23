# Use Case: Delete Customer
**Last Updated**: May 23, 2018

## Logic
Remove a customer record to the system.

### Preconditions
User is logged in with appropriate role

### Main Steps

1. User selects *delete customer* trigger from a customer record
2. system delete request to Customer API
  1. If error, return to customer panel with error message on top and exit use cases
  2. User does not exist
3. invoke [Customer](Customer.md) use case with status message that customer was deleted

### Alternate Paths

**Alternate Path 1 - User Not Logged In**

**Alternate Path 2 - User Not authorized**

**Alternate Path 3 - Customer does not exist**

### Post Preconditions

Customer record is removed from the system

### Related Use Cases


## Presentation



### UI Componennts

Delete customer trigger has selected customer ID
