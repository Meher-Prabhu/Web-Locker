function save_options() {
  var sitesnodes = document.getElementById('lockedSitesBox').getElementsByTagName('li');
  var sites = "";
  for(var i = 0; i < sitesnodes.length-1; i++) {
    sites += sitesnodes[i].innerHTML+",";
  }
  sites += sitesnodes[sitesnodes.length-1];
  var time = document.getElementById('time').value;
  var pwd = document.getElementById('pwd').value;
  if(pwd != '') {
  chrome.storage.sync.set({
    Sites: sites,
    Time: time,
    Pwd: pwd
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  }
  else {
    window.alert("Please enter a password");
  }
}

function add_site() {
  var nsite = document.getElementById('newSite').value;
  var sitesnodes = document.getElementById('lockedSitesBox').getElementsByTagName('li');
  var sites = "";
  for(var i = 0; i < sitesnodes.length; i++) {
    sites += sitesnodes[i].innerHTML+",";
  }
  var time = document.getElementById('time').value;
  var pwd = document.getElementById('pwd').value;
  if(pwd != "" && nsite != "") {
    sites += nsite;
  chrome.storage.sync.set({
    Sites: sites,
    Time: time,
    Pwd: pwd
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  }
  else if(pwd == ""){
    window.alert("Please enter a password");
  }
  else {
    window.alert("Please enter the address of the site");
  }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    Sites: "www.facebook.com,www.blah.com",
    Time: "30",
    Pwd: ""
  }, function(items) {
    var slist = items.Sites.split(',');
    var list = document.getElementById('lockedSitesBox');
    for(var i = 0; i < slist.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(slist[i]));
      list.appendChild(li);
    }
    document.getElementById('lockedSitesBox').value = items.Sites.split(',');
    document.getElementById('time').value = items.Time;
    document.getElementById('pwd').value = items.Pwd;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('lockedSiteForm').addEventListener('submit', add_site);