import { translateDate } from "./translateDate.js"
const clearElement = (element) => {
  element.innerHTML = "";
};

const createTaskHtml = (task) => {
  return `
  <div class="task-content">
    <svg
    class="dragIcon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M14 18.5C14 19.0523 14.4477 19.5 15 19.5C15.5523 19.5 16 19.0523 16 18.5C16 17.9477 15.5523 17.5 15 17.5C14.4477 17.5 14 17.9477 14 18.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 18.5C8 19.0523 8.44772 19.5 9 19.5C9.55228 19.5 10 19.0523 10 18.5C10 17.9477 9.55228 17.5 9 17.5C8.44772 17.5 8 17.9477 8 18.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 12.5C14 13.0523 14.4477 13.5 15 13.5C15.5523 13.5 16 13.0523 16 12.5C16 11.9477 15.5523 11.5 15 11.5C14.4477 11.5 14 11.9477 14 12.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 12.5C8 13.0523 8.44772 13.5 9 13.5C9.55228 13.5 10 13.0523 10 12.5C10 11.9477 9.55228 11.5 9 11.5C8.44772 11.5 8 11.9477 8 12.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 6.5C14 7.05228 14.4477 7.5 15 7.5C15.5523 7.5 16 7.05228 16 6.5C16 5.94772 15.5523 5.5 15 5.5C14.4477 5.5 14 5.94772 14 6.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 6.5C8 7.05228 8.44772 7.5 9 7.5C9.55228 7.5 10 7.05228 10 6.5C10 5.94772 9.55228 5.5 9 5.5C8.44772 5.5 8 5.94772 8 6.5Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M14.7695 12.3079L10.3121 8.59346C9.79109 8.15924 9 8.52976 9 9.20803V15.792C9 16.4702 9.79109 16.8408 10.3121 16.4065L14.7695 12.6921C14.8895 12.5921 14.8895 12.4079 14.7695 12.3079Z"
        fill="#AFAFAF"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
    >
      <circle cx="5" cy="5.5" r="5" fill="#C5C5C5" />
    </svg>
    <p>${task.attributes.title}</p>
  </div>
  <div class="task-detail">
    <img src="public/icons/Avatar group 2.png" />
    <p style="width: 15%; margin-left: 7%">${translateDate(task.attributes.createdAt)}</p>
    <svg class="priority-flag" style="width: 15%" xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
  <path d="M1.25 11.4286V1C1.25 0.764298 1.25 0.646447 1.32322 0.573223C1.39645 0.5 1.5143 0.5 1.75 0.5H13.9849C14.5199 0.5 14.7874 0.5 14.8499 0.658113C14.9124 0.816226 14.7172 0.99912 14.3267 1.36491L9.72831 5.67236C9.58225 5.80918 9.50922 5.87759 9.50922 5.96429C9.50922 6.05098 9.58225 6.11939 9.72831 6.25621L14.3267 10.5637C14.7172 10.9295 14.9124 11.1123 14.8499 11.2705C14.7874 11.4286 14.5199 11.4286 13.9849 11.4286H1.25ZM1.25 11.4286V17.5" stroke="#AFAFAF" stroke-linecap="round"/>
</svg>
   
    <svg
      style="width: 15%"
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="3"
      viewBox="0 0 9 3"
      fill="none"
    >
      <circle
        cx="1.75"
        cy="1.50001"
        r="1.16332"
        transform="rotate(-90 1.75 1.50001)"
        fill="#AFAFAF"
      />
      <circle
        cx="4.75"
        cy="1.50001"
        r="1.16332"
        transform="rotate(-90 4.75 1.50001)"
        fill="#AFAFAF"
      />
      <circle
        cx="7.75"
        cy="1.50001"
        r="1.16332"
        transform="rotate(-90 7.75 1.50001)"
        fill="#AFAFAF"
      />
    </svg>
  </div>

  `;
};


const createBoardHtml = (task) => {
  return `
  <p>Page 1 > Page 2</p>
  <div
      style="
      display: flex;
      align-items: center;
      gap: 150px;
      margin: 0;"
  >
    <h3>${task.attributes.title}</h3>
    <svg
    class="priority-flag"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
    >
      <path
        d="M1 1V11.4286H13.7349C14.2699 11.4286 14.5374 11.4286 14.5999 11.2705C14.6624 11.1123 14.4672 10.9295 14.0767 10.5637L9.47831 6.25621C9.33225 6.11939 9.25922 6.05098 9.25922 5.96429C9.25922 5.87759 9.33225 5.80918 9.47831 5.67236L14.0767 1.36491C14.4672 0.99912 14.6624 0.816226 14.5999 0.658113C14.5374 0.5 14.2699 0.5 13.7349 0.5H1.5C1.2643 0.5 1.14645 0.5 1.07322 0.573223C1 0.646447 1 0.764298 1 1Z"
        fill="#F04438"
      />
      <path
        d="M1 11.4286V1C1 0.764298 1 0.646447 1.07322 0.573223C1.14645 0.5 1.2643 0.5 1.5 0.5H13.7349C14.2699 0.5 14.5374 0.5 14.5999 0.658113C14.6624 0.816226 14.4672 0.99912 14.0767 1.36491L9.47831 5.67236C9.33225 5.80918 9.25922 5.87759 9.25922 5.96429C9.25922 6.05098 9.33225 6.11939 9.47831 6.25621L14.0767 10.5637C14.4672 10.9295 14.6624 11.1123 14.5999 11.2705C14.5374 11.4286 14.2699 11.4286 13.7349 11.4286H1ZM1 11.4286V17.5"
        stroke="#F04438"
        stroke-linecap="round"
      />
    </svg>
  </div>
  <p>
  ${task.attributes.description}
  </p>
  <div class="column-task-tags">
    <div class="column-task-tag orange">
      <p>Social Media</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
      >
        <path
          d="M8.24998 3.24998C8.16403 3.16405 8.04747 3.11578 7.92594 3.11578C7.8044 3.11578 7.68785 3.16405 7.60189 3.24998L5.49998 5.35189L3.39806 3.24998C3.31211 3.16405 3.19555 3.11578 3.07402 3.11578C2.95249 3.11578 2.83593 3.16405 2.74998 3.24998C2.66405 3.33593 2.61578 3.45249 2.61578 3.57402C2.61578 3.69555 2.66405 3.81211 2.74998 3.89806L4.85189 5.99998L2.74998 8.10189C2.66405 8.18785 2.61578 8.3044 2.61578 8.42594C2.61578 8.54747 2.66405 8.66403 2.74998 8.74998C2.83593 8.8359 2.95249 8.88417 3.07402 8.88417C3.19555 8.88417 3.31211 8.8359 3.39806 8.74998L5.49998 6.64806L7.60189 8.74998C7.68785 8.8359 7.8044 8.88417 7.92594 8.88417C8.04747 8.88417 8.16403 8.8359 8.24998 8.74998C8.3359 8.66403 8.38417 8.54747 8.38417 8.42594C8.38417 8.3044 8.3359 8.18785 8.24998 8.10189L6.14806 5.99998L8.24998 3.89806C8.3359 3.81211 8.38417 3.69555 8.38417 3.57402C8.38417 3.45249 8.3359 3.33593 8.24998 3.24998Z"
          fill="#34A174"
        />
      </svg>
    </div>
    <div class="column-task-tag blue">
      <p>Design</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
      >
        <path
          d="M8.24998 3.24998C8.16403 3.16405 8.04747 3.11578 7.92594 3.11578C7.8044 3.11578 7.68785 3.16405 7.60189 3.24998L5.49998 5.35189L3.39806 3.24998C3.31211 3.16405 3.19555 3.11578 3.07402 3.11578C2.95249 3.11578 2.83593 3.16405 2.74998 3.24998C2.66405 3.33593 2.61578 3.45249 2.61578 3.57402C2.61578 3.69555 2.66405 3.81211 2.74998 3.89806L4.85189 5.99998L2.74998 8.10189C2.66405 8.18785 2.61578 8.3044 2.61578 8.42594C2.61578 8.54747 2.66405 8.66403 2.74998 8.74998C2.83593 8.8359 2.95249 8.88417 3.07402 8.88417C3.19555 8.88417 3.31211 8.8359 3.39806 8.74998L5.49998 6.64806L7.60189 8.74998C7.68785 8.8359 7.8044 8.88417 7.92594 8.88417C8.04747 8.88417 8.16403 8.8359 8.24998 8.74998C8.3359 8.66403 8.38417 8.54747 8.38417 8.42594C8.38417 8.3044 8.3359 8.18785 8.24998 8.10189L6.14806 5.99998L8.24998 3.89806C8.3359 3.81211 8.38417 3.69555 8.38417 3.57402C8.38417 3.45249 8.3359 3.33593 8.24998 3.24998Z"
          fill="#34A174"
        />
      </svg>
    </div>
  </div>
  <div class="column-task-other" style="display: flex">
    <div style="display: flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
      >
        <rect
          x="14.875"
          y="12.0417"
          width="4.25"
          height="4.25"
          rx="2.125"
          transform="rotate(90 14.875 12.0417)"
          stroke="#666666"
          stroke-width="0.75"
        />
        <rect
          x="2.125"
          y="4.95834"
          width="4.25"
          height="4.25"
          rx="2.125"
          transform="rotate(-90 2.125 4.95834)"
          stroke="#666666"
          stroke-width="0.75"
        />
        <path
          d="M4.25 4.95834V10.1667C4.25 12.0523 4.25 12.9951 4.83579 13.5809C5.42157 14.1667 6.36438 14.1667 8.25 14.1667H10.625"
          stroke="#666666"
          stroke-width="0.75"
        />
      </svg>
      <span>6</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
      >
        <path
          d="M4.5 0.642853L4.5 8.35714"
          stroke="#666666"
          stroke-width="0.75"
          stroke-linecap="round"
        />
        <path
          d="M8.35712 4.5L0.64283 4.5"
          stroke="#666666"
          stroke-width="0.75"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <div style="display: flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
      >
        <path
          d="M2.07141 6.5C2.07141 4.61438 2.07141 3.67157 2.6572 3.08579C3.24298 2.5 4.18579 2.5 6.07141 2.5H15.0714C16.957 2.5 17.8998 2.5 18.4856 3.08579C19.0714 3.67157 19.0714 4.61438 19.0714 6.5V12.5C19.0714 14.3856 19.0714 15.3284 18.4856 15.9142C17.8998 16.5 16.957 16.5 15.0714 16.5H6.07141C4.18579 16.5 3.24298 16.5 2.6572 15.9142C2.07141 15.3284 2.07141 14.3856 2.07141 12.5V6.5Z"
          stroke="#666666"
        />
        <path
          d="M2.07141 7.5L19.0714 7.5"
          stroke="#666666"
          stroke-linecap="round"
        />
        <path
          d="M7.07141 12.5H14.0714"
          stroke="#666666"
          stroke-linecap="round"
        />
        <path
          d="M7.07141 0.5L7.07141 4.5"
          stroke="#666666"
          stroke-linecap="round"
        />
        <path
          d="M14.0714 0.5L14.0714 4.5"
          stroke="#666666"
          stroke-linecap="round"
        />
      </svg>
      <p>07 Sep</p>
    </div>
  </div>
  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 3px;
    "
  >
    <img src="public/icons/Avatar group.png" alt="avatar" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.9008 1.4983C15.477 1.57368 14.898 1.76532 14.0539 2.04667L5.65747 4.84549C4.24627 5.31589 3.21903 5.65876 2.49511 5.96978C1.74304 6.29289 1.45549 6.52914 1.35822 6.71075C1.12127 7.15315 1.12127 7.68474 1.35822 8.12715C1.45549 8.30876 1.74304 8.54501 2.49511 8.86812C3.21903 9.17914 4.24627 9.52201 5.65747 9.99241C5.67979 9.99985 5.7018 10.0072 5.72353 10.0144C6.22229 10.1805 6.56731 10.2953 6.85965 10.4966C7.11092 10.6695 7.32842 10.887 7.50139 11.1383C7.70263 11.4307 7.8175 11.7757 7.98356 12.2744C7.99079 12.2962 7.99813 12.3182 8.00556 12.3405C8.47597 13.7517 8.81883 14.7789 9.12985 15.5029C9.45296 16.2549 9.68921 16.5425 9.87082 16.6397C10.3132 16.8767 10.8448 16.8767 11.2872 16.6397C11.4688 16.5425 11.7051 16.2549 12.0282 15.5029C12.3392 14.7789 12.6821 13.7517 13.1525 12.3405L15.9513 3.94403C16.2326 3.1 16.4243 2.52093 16.4997 2.09719C16.5757 1.66982 16.5007 1.57273 16.463 1.535C16.4252 1.49727 16.3281 1.42228 15.9008 1.4983ZM15.7256 0.51376C16.2354 0.423074 16.7708 0.428612 17.1701 0.827894C17.5694 1.22718 17.5749 1.76254 17.4842 2.27233C17.3944 2.77711 17.178 3.42628 16.9136 4.21947L16.9 4.26026L14.1012 12.6567L14.0927 12.6823C13.6325 14.0628 13.2767 15.1303 12.947 15.8976C12.6274 16.6415 12.2792 17.2428 11.7594 17.5213C11.022 17.9162 10.136 17.9162 9.39869 17.5213C8.87883 17.2428 8.53067 16.6415 8.21106 15.8976C7.88138 15.1302 7.52556 14.0628 7.06537 12.6822L7.05688 12.6567C6.86013 12.0665 6.7886 11.8665 6.67768 11.7053C6.5739 11.5546 6.4434 11.4241 6.29264 11.3203C6.13151 11.2094 5.9315 11.1378 5.34124 10.9411L5.31578 10.9326C3.93519 10.4724 2.86773 10.1166 2.10037 9.78691C1.35645 9.4673 0.755122 9.11914 0.476694 8.59928C0.081784 7.86194 0.081784 6.97596 0.476694 6.23861C0.755122 5.71876 1.35645 5.3706 2.10037 5.05099C2.86773 4.7213 3.9352 4.36548 5.31579 3.90529L5.34124 3.89681L13.7377 1.09798L13.7786 1.08437C14.5717 0.819957 15.2209 0.603555 15.7256 0.51376Z"
        fill="#666666"
      />
    </svg>
    <span>10</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
    >
      <path
        d="M14.9543 9.20716C14.9925 9.24539 15.0229 9.29079 15.0436 9.34076C15.0643 9.39073 15.075 9.4443 15.075 9.49839C15.075 9.55249 15.0643 9.60605 15.0436 9.65603C15.0229 9.706 14.9925 9.7514 14.9543 9.78963L9.32446 15.4153C8.62949 16.11 7.68701 16.5002 6.70436 16.5C5.72171 16.4998 4.77938 16.1093 4.08468 15.4143C3.38998 14.7193 2.99981 13.7768 3 12.7942C3.00019 11.8115 3.39073 10.8692 4.08571 10.1745L10.8962 3.26451C11.1382 3.02229 11.4256 2.83011 11.7418 2.69893C12.0581 2.56776 12.3971 2.50016 12.7395 2.5C13.0819 2.49984 13.4209 2.56712 13.7373 2.698C14.0537 2.82888 14.3412 3.0208 14.5835 3.26279C14.8257 3.50479 15.0179 3.79212 15.149 4.10839C15.2802 4.42466 15.3478 4.76366 15.348 5.10605C15.3481 5.44844 15.2808 5.78751 15.15 6.1039C15.0191 6.42029 14.8272 6.7078 14.5852 6.95002L7.77397 13.8573C7.49112 14.1407 7.10728 14.3001 6.70688 14.3005C6.30649 14.3009 5.92234 14.1422 5.63895 13.8593C5.35556 13.5765 5.19613 13.1926 5.19574 12.7923C5.19536 12.3919 5.35404 12.0077 5.63689 11.7243L11.3504 5.91544C11.427 5.83757 11.5314 5.79331 11.6406 5.79241C11.7499 5.79151 11.855 5.83404 11.9329 5.91064C12.0107 5.98725 12.055 6.09165 12.0559 6.20088C12.0568 6.31011 12.0143 6.41523 11.9377 6.49311L6.22416 12.3047C6.16028 12.3683 6.10955 12.4438 6.07486 12.527C6.04017 12.6101 6.0222 12.6993 6.02197 12.7894C6.02175 12.8796 6.03928 12.9688 6.07356 13.0522C6.10784 13.1355 6.1582 13.2113 6.22176 13.2752C6.28532 13.339 6.36084 13.3898 6.44401 13.4245C6.52718 13.4591 6.61636 13.4771 6.70648 13.4773C6.79659 13.4776 6.88586 13.46 6.9692 13.4258C7.05254 13.3915 7.12831 13.3411 7.19219 13.2776L14.0006 6.36962C14.3354 6.03537 14.5237 5.58181 14.5241 5.10872C14.5245 4.63563 14.337 4.18177 14.0027 3.84697C13.6685 3.51218 13.2149 3.32387 12.7418 3.32349C12.2687 3.3231 11.8149 3.51066 11.4801 3.84492L4.66886 10.7522C4.12809 11.2923 3.82404 12.0251 3.82359 12.7894C3.82314 13.5538 4.12633 14.2869 4.66646 14.8277C5.20659 15.3685 5.93942 15.6725 6.70373 15.673C7.46804 15.6734 8.20123 15.3702 8.742 14.8301L14.3718 9.20442C14.4102 9.16632 14.4558 9.13618 14.5058 9.11569C14.5559 9.09521 14.6095 9.08481 14.6636 9.08506C14.7177 9.08531 14.7712 9.09623 14.8211 9.11718C14.871 9.13813 14.9162 9.16871 14.9543 9.20716Z"
        fill="#666666"
      />
    </svg>
    <span>4</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <g clip-path="url(#clip0_355_1513)">
        <path
          d="M7.50006 3C8.19041 3 8.75006 2.44036 8.75006 1.75C8.75006 1.05964 8.19041 0.5 7.50006 0.5C6.8097 0.5 6.25006 1.05964 6.25006 1.75C6.25006 2.44036 6.8097 3 7.50006 3Z"
          fill="#666666"
        />
        <path
          d="M7.50006 9.25018C8.19041 9.25018 8.75006 8.69054 8.75006 8.00018C8.75006 7.30983 8.19041 6.75018 7.50006 6.75018C6.8097 6.75018 6.25006 7.30983 6.25006 8.00018C6.25006 8.69054 6.8097 9.25018 7.50006 9.25018Z"
          fill="#666666"
        />
        <path
          d="M7.50006 15.4998C8.19041 15.4998 8.75006 14.9402 8.75006 14.2498C8.75006 13.5595 8.19041 12.9998 7.50006 12.9998C6.8097 12.9998 6.25006 13.5595 6.25006 14.2498C6.25006 14.9402 6.8097 15.4998 7.50006 15.4998Z"
          fill="#666666"
        />
      </g>
      <defs>
        <clipPath id="clip0_355_1513">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>

  `;
};
const createDivForLists = (task) => {
  const divList = document.createElement('div');
  divList.classList.add("task");
  divList.classList.add(`${task.id}`);
  divList.setAttribute('data-task-id', `${task.id}`);

  divList.setAttribute('draggable', 'true');
  return divList
}
const createDivForColumns = (task) => {
  const divColumn = document.createElement('div');
  divColumn.classList.add("column-task");
  divColumn.setAttribute('data-task-id', `${task.id}`);
  divColumn.setAttribute('draggable', 'true');
  return divColumn
}
const renderTasks = (tasks) => {
  const newRequest = document.querySelector('#new-request');
  const inProgress = document.querySelector('#in-progress');
  const toBeTested = document.querySelector('#to-be-tested');
  const completed = document.querySelector('#completed');
  const newRequestBord = document.querySelector('#new-request-board');
  const inProgressBord = document.querySelector('#in-progress-bord');
  const toBeTestedBord = document.querySelector('#to-be-tested-bord');
  const completedBord = document.querySelector('#completed-bord');

  clearElement(newRequest);
  clearElement(inProgress);
  clearElement(toBeTested);
  clearElement(completed);
  clearElement(newRequestBord);
  clearElement(inProgressBord);
  clearElement(toBeTestedBord);
  clearElement(completedBord);

  tasks && tasks.forEach((task) => {
    const listHtml = createTaskHtml(task);
    const boardHtml = createBoardHtml(task);
    // const priorityFlag = document.querySelector('priority-flag')

    if (task.attributes.status === 'new request') {
      let div = createDivForLists(task)
      newRequest.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      newRequestBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    else if (task.attributes.status === 'in progress') {
      let div = createDivForLists(task)
      inProgress.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      inProgressBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    else if (task.attributes.status === 'to be tested') {
      let div = createDivForLists(task)
      toBeTested.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      toBeTestedBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    else if (task.attributes.status === 'completed') {
      let div = createDivForLists(task)
      completed.appendChild(div);
      div.innerHTML = listHtml;

      let divCol = createDivForColumns(task)
      completedBord.appendChild(divCol);
      divCol.innerHTML = boardHtml;
    }
    // if (task.attributes.flag === 'urgent') {
    //   priorityFlag.classList.add('priority-flag-red')
    // }
    // else if (task.attributes.flag === 'normal') {
    //   priorityFlag.classList.add('priority-flag-blue')
    // }
    // else if (task.attributes.flag === 'high') {
    //   priorityFlag.classList.add('priority-flag-yellow')
    // }
    // else if (task.attributes.flag === 'low') {
    //   priorityFlag.classList.add('priority-flag-gray')
    // }

  });

};


export default renderTasks; 
