const $siteList = $(".site-list");
const $lastList = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
let hashMap = xObject || [
  { logo: "G", url: "https://github.com" },
  { logo: "W", url: "https://wangdoc.com" },
  { logo: "./images/bilibili.png", url: "https://bilibili.com" },
];

const addImg = (logo) => {
  if (logo.match(/png|jpg/)) {
    return `<img src="${logo}" alt=""></img>`;
  } else {
    return logo[0];
  }
};

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

// const render = () => {
//   $siteList.find('li:not(.last)').remove()
//   hashMap.forEach((node, index) => {
//     const $li = $(`<li>
//       <div class="site">
//         <div class="logo">${node.logo}</div>
//         <div class="link">${simplifyUrl(node.url)}</div>
//         <div class="close">
//           <svg class="icon">
//             <use xlink:href="#icon-close"></use>
//           </svg>
//         </div>
//       </div>
//     </li>`).insertBefore($lastLi)
//     $li.on('click', () => {
//       window.open(node.url)
//     })
//     $li.on('click', '.close', (e) => {
//       e.stopPropagation() // 阻止冒泡
//       hashMap.splice(index, 1)
//       render()
//     })
//   })
// }

const render = (index) => {
  hashMap.slice(index).forEach((node, index) => {
    const $li = $(`<li>
      <div class="wrapper">
        <a href="${node.url}">
          <div class="site">
            <div class="logo">${addImg(node.logo)}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon icon2" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        </a>
        </div>
      </li>`).insertBefore($lastList);
    $li.on("click", ".close", (e) => {
      e.preventDefault();
      hashMap.splice(index, 1);
      $siteList.children().get(index).remove();
    });
  });
};

render(0);

$(".add-button").on("click", () => {
  let url = prompt("请输入您想添加的网址");
  if (url && url.indexOf("http") !== 0) {
    url = "https://" + url;
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url,
    });
    render(-1);
    location.reload();
  } else if (url) {
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url,
    });
    render(-1);
    location.reload();
  }
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  // const key = e.key;  equal to
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url, "_self");
      //在当前页面打开新窗口
    }
  }
});
