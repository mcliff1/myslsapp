# Use Case: Add Customer
**Last Updated**: May 21, 2018

## Logic
Adds a customer record to the system.

### Preconditions
User is logged in with appropriate role

### Main Steps

1. User selects *add customer* trigger
2. system displays *add customer* panel
3. user completes information for panel and submits
4. systems performs validation on panel
5. system submits information to Customer API Post
  1. If error, return to customer panel with error message on top and exit use cases
2. invoke [Customer](Customer.md) use case with status message that new customer was added

### Alternate Paths

**Alternate Path 1 - User Not Logged In**

**Alternate Path 2 - User Not authorized**

### Post Preconditions

### Related Use Cases


## Presentation



### UI Componennts

**Add Customer Panel**

- Name
- Address 1
- Address 2
- City
- State
- Zip
- Phone
- Fax
- Email
- Website


## Future Enhancements

* Include lookup on customer name or other field to see if match before creating new record, give user ability to transer information to an update record request
