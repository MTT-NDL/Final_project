//biến link
var url = 'http://5d77c5f41e31aa00149a35fb.mockapi.io/foodreview';
var searchinfo;
var namefood = [];
sendGetRequest(url,function(responseData){
    var characters = responseData;
    for(var i=0;i<characters.length;i++){
        namefood[i] = characters[i].Name;
    }
    console.log(namefood);
});

function hide() {
    var x = document.getElementById("searchs");
    var y = document.getElementById('hide_button');
    if (x.style.display === "none") {
      x.style.display = "inline-block";
      y.textContent = 'click to hide search bar';
    } else {
      x.style.display = "none";
      y.textContent = 'click to show search bar';
    }
  }

function rendercha(characters){
    //phân tích API
    var content = document.getElementById('content');
    content.textContent = '';
    for(var i=0;i<characters.length;i++){
        var character = characters[i];
        var name = character.Name;
        if (searchinfo==name){
            var country = character.Country;
            var rate = character.Rate;
            var review = character.Review;
            var image = character.Image;
            //nội dung hiển thị
            var chaHTML = `
            <div>
                <h1>country: ${country}</h1>
                <h2>name: ${name}</h2>
                <h2>${rate}</h2>
                <h2>review: ${review}</h2>
                <img src="${image}" alt="this is food pic">
            </div>
            `;
            content.insertAdjacentHTML('beforeend',chaHTML);
        }
        if (searchinfo==''){
            var country = character.Country;
            var rate = character.Rate;
            var review = character.Review;
            var image = character.Image;
            //nội dung hiển thị
            var chaHTML = `
            <div>
                <h1>country: ${country}</h1>
                <h2>name: ${name}</h2>
                <h2>${rate}</h2>
                <h2>review: ${review}</h2>
                <img src="${image}" alt="this is food pic">
            </div>
            `;
            content.insertAdjacentHTML('beforeend',chaHTML);
        }
    }
    alert('done');
}

function search (){
    var btn = document.getElementById('searchbtn');
    btn.addEventListener('click',function(e){
        var searchbar = document.getElementById('searchbar');
        searchinfo = searchbar.value;
        var url = 'http://5d77c5f41e31aa00149a35fb.mockapi.io/foodreview';
        console.log(url);
        sendGetRequest(url,function(responseData){
            var characters = responseData;
            rendercha(characters);
        })
    })
}
search();

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("searchbar"), namefood);
