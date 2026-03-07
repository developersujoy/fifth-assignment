    console.log("connected sucessfully")

    const catagoriesContainer = document.getElementById("CatagoriesSection");
    const loadingSpinner = document.getElementById("loadingSpinner");
    let allIssues = [];
    const allBtn = document.getElementById("allBtn");
    const closedBtn = document.getElementById("closedBtn");
    const openBtn = document.getElementById("openBtn");
    const issueCount = document.getElementById("issueCount")


    async function LoadCatagories(){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
        // dom load korar jonno time dea holo nicher line ea jate loading spinner dekha jaay
        await new Promise(resolve => setTimeout(resolve, 300));
        //fentch data
        const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await response.json();
        loadingSpinner.classList.add("hidden");
    
        allIssues=data.data;
        
        displaydata(allIssues);
        issueCount.innerText = ` ${allIssues.length} Issues `;
        console.log(data);
        setActive(allBtn);

    }

    LoadCatagories()
    const itemlist = document.getElementById("itemlists");


    function displaydata(allissues) {
        console.log(allissues);
        itemlist.innerHTML = " "; // emty html
        
        allissues.forEach(issue => {
            // formated date
            const date = new Date(issue.createdAt);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            // create element 
        const card = document.createElement("div");
            card.innerHTML =`
            <div class="card bg-base-100 w-full h-full shadow-sm">
                    <div class="p-4">
                        <div class="flex justify-between ">
                            <div>
                                <img src=" ${issue.priority === "high"
                ? "./assets/Open-Status.png" : issue.priority == "medium" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png "} " alt="" srcset="">
                            </div>
                    
                                <div class="p-2 w-20 items-center justify-center h-6 rounded-full flex ${issue.priority == "high" ? "bg-[#FEECEC] text-[#EF4444]" : issue.priority == "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"}">
                                    <p class="text-[12px] font-medium"> ${issue.priority} </p>
                                </div>
                        </div>
                        <div class="mt-3 space-y-2">
                            <h3 class="font-semibold text-[14px] h-[36px]"> ${issue.title} </h3>
                            <p class="text-[12px] text-[#64748B] line-clamp-2 "> ${issue.description} </p>
                        </div>
                        <div class="flex mt-3 gap-1">
                            <div><img src="./assets/Labels.png" alt="" srcset=""></div>
                            <div><img src="./assets/Labels (1).png" alt="" srcset=""></div>
                        </div>
                    </div>
                    <hr class=" border-gray-300">
                    <div class="p-4 text-[12px] text-[#64748B] space-y-2">
                        <p> # ${issue.id} by ${issue.author}</p>
                        <p>${formattedDate}</p>
                    </div>
                    
                </div>` ;
            itemlist.appendChild(card);
        });
    }
    // loop for buttons
    function setActive(btn) {

        [allBtn, openBtn, closedBtn].forEach(button => {
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline");
        });

        btn.classList.remove("btn-outline");
        btn.classList.add("btn-primary");
    }
    // event listener for boxes
    allBtn.addEventListener("click", () => {
        displaydata(allIssues);
        issueCount.innerText = `${allIssues.length} Issues`;
        setActive(allBtn);
    })

    openBtn.addEventListener("click", () => {
        const openIssues = allIssues.filter(issue => issue.status === "open");
        displaydata(openIssues);
        issueCount.innerText = `${openIssues.length} Issues`;
        setActive(openBtn);
    })

    closedBtn.addEventListener("click", () => {
        const closeissue = allIssues.filter(issue => issue.status === "closed");
        displaydata(closeissue);
        issueCount.innerText = `${closeissue.length} Issues`;
        setActive(closedBtn);
        console.log(closeissue);
    })
