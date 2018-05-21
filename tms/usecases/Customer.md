# Use Case: View Customer Page
**Last Updated**: May 21, 2018

## Logic
Logic to display the default customer Page

### Preconditions
User is logged in with appropriate role

### Main Steps

1. User selects the *Customer* trigger
2. System calls Customer API with GET reqeuest to get last 5 customers added to systemSystem
3. System displays customer summary panels for each data element returned
  1. show no customers message if nothing returned
4.


### Alternate Paths

**Alternate Path 1 - User Not Logged In**

**Alternate Path 2 - User Not authorized**

### Post Preconditions

### Related Use Cases

* [Add Customer](Customer-Add.md)


## Presentation



### UI Componennts

**Message Panel**
needs to show results from call like update customer view

**Customer Detail Panel**

- Name
- City
- State
- Phone
- Email
