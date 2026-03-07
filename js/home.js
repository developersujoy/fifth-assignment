console.log("connected sucessfully")

const catagoriesContainer = document.getElementById("CatagoriesSection");




async function LoadCatagories(){
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    displaydata(data.data);
    console.log(data)
}
LoadCatagories()
const itemlist = document.getElementById("itemlists");
function displaydata(allissues) {
    console.log(allissues);
    allissues.forEach(issue => {
    const card = document.createElement("div");
        // card.innerHTML =`<p>Hello worlds</p>` ;
        itemlist.appendChild(card);
    });
}
