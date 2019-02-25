<template>
  <div class="today">
      <!-- header -->
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic|Noto+Sans+KR&amp;subset=korean" rel="stylesheet">
      <h1 class="movie-h1">영화</h1>
      <br>
      <hr>
      <nav>
        <ul class="header-ul" >
          <li><router-link to="/">홈</router-link></li>
          <li><router-link to="/todayBoxOffice">오늘 순위</router-link></li>
          <li><router-link to="/weeklyBoxOffice">주간 순위</router-link></li>
          <li><router-link to="/overseasRanking">해외영화 정보</router-link></li>
        </ul>
      </nav>

      <hr>

      <br><br>
  <div class="todayData">
    <ol v-for="movie in getmovies" :key="movie.rank" class="movie-contents">    
      <strong class="rankNo">No.{{movie.rank}}</strong>
      <h2 class="name">제목 : {{movie.movieNm}}</h2>
      <p>개봉일자:{{movie.openDt}}</p>
      <p>누적 관객수:<span class="storePeople">{{movie.audiAcc}}</span></p>
      <p class="rankinten small">순위 변화:<span class="rank-change">{{movie.rankInten}}</span></p>
    </ol>
</div>


  
  </div>
</template>

<script>

/*
1. 순위에 상승,하락 표시
2. 숫자에 콤바표시
3. css 꾸미기
*/

import axios from 'axios';

//mounted(): 웹이 실행되고 나고 -> updated() : 마운트 된 결과에서 내가 원하는 값으로 변경을 해라

export default {
  data () {          
    return {
      getmovies: [
        
      ],
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ],
    }
  },

  mounted() {

    let d = new Date();
    let yy = d.getFullYear();
    let mm = d.getMonth()+1;
    let dd = d.getDate() - 1;
    
    //console.log(mm.toString().length);

    if(mm.toString().length<2){
      mm = "0"+mm;
    }

    const today = '&targetDt='+yy+mm+dd;
    const key = 'key=504bafd8f73d0d4c5601e2baa110e6e9';

    //const url ='http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=504bafd8f73d0d4c5601e2baa110e6e9&targetDt=20190214'
   
    const baseUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    
    const todayUrl = baseUrl+key+today;
    
    //console.log(todayUrl);
    
    axios
      .get(todayUrl)
      .then(response=>  (this.getmovies)=response.data.boxOfficeResult.dailyBoxOfficeList)
      .catch(err=>console.log(err));
    
  },

  updated() {

    const rankinten_array = document.querySelectorAll('.rank-change');
    // console.log(rankinten_array);
    // console.log(rankinten_array);

     // 1,2,3등을 제외한 나머지 순위는 회색처리 
     const rank_array = document.querySelectorAll('.rankNo');
     //console.log(rank_array);
     
    const gray_array = Array.prototype.slice.apply(rank_array);
    
    // 1,2,3등빼고 나머지를 다 표시하니까
    // 배열에는 3부터 9까지의 7개의 값이 들어가게된다

    const gray_rank = gray_array.slice(3);
    //console.log(gray_rank);

     for(let i =0;i<gray_rank.length;i++) {
       gray_rank[i].classList.add('gray');
     }



     // 순위에 변화에 따라서 업,다운,-로 표시함

     for(let i=0;i<rankinten_array.length;i++){
       
       let rankinten_el = rankinten_array[i];
       let rankinten_el_first =rankinten_el.firstChild;
      
       // console.log(rankinten_el);
      if(rankinten_el_first.nodeValue == 0){
        rankinten_el_first.nodeValue = '';
        rankinten_el.classList.add('zero');
      }
      else if(rankinten_el_first.nodeValue>0) {
        rankinten_el.classList.add('up');
      }

      else if(rankinten_el_first.nodeValue<0) {
        let el_value =rankinten_el_first.nodeValue;
        let result = el_value.slice(1)+el_value.slice(2,el_value.length);
        rankinten_el_first.nodeValue = result;
        rankinten_el.classList.add('down');
      }
      
      const money_array = document.querySelectorAll('.storePeople');
      //money_array = money_array.toLocaleString();
      //console.log(money_array);
      
      // 관객수의 천단위마다 콤마를 찍어서 좀더 쉽게 구분할 수 있게 하는 과정 

      for(let i =0; i <money_array.length;i++)  {
         
          let money_el = money_array[i];
          let money_el_first = money_el.firstChild;
          
          let money_el_value = money_el_first.nodeValue;
          //console.log(money_el_value);
          let result = money_el_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          //money_el_value = result;
          money_el_first.nodeValue = result;
          //console.log(money_el_first.nodeValue);
      }
      
     }
  },

  methods: {
      // numberWithComma(num)  {
      //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // }
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.movie-contents {
  background: white;
      float: left;
    width: 190px;
    margin-left: 68px;
    margin-bottom: 36px;
}

.todayData{
	max-width: 980px;
	margin: 0 auto;
}

/* 영화 순위에 따라서 랭크의 배경색상을 달리준다. */
.movie-contents .rankNo{
  display: block;
  width: 100%;
  height: 28px;
  margin-bottom: 12px;
  line-height: 28px;
  text-align: center;
  background: #ED1C24;
  border: 5px solid rgba(0,0,0,0.3);
  color: #fff;
  font-size: 1.13rem;
}

.movie-contents .rankNo.gray  {
  background: #555;
}

.movie-contents .name {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* .rankNo {
  background:yellow;

} */

.rank-change  {
  display: inline-block;
  vertical-align: middle;
}

.rank-change.zero {
  content: '';
  width: 8px;
  height: 3px;
  background: #22B14C;

}

.rank-change.up::before {
  font-family: 'FontAwesome';
  content: "\f062";
  color:#ED1C24;
}

.rank-change.down::before {
  font-family: 'FontAwesome';
  content: "\f063";
  color: #3F48CC;
}





</style>
