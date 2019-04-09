// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.address = address
}

function Address (work,home){
  this.work = work,
  this.home = home
}

function Email (work, home){
  this.work = work,
  this.home = home
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-personal").html(contact.email.home);
  $(".email-work").html(contact.email.work);
  $(".address-home").html(contact.address.home);
  $(".address-work").html(contact.address.work);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function resetFields(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email").val("");
  $("input#new-address-home").val("");
  $("input#new-address-work").val("");
  $("input#new-email-work").val("");
  $("input#new-email-personal").val("");

}

function createContactFromInput(){
  var inputtedFirstName = $("input#new-first-name").val();
  var inputtedLastName = $("input#new-last-name").val();
  var inputtedPhoneNumber = $("input#new-phone-number").val();
  var inputtedEmailPersonal = $("input#new-email-personal").val();
  var inputtedEmailWork = $("input#new-email-work").val();
  var inputtedAddressWork = $("input#new-address-work").val();
  var inputtedAddressHome = $("input#new-address-home").val();

  var addresses = new Address(inputtedAddressWork, inputtedAddressHome);
  var addressesEmail = new Email (inputtedEmailWork, inputtedEmailPersonal);
  var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber,addressesEmail, addresses);

  return newContact;
}


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    $("form#new-contact").slideUp();
    addressBook.addContact(createContactFromInput());
    displayContactDetails(addressBook);
    resetFields();

  })
})
