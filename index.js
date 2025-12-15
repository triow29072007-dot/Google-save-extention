let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadFromLocalStorage = JSON.parse( localStorage.getItem("myLead") )
console.log(leadFromLocalStorage)


if (leadFromLocalStorage) {
    myLead = leadFromLocalStorage
    renderLeads()
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        renderLeads()
    })
})

// double click manual, works on desktop & mobile
let lastClick = 0
const DOUBLE_CLICK_DELAY = 350 // ms, sesuaikan jika perlu

deleteBtn.addEventListener("click", function () {
  const now = Date.now()

  if (now - lastClick <= DOUBLE_CLICK_DELAY) {
    // Detected double click
    console.log("double click detected (manual)")

    // contoh aksi: hapus semua leads
    localStorage.removeItem("myLead")
    myLead = []
    renderLeads()
  }

  lastClick = now
})


inputBtn.addEventListener("click", function () {
    myLead.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("myLead", JSON.stringify(myLead))

    renderLeads()

    console.log(localStorage.getItem("myLead"))
    
})

function renderLeads() {
    ulEl.innerHTML = myLead.map((lead, index) => 
    `<li>
    <a target= "_blank" href="${lead}">${lead}
    </a>
    <button class= "delete-item" >❌</button>
    </li>`
   ).join("")

}

ulEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-item")) {
        const index =e.target.parentElement.dataset.index

        myLead.splice(index, 1)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        renderLeads()
    }
})