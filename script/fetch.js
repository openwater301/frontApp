function createMovie(movie) {
    let { title, price, src } = movie; //비구조화할당
    let movieDiv = document.createElement("li");
    movieDiv.innerHTML = ` 
                     <img src="${src}" onClick="show2(this)" title="${price}"  alt="${title}" />
                       <p>
                         <span>${title}</span>
                         <span>${price}</span>
                       </p>              
              `;
    return movieDiv;
  }
  
  function newsList() {
    alert("ok!!!!!!!!");
    let newsList = document.getElementById("newsList");
    //이부분에 json데이터가 보여지기전에 로딩이미지를 보여준다
  
    setTimeout(() => {
      fetch("./data/goods.json")
        .then((response) => response.json()) //json을 객체로 변환
        .then((json) => {
          //객체로 출력
          let { goods } = json; //비구조화할당
          //alert(movies[1].title);//테스트
          let movieList = goods.map(
            (goods) =>
              //배열을 새로운배열로 만든다
              createMovie(goods) //이 함수로 보내서 div에 p태그안에 json객체를 넣는다
          );
          newsList.append(...movieList); //새롭게 map배열로만든것을
          //id가 newList인곳으로 보애서 보여지게 한다
        });
    }, 1500); //1.5초후에 json데이터보여지게 동작
  }
  document.addEventListener("DOMContentLoaded", () => {
    newsList();
  });
  //DOM구조를 먼저 해석한후에 함수실행
  