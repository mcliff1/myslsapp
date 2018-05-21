# Use Case: Display Home Page
**Last Updated**: May 21, 2018

## Logic
Based on the authenitcation status of the user, this use case describes how the system presents the application home page.

### Preconditions
**Optional** User is logged in

### Main Steps

1. If User is logged in and authenticated
  1. populate user real name in header
2. present standard top navigatation
  1. User selects *Customer* trigger invokes [Customer](Customer.md) use case
  2. User selects *Load* trigger invokes [Load](Load.md) use case
  3. User selects *Carrier* trigger invokes [Carrier](Carrier.md) use case
  4. User selects *Sign in* trigger invokes [SignIn](SignIn.md) use case
3. home page displays welcome message

### Alternate Paths

**Alternate Path 1 - Site Unavailable**
well, it's all static, so if we can't do that we can do anything :-)

### Post Preconditions

### Related Use Cases

* [Customer](Customer.md) use case
* [Load](Load.md) use case
* [Carrier](Carrier.md) use case
* [SignIn](SignIn.md) use case


## Presentation



### UI Componennts

**Home Panel**


**Main Navigation**

Contains *sign-in/sign-out* trigger and will display user identifier if known.

Contains a *customer-add* trigger

Top Links
- [Home](Home.md)
- [Customer](Customer-Add.md) *add*
- [Load](Load.md) **TBD**
- [Carrier](Carrier.md) **TBD**
- [Log In](Home.md) **TBD**
