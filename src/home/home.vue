<template>
  <div>
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

<!-- imageSlider -->

  </div>
</template>

<script>
export default {
  data: () => ({
     
    })
}
</script>

<style>
.header-ul li{
  list-style: none;
  display: inline-flex;
  font-family: 'Noto Sans KR' sans-serif 20px;
  margin: 30px;
  margin-top: 30px;
 }
 
 .header-ul li:hover{
   color: #7c7c7c;
 }
 .movie-h1 {
   margin: 40px;
   display: inline-flex;
   font-family: 'Nanum Gothic' sans-serif;
  }

 a:link { 
   color: black; text-decoration: none;
  }

 a:visited { 
   color: black; text-decoration: none;
  }

 a:hover { 
   color: #7c7c7c; text-decoration: none;
  }

.menuLink {
  text-decoration: none;
  display: block;
  width: 130px;
  font-size: 15px;
}

.menuLink {
  color: black;
  font-size: 20px;
}

.menuLink:hover {
  color: #7c7c7c;
}
 



</style>