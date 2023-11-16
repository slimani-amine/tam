export const status =()=>{
    let hrml = `<ul class="status-list">
    <li class="statusLi" >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
<circle cx="6" cy="6.5" r="6" fill="#C5C5C5"/>
</svg>
    new request
    </li>
    <li class="statusLi" >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
    <circle cx="6" cy="6.5" r="6" fill="#FFA948"/>
  </svg>
    in progress
    </li>
    <li class="statusLi" >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
    <circle cx="6" cy="6.5" r="6" fill="#0BA5EC"/>
  </svg>
    to be tested
    </li>
    <li class="statusLi" >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
    <circle cx="6" cy="6.5" r="6" fill="#3DD455"/>
  </svg>
    completed
    </li>
    </ul>`

        const container = document.createElement('div');
        container.innerHTML = hrml;

        const statusLi = container.querySelectorAll(".statusLi");
        statusLi.forEach((item) => {
          item.addEventListener("click", async (event) => {
            detailsData.newStatus = item.textContent.trim();
            let lastStatus = item.parentElement.parentElement.parentElement.parentElement
            lastStatus.children[1].innerHTML = detailsData.newStatus
            let colorClass = ""
            if (detailsData.newStatus === 'new request') {
              colorClass = 'gray'
            } else if (detailsData.newStatus === 'in progress') {
              colorClass = 'orange'
            } else if (detailsData.newStatus === 'to be tested') {
              colorClass = 'blue'
            } else if (detailsData.newStatus === 'completed') {
              colorClass = 'green'
            }
            let lastcolorClass = lastStatus.getAttribute('class').split(" ")[1]
            lastStatus.classList.remove(lastcolorClass)
            lastStatus.classList.add(colorClass)

          });
        });

        const statusList = document.querySelector('.status-lists')
        statusList.appendChild(container);
}