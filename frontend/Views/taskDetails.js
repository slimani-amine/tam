import { getProject, getTask } from "../model.js"
export const taskDetail = async (id, projectId) => {
    const taskData = await getTask(id)

    const projectData = await getProject(projectId)
    let flagClass = '';
    if (taskData.flag === 'urgent') {
        flagClass = 'priority-flag-red';
    } else if (taskData.flag === 'normal') {
        flagClass = 'priority-flag-blue';
    } else if (taskData.flag === 'high') {
        flagClass = 'priority-flag-yellow';
    } else if (taskData.flag === 'low') {
        flagClass = 'priority-flag-gray';
    }
    let colorClass = ""
    if (taskData.status === 'new request') {
        colorClass = 'gray'
    } else if (taskData.status === 'in progress') {
        colorClass = 'orange'
    } else if (taskData.status === 'to be tested') {
        colorClass = 'blue'
    } else if (taskData.status === 'completed') {
        colorClass = 'green'
    }
    return `
            <div class="task-details-header">
                <p>${projectData.Name}</p>
                <div style="display: flex" class="task-details-header-right">
                    <p style="color: #949494; font-size: 1rem">Créé le  ${taskData.createdAt.substring(0, 10)}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path
                            d="M13.0975 13.2023H13.8964M13.0975 14.0012H13.8964M5.6412 13.2023H6.44009M5.6412 14.0012H6.44009M20.5538 13.2023H21.3527M20.5538 14.0012H21.3527M14.5624 13.6018C14.5624 14.1901 14.0855 14.667 13.4972 14.667C12.9089 14.667 12.432 14.1901 12.432 13.6018C12.432 13.0135 12.9089 12.5366 13.4972 12.5366C14.0855 12.5366 14.5624 13.0135 14.5624 13.6018ZM7.1061 13.6018C7.1061 14.1901 6.6292 14.667 6.04091 14.667C5.45262 14.667 4.97572 14.1901 4.97572 13.6018C4.97572 13.0135 5.45262 12.5366 6.04091 12.5366C6.6292 12.5366 7.1061 13.0135 7.1061 13.6018ZM22.0187 13.6018C22.0187 14.1901 21.5418 14.667 20.9536 14.667C20.3653 14.667 19.8884 14.1901 19.8884 13.6018C19.8884 13.0135 20.3653 12.5366 20.9536 12.5366C21.5418 12.5366 22.0187 13.0135 22.0187 13.6018Z"
                            stroke="#374957" stroke-width="2.13038" stroke-linecap="round" />
                    </svg>
                    <svg class="closeTask-details" xmlns="http://www.w3.org/2000/svg" width="21" height="22"
                        viewBox="0 0 21 22" fill="none">
                        <g clip-path="url(#clip0_2_4937)">
                            <path
                                d="M12.9999 13.4684L10.4701 10.9386M10.4701 10.9386L7.94026 8.40879M10.4701 10.9386L7.94026 13.4684M10.4701 10.9386L12.9999 8.40879M1.19406 10.9386C1.19406 16.0616 5.34708 20.2146 10.4701 20.2146C15.5931 20.2146 19.7461 16.0616 19.7461 10.9386C19.7461 5.81561 15.5931 1.6626 10.4701 1.6626C5.34708 1.6626 1.19406 5.81561 1.19406 10.9386Z"
                                stroke="#374957" stroke-width="2.13038" stroke-linecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2_4937">
                                <rect width="20.2386" height="20.2386" fill="white"
                                    transform="translate(0.350815 0.81958)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div class="task-details-bigcontent">
                <div class="task-details-content">
                    <div class="task-details-content-header">
                        <div class="task-details-content-header-status ${colorClass}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13"
                                fill="${colorClass}">
                                <circle cx="6.56458" cy="6.20874" r="6" fill="${colorClass}" />
                            </svg>
                            <p>${taskData.status}</p>
                            <svg class="dropdown-trigger" xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path
                                    d="M4.75663 5.97827L8.47112 1.52089C8.90534 0.999826 8.53481 0.20874 7.85654 0.20874L1.27261 0.20874C0.594338 0.20874 0.223813 0.999825 0.658031 1.52089L4.37252 5.97827C4.47247 6.09821 4.65668 6.09821 4.75663 5.97827Z"
                                    fill="${colorClass}" />
                            </svg>
                            <div class="status-lists"></div>
                        </div>
                        
                        <img src="public/icons/Avatar group (1).png" alt="" />
                        <div class="assignee-lists">

                        </div>

                            <div class="task-details-content-header-priorityflag ">
                        <svg class="priority-flag ${flagClass}" style="width: 17" height="19" xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                        <path d="M1.25 11.4286V1C1.25 0.764298 1.25 0.646447 1.32322 0.573223C1.39645 0.5 1.5143 0.5 1.75 0.5H13.9849C14.5199 0.5 14.7874 0.5 14.8499 0.658113C14.9124 0.816226 14.7172 0.99912 14.3267 1.36491L9.72831 5.67236C9.58225 5.80918 9.50922 5.87759 9.50922 5.96429C9.50922 6.05098 9.58225 6.11939 9.72831 6.25621L14.3267 10.5637C14.7172 10.9295 14.9124 11.1123 14.8499 11.2705C14.7874 11.4286 14.5199 11.4286 13.9849 11.4286H1.25ZM1.25 11.4286V17.5" stroke="#AFAFAF" stroke-linecap="round"/>
                      </svg>
                            
                            <p>${taskData.flag}</p>
                        </div>
                        <div class="flags-list"></div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M11.8468 22.2778C6.93883 22.2778 2.94876 18.2877 2.94876 13.3797C2.94876 8.47176 6.93883 4.48169 11.8468 4.48169C16.7548 4.48169 20.7448 8.47176 20.7448 13.3797C20.7448 18.2877 16.7548 22.2778 11.8468 22.2778ZM11.8468 5.88664C7.71624 5.88664 4.35371 9.24916 4.35371 13.3797C4.35371 17.5103 7.71624 20.8728 11.8468 20.8728C15.9774 20.8728 19.3399 17.5103 19.3399 13.3797C19.3399 9.24916 15.9774 5.88664 11.8468 5.88664Z"
                                    fill="#374957" />
                                <path
                                    d="M11.8468 13.8479C11.4628 13.8479 11.1443 13.5294 11.1443 13.1454V8.46224C11.1443 8.07822 11.4628 7.75977 11.8468 7.75977C12.2308 7.75977 12.5493 8.07822 12.5493 8.46224V13.1454C12.5493 13.5294 12.2308 13.8479 11.8468 13.8479Z"
                                    fill="#374957" />
                                <path
                                    d="M14.6567 3.54509H9.03689C8.65287 3.54509 8.33441 3.22663 8.33441 2.84261C8.33441 2.45859 8.65287 2.14014 9.03689 2.14014H14.6567C15.0407 2.14014 15.3592 2.45859 15.3592 2.84261C15.3592 3.22663 15.0407 3.54509 14.6567 3.54509Z"
                                    fill="#374957" />
                            </svg>
                        </div>
                    </div>
                    <div class="task-details-content-title" contenteditable="true">
                        ${taskData.title}
                    </div>
                    <div class="task-details-content-description">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                            <path
                                d="M10.9941 13.3913C10.9941 13.7985 11.3242 14.1285 11.7314 14.1285C12.1386 14.1285 12.4686 13.7985 12.4686 13.3913C12.4686 12.9841 12.1386 12.6541 11.7314 12.6541C11.3242 12.6541 10.9941 12.9841 10.9941 13.3913Z"
                                stroke="#ABB2C8" stroke-width="1.47449" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M6.57068 13.3913C6.57068 13.7985 6.90075 14.1285 7.30792 14.1285C7.71509 14.1285 8.04517 13.7985 8.04517 13.3913C8.04517 12.9841 7.71509 12.6541 7.30792 12.6541C6.90075 12.6541 6.57068 12.9841 6.57068 13.3913Z"
                                stroke="#ABB2C8" stroke-width="1.47449" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M10.9941 8.96783C10.9941 9.375 11.3242 9.70508 11.7314 9.70508C12.1386 9.70508 12.4686 9.375 12.4686 8.96783C12.4686 8.56067 12.1386 8.23059 11.7314 8.23059C11.3242 8.23059 10.9941 8.56067 10.9941 8.96783Z"
                                stroke="#ABB2C8" stroke-width="1.47449" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M6.57068 8.96783C6.57068 9.375 6.90075 9.70508 7.30792 9.70508C7.71509 9.70508 8.04517 9.375 8.04517 8.96783C8.04517 8.56067 7.71509 8.23059 7.30792 8.23059C6.90075 8.23059 6.57068 8.56067 6.57068 8.96783Z"
                                stroke="#ABB2C8" stroke-width="1.47449" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M10.9941 4.54437C10.9941 4.95154 11.3242 5.28162 11.7314 5.28162C12.1386 5.28162 12.4686 4.95154 12.4686 4.54437C12.4686 4.1372 12.1386 3.80713 11.7314 3.80713C11.3242 3.80713 10.9941 4.1372 10.9941 4.54437Z"
                                stroke="#ABB2C8" stroke-width="1.47449" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M6.57068 4.54437C6.57068 4.95154 6.90075 5.28162 7.30792 5.28162C7.71509 5.28162 8.04517 4.95154 8.04517 4.54437C8.04517 4.1372 7.71509 3.80713 7.30792 3.80713C6.90075 3.80713 6.57068 4.1372 6.57068 4.54437Z"
                                stroke="#ABB2C8" stroke-width="1.47449" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <p contenteditable="true" class="p-desc-detail">
                        ${taskData.description}
                        </p>
                    </div>
                    <div class="task-details-content-tags">
                        <div class="task-details-content-tag green">
                            <p>Social Media</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                fill="none">
                                <path
                                    d="M8.46098 3.37077C8.37503 3.28484 8.25847 3.23657 8.13693 3.23657C8.0154 3.23657 7.89884 3.28484 7.81289 3.37077L5.71098 5.47268L3.60906 3.37077C3.52311 3.28484 3.40655 3.23657 3.28502 3.23657C3.16348 3.23657 3.04693 3.28484 2.96098 3.37077C2.87505 3.45672 2.82678 3.57327 2.82678 3.69481C2.82678 3.81634 2.87505 3.9329 2.96098 4.01885L5.06289 6.12077L2.96098 8.22268C2.87505 8.30863 2.82678 8.42519 2.82678 8.54672C2.82678 8.66826 2.87505 8.78482 2.96098 8.87077C3.04693 8.95669 3.16348 9.00496 3.28502 9.00496C3.40655 9.00496 3.52311 8.95669 3.60906 8.87077L5.71098 6.76885L7.81289 8.87077C7.89884 8.95669 8.0154 9.00496 8.13693 9.00496C8.25847 9.00496 8.37503 8.95669 8.46098 8.87077C8.5469 8.78482 8.59517 8.66826 8.59517 8.54672C8.59517 8.42519 8.5469 8.30863 8.46098 8.22268L6.35906 6.12077L8.46098 4.01885C8.5469 3.9329 8.59517 3.81634 8.59517 3.69481C8.59517 3.57327 8.5469 3.45672 8.46098 3.37077Z"
                                    fill="#F51F45" />
                            </svg>
                        </div>
                        <div class="task-details-content-tag blue">
                            <p>Design</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                fill="none">
                                <path
                                    d="M8.46098 3.37077C8.37503 3.28484 8.25847 3.23657 8.13693 3.23657C8.0154 3.23657 7.89884 3.28484 7.81289 3.37077L5.71098 5.47268L3.60906 3.37077C3.52311 3.28484 3.40655 3.23657 3.28502 3.23657C3.16348 3.23657 3.04693 3.28484 2.96098 3.37077C2.87505 3.45672 2.82678 3.57327 2.82678 3.69481C2.82678 3.81634 2.87505 3.9329 2.96098 4.01885L5.06289 6.12077L2.96098 8.22268C2.87505 8.30863 2.82678 8.42519 2.82678 8.54672C2.82678 8.66826 2.87505 8.78482 2.96098 8.87077C3.04693 8.95669 3.16348 9.00496 3.28502 9.00496C3.40655 9.00496 3.52311 8.95669 3.60906 8.87077L5.71098 6.76885L7.81289 8.87077C7.89884 8.95669 8.0154 9.00496 8.13693 9.00496C8.25847 9.00496 8.37503 8.95669 8.46098 8.87077C8.5469 8.78482 8.59517 8.66826 8.59517 8.54672C8.59517 8.42519 8.5469 8.30863 8.46098 8.22268L6.35906 6.12077L8.46098 4.01885C8.5469 3.9329 8.59517 3.81634 8.59517 3.69481C8.59517 3.57327 8.5469 3.45672 8.46098 3.37077Z"
                                    fill="#F51F45" />
                            </svg>
                        </div>
                    </div>

                    <div class="task-details-content-attachements">
                        <div class="task-details-content-attachements-header">
                            <p>Attachments</p>
                            <p>+</p>
                        </div>
                        <div class="task-details-content-attachements-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
                            <path d="M15.4772 11.0322L11.2165 15.293" stroke="#222222" stroke-width="1.06519" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.6076 14.2279L19.738 12.0976C21.2087 10.6268 21.2087 8.24233 19.738 6.77162V6.77162C18.2672 5.3009 15.8827 5.3009 14.412 6.77161L12.2816 8.90199M9.08608 12.0976L6.9557 14.2279C5.48498 15.6987 5.48498 18.0832 6.9557 19.5539V19.5539C8.42642 21.0246 10.8109 21.0246 12.2816 19.5539L14.412 17.4235" stroke="#222222" stroke-width="1.06519" stroke-linecap="round"/>
                        </svg>
                            <p>Drag and drop files to attach or <a> Browse </a> </p>
                            
                        </div>
                    </div>
                </div>
                <div class="task-details-activity">
                    <div class="task-details-activity-top">
                        <p>Activity</p>
                        <p style="color:#374957" > <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
                        <path d="M0.585429 7.78248V1.28413C0.584757 1.16857 0.618512 1.05544 0.682391 0.959143C0.74627 0.862849 0.837378 0.787759 0.9441 0.743448C1.05082 0.699136 1.16832 0.687611 1.28162 0.71034C1.39492 0.73307 1.49888 0.789025 1.58025 0.871071L4.82653 4.12316C4.93488 4.23216 4.9957 4.37961 4.9957 4.5333C4.9957 4.687 4.93488 4.83445 4.82653 4.94345L1.58025 8.19553C1.49888 8.27758 1.39492 8.33353 1.28162 8.35626C1.16832 8.37899 1.05082 8.36747 0.9441 8.32316C0.837378 8.27884 0.74627 8.20376 0.682391 8.10746C0.618512 8.01117 0.584757 7.89803 0.585429 7.78248Z" fill="#FFA948"/>
                      </svg> title : ${taskData.title}<br/>  
                        
                      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
                      <path d="M0.585429 7.78248V1.28413C0.584757 1.16857 0.618512 1.05544 0.682391 0.959143C0.74627 0.862849 0.837378 0.787759 0.9441 0.743448C1.05082 0.699136 1.16832 0.687611 1.28162 0.71034C1.39492 0.73307 1.49888 0.789025 1.58025 0.871071L4.82653 4.12316C4.93488 4.23216 4.9957 4.37961 4.9957 4.5333C4.9957 4.687 4.93488 4.83445 4.82653 4.94345L1.58025 8.19553C1.49888 8.27758 1.39492 8.33353 1.28162 8.35626C1.16832 8.37899 1.05082 8.36747 0.9441 8.32316C0.837378 8.27884 0.74627 8.20376 0.682391 8.10746C0.618512 8.01117 0.584757 7.89803 0.585429 7.78248Z" fill="#FFA948"/>
                    </svg> description : ${taskData.description} </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
                    <path d="M0.585429 7.78248V1.28413C0.584757 1.16857 0.618512 1.05544 0.682391 0.959143C0.74627 0.862849 0.837378 0.787759 0.9441 0.743448C1.05082 0.699136 1.16832 0.687611 1.28162 0.71034C1.39492 0.73307 1.49888 0.789025 1.58025 0.871071L4.82653 4.12316C4.93488 4.23216 4.9957 4.37961 4.9957 4.5333C4.9957 4.687 4.93488 4.83445 4.82653 4.94345L1.58025 8.19553C1.49888 8.27758 1.39492 8.33353 1.28162 8.35626C1.16832 8.37899 1.05082 8.36747 0.9441 8.32316C0.837378 8.27884 0.74627 8.20376 0.682391 8.10746C0.618512 8.01117 0.584757 7.89803 0.585429 7.78248Z" fill="#FFA948"/>
                  </svg> comments :<br/>    
                    ${taskData.comments.data && taskData.comments.data.map((e) => {
        return `${e.attributes.description} <br/>  `
    })

        }
                    
                    </div>
                    <div class="task-details-activity-bottom">
                        <input type="text" placeholder="Comment" class="comment-input" />
                        <button class="comment-button">Send</button>
                    </div>
                </div>
            </div>
    `
}