var contactStore = (function () {
  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

  return {
    add: function (_name, _firstname, _date, _adress, _mail) {
      const contact = { name: _name, firstname: _firstname, date: _date, adress: _adress, mail: _mail };
      contactList.push(contact);
      localStorage.setItem("contactList", JSON.stringify(contactList));
      return contactList;
    },
    reset: function () {
      contactList = [];
      localStorage.removeItem("contactList");
      return contactList;
    },
    getList: function () { return contactList; },
  };
})();
